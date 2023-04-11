function init() {

    let page = {
        metadata: {
            title: "Weblog",
            version: "1.3",
            index_uri: "./js/index.json",
            index_type: "json",
            index_raw: {},
            owner: "sajith.rahim",
            owner_email: "sajith.rahim@outlook.com",
            year: "2022",
            credits_md_uri: './credits.md',
            ticker_text: "`• ${this.metadata.title} v${this.metadata.version} •     | No of posts: ${ this.data.posts.length}`",
        },
        data: {
            posts: [],
            top_posts: [],
            tags: ["fiction", "feel-good", "mafia"]
        },
        state: {
            indexLoaded: false,
            focusedPostsLoaded: false,
            topPostsLoaded: false,
            currentProject: {},
            currentProjectIndex: 0,
            isHomeView: true,
            scrollPercentage: 0,
            darkMode: false,
            hasError: false,
            errorMessage: `Oops! Something broke! <br/> Post you're looking for doesn't exist or may have been moved.
            <hr/> Please contact the admin. <br/>
            <code style="text-decoration:line-through;">${window.location.search.toString() || ''}</code>`,
            currentFilter: []
        },
        auth: {
            doAuth: true, // no login-screen
            hash: 54149364,
            authenticated: false,
            no_auth_pass: '91194' //'' // login-screen but autofill password
        },
        converters: {
            mdConverter: new showdown.Converter(),
            synth: window.speechSynthesis
        },
        geo: {
            enabled: false,
            ip: '',
            geoLocation: ''
        },
        notification:{
            content: ""
        },
        init() {
            if (this.geo.enabled) {
                fetch('https://api.ipify.org/?format=json')
                    .then((response) => response.json())
                    .then((json) => this.geo.ip = json.ip)
                    .then(
                        fetch(`http://ip-api.com/json/${this.geo.ip}`)
                            .then((response) => response.json())
                            .then((json) => this.geo.geoLocation = json)
                    )
            }


            //$(this.$refs.marquee).html(`• Knowledge Base v1.3 •     |       Please authenticate to proceed.`);

            this.auth.authenticated = localStorage.getItem('md-blog-auth-status') === 'true';
            this.state.darkMode = localStorage.getItem('md-blog-is-dark-mode') === 'true';

            if (this.auth.doAuth && !this.auth.authenticated) {
                this.$watch('auth.authenticated', (auth) => {
                    if (auth) {
                        localStorage.setItem('md-blog-auth-status', true);
                        this.doInit();
                    }
                });
            }
            else {
                this.auth.authenticated = true;
                localStorage.setItem('md-blog-auth-status', true);
                this.doInit();
            }

            //this.auth.authenticated = true

        },
        doInit() {

            fetch(this.metadata.index_uri)
                .then((response) => {
                    if (response.ok) {
                        return response.json() || {};
                    }
                    return Promise.reject(response);
                })
                .then((json) => this.metadata.index_raw = json)
                .then(metadata => this.processIndexJSON(metadata))
                .catch((error) => {
                    this.state.indexLoaded = false;
                    console.log('[📒.md-blog] ' + error);
                });
        },

        authenticate(el) {

            this.auth.authenticated = this.simpleHash($(el).val()) === this.auth.hash;
        },

        simpleHash(s) {
            return s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
        },

        updateScrollPercentage(el) {
            try {
                let ratio = (Math.abs($(el).children('.article-content-wrapper').first().offset().top) + 100) / $(el).height();
                this.state.scrollPercentage = ratio * 100;
            } catch (error) {
                console.log("[📒.md-blog] Scroll update failed with error : " + error);
            }

        },
        processIndexJSON(metadata) {
            try {
                if (metadata) {
                    this.state.indexLoaded = true;
                }
                if (metadata.title) {
                    this.metadata.title = metadata.title;
                }
                if (metadata.version) {
                    this.metadata.version = metadata.version;
                }
                if (metadata.owner_email) {
                    this.metadata.owner_email = metadata.owner_email;
                }
                if (metadata.owner) {
                    this.metadata.owner = metadata.owner;
                }
                if (metadata.year) {
                    this.metadata.year = metadata.year;
                }
                if (metadata.credits_md_uri) {
                    this.metadata.credits_md_uri = metadata.credits_md_uri;
                }
                if (metadata.ticker_text) {
                    this.metadata.ticker_text = `• ${metadata.ticker_text} •`;
                    $(this.$refs.marquee).html(this.metadata.ticker_text);
                }
                if( metadata.tags){
                    this.data.tags = metadata.tags;
                }
                if (metadata.posts) {

                    this.data.posts = this.doFilterByTag(metadata.posts);
                    this.state.currentProject = this.data.posts[0];
                    this.state.focusedPostsLoaded = true;
                }


                this.state.errorMessage = `
                Oops! Something broke! <br/> Post you're looking for doesn't exist or may have been moved.
                <hr/> Please contact the admin: <a href="mailto:${this.metadata?.owner_email}">${this.metadata?.owner}</a> <br/>
                <code style="text-decoration:line-through;">${window.location.search.toString() || ''}</code>
                `

                // set top posts in order

                metadata.top_posts = metadata.top_posts || [];

                let _topPosts = this.data.posts
                    .filter(post => metadata.top_posts.includes(post.title));

                let _topPostsOrdered = [];

                let _postNames = _topPosts.map(p => p.title);
                metadata.top_posts.forEach(el => {
                    let idx = _postNames.indexOf(el);
                    if (idx > -1)
                        _topPostsOrdered.push(_topPosts[idx]);
                });
                if (_topPostsOrdered) {
                    this.data.top_posts = _topPostsOrdered;
                    this.state.topPostsLoaded = true;
                    if (metadata.show_post_count_in_ticker)
                        $(this.$refs.marquee).html(`${this.metadata.ticker_text} | No of posts: ${this.data.posts.length}`);
                }
                if (window.location.search.length > 0) {
                    this.handleDirectURL()
                }
            } catch (error) {
                console.log("[📒.md-blog] Processing index.json failed with error : " + error);
            }
        },

        processMdResponse(rawMd) {
            //console.log(this.converters.mdConverter.makeHtml(rawMd));
            try {
                return this.converters.mdConverter.makeHtml(rawMd);
            } catch (error) {
                console.log("[📒.md-blog] Processing md with error : " + error);
            }

        },

        doFilterByTag(_posts) {
            //this.state.currentFilter = ["feel-good"]
            if (!this.state.currentFilter.length > 0) {
                return _posts;
            }
            let filtered = _posts.filter((post) => {
                if (post.tags) {
                    return post.tags.some(p => this.state.currentFilter.indexOf(p) >= 0)
                }
            })

            return filtered;
        },

        invokeFilterBy(tag) {
            debugger;
            if (!this.state.currentFilter.includes(tag)) {
                this.state.currentFilter.push(tag);

            } else {
                this.state.currentFilter = this.state.currentFilter.filter(t => t !== tag);
            }

            this.doInit();
        },

        handlePostScrollIntoView(el, project) {
            return
            let element = $(el);
            //console.log(element.offset(), $(element.children(".header-article")).first().children(".blog-big__title").first().text());
            this.state.currentProject = project;
        },

        handleDirectURL() {
            try {
                const regex = /(([\?]?search=)(.*))/;
                let postName = '';

                if ((grps = regex.exec(window.location.toString())) !== null) {
                    postName = decodeURI(grps[grps.length - 1] || '');
                }

                let post = this.data.posts
                    .filter(_post => {
                        return _post.title.includes(postName)
                    });


                if (post[0]) {
                    this.state.hasError = false;
                    this.openBlogArticle('', { ...post[0] }); //proxy -> object
                } else {
                    this.state.hasError = true;
                    this.toggleArticleView();
                }

            } catch (error) {

            }
        },

        openBlogArticle(el, post) {
            try {
                this.toggleArticleView();
                $(this.$refs.marquee).html(post.title);

                fetch(post.markdown_uri)
                    .then((response) => response.text())
                    .then(txt => this.processMdResponse(txt))
                    .then(md => $(this.$refs.article_content).html(md));
            } catch (error) {
                console.log("[📒.md-blog] Retreiving article failed with error : " + error);
            }

        },

        clearErrorState() {
            this.state.hasError = false;
        },

        toggleArticleView() {
            try {
                this.converters.synth.cancel();
                this.state.isHomeView = !this.state.isHomeView;
            } catch (error) {
            }

        },

        readContent() {
            try {

                var _text = new SpeechSynthesisUtterance();
                _text.text = this.$refs.article_content.innerText;
                this.converters.synth.speak(_text);
            } catch (error) {
                console.log(error);
            }
        },

        returnToHome() {
            try {
                window.history.pushState("object or string", "Title", "/" + window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
                this.clearErrorState();
                if(!this.state.isHomeView){
                    $(this.$refs.marquee).html(`${this.metadata.ticker_text} | No of posts: ${this.data.posts.length}`);
                }
                this.toggleArticleView();
            } catch (error) {

            }

        },

        getDirectLink() {
            try {
                let title = $(this.$refs.marquee).text();
                let text = window.location.origin + window.location.pathname + '/?search=' + encodeURI(title);
                navigator.clipboard.writeText(text);
                this.setNotification('✔️ Direct Link Copied to Clipboard.')

            } catch (error) {
                this.setNotification('❌ Failed to generate Direct Link.')
            }

        },

        logout() {
            localStorage.setItem('md-blog-auth-status', false);
            this.auth.authenticated = false;
        },

        setTheme() {
            this.state.darkMode = !this.state.darkMode;
            localStorage.setItem('md-blog-is-dark-mode', this.state.darkMode);
        },

        handleWheelScroll(e) {

            let n_projects = this.data.posts.length - 1;
            if (e.deltaY < 0) {
                this.state.currentProjectIndex = this.state.currentProjectIndex == 0 ? 0 : this.state.currentProjectIndex - 1;
            }
            else {
                this.state.currentProjectIndex = this.state.currentProjectIndex == n_projects ? n_projects : this.state.currentProjectIndex + 1;
            }

            this.state.currentProject = this.data.posts[this.state.currentProjectIndex] || this.data.posts[0];
        },
        handleURL(id){
            console.log(id)
        switch (id) {
            case 'Github':
                this.openInNewTab('http://github.com/sajith-rahim');
                break;
            case 'Location':
                this.openInNewTab('https://goo.gl/maps/qW1eHxxyUeGjT8jN8')
                break;
            case 'Company':
                this.openInNewTab('http://www.servicenow.com')
                break;
            case 'Portfolio':
                this.openInNewTab('http://sajith-rahim.github.io')
                break;
            case 'credits':
                this.openBlogArticle('', {title: 'credits', markdown_uri:'./credits.md' })
                //this.openInNewTab('https://dribbble.com/shots/15656415-Blog-Self-Control')
                break;
        
            default:
                break;
        }
        },
        redirectToURL(url) {
            window.location.replace(url);
        },
        openInNewTab(url) {
            window.open(url, '_blank').focus();
        },

        setNotification(message){
            this.notification.content = message;
            setTimeout(() => {
                this.clearNotification();
            }, 5000);
        },
        clearNotification(){
            this.notification.content = '';
        },


        //Util

        HTMLElementToObjectConverter(dom, classNames, elementTypes = ["div"]) {

            if (dom.nodeType === Node.TEXT_NODE) {
                return dom.nodeValue;
            }
            if (dom.nodeType === Node.DOCUMENT_NODE) {
                dom = dom.documentElement;
            }
            const obj = {};
            obj.nodeType = dom.nodeType;
            if (dom.nodeType === Node.ELEMENT_NODE) {
                obj.tagName = dom.tagName;
                obj.attributes = []; // Array.from(obj.attributes) gives us a lot of things we don't want
                for (let i = 0, len = dom.attributes.length; i < len; ++i) {
                    const attr = dom.attributes[i];
                    obj.attributes.push({ name: attr.name, value: attr.value });
                }
                obj.children = [];
                for (let child = dom.firstChild; child; child = child.nextSibling) {
                    obj.children.push(this.HTMLElementToObjectConverter(child));
                }
            } else {
                obj.nodeValue = dom.nodeValue;
            }
            return obj;

        },

    }

    window.model = page;
    return page;
}


