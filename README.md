# .md-blog

<img align="right" style="float:right;border:1px solid black" width=120 height=120 src="https://raw.githubusercontent.com/sajith-rahim/cdn/main/content/blog/media/poc_tag.png" />

*render your markdown files as static SPA blog.*



<p>

<img src="https://alpinejs.dev/alpine_long.svg" width="80" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/jquery/jquery-original.svg"  width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="40" height="40" />
</p>


## Getting Started




## Setup

1. Clone the repository

2. Goto to repo root folder and `run npm install` 

3. Create an `index.json` file and copy and paste the below defined configuration
```
{   
    "title":"Knowledge Base",
    "version": "1.3",
    "owner": "sajith.rahim",
    "year": "2022",
    "ticker_text": "Knowledge Base v1.3",
    "show_post_count_in_ticker": "true",
    "top_posts":[
        "The Shawshank Redemption",
        "The Godfather",
        "The Lord of the Rings: The Return of the King"
    ],
    "posts": [
        {
            "title": "The Shawshank Redemption",
            "html_description": "<h2><span>Andy Dufresne</span> - who crawled through a river of s*** and came out clean on the other side.</h2>",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "type": "Project",
            "author": "Stephen King",
            "markdown_uri": "https://raw.githubusercontent.com/sajith-rahim/cdn/main/content/blog/static/content/post-1.md",
            "date": "11-Jul-2022",
            "read_time": 26,
            "poster_uri": "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        },
        {
            "title": "The Godfather",
            "description": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
            "html_description": "<h2> It's A Sicilian Message. It means <span>Luca Brasi</span> sleeps With The Fishes.</h2>",
            "type": "Project",
            "author": "Carlyle Bradshaw",
            "markdown_uri": "https://raw.githubusercontent.com/sajith-rahim/cdn/main/content/blog/static/content/post-2.md",
            "date": "17-Mar-2022",
            "read_time": 8
        },
        {
            "title": "The Lord of the Rings: The Return of the King",
            "description": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
            "html_description": "<p>This is some<span>highlighted text</span> among some other text</p>",
            "type": "Article",
            "author": "J.R.R. Tolkien",
            "markdown_uri": "https://raw.githubusercontent.com/sajith-rahim/cdn/main/content/blog/static/content/post-3.md",
            "date": "06-Feb-2022",
            "read_time": 17
        }
    ]
}
```
4. Make the neccessary changes for customization (refer Configuration Details below)

5. Upload the file to any of your public github repository or public FTP server and copy the direct URI for the file 


For github, it should look something like this

```
https://raw.githubusercontent.com/<github_username>/<...PATH_TO_FOLDER...>/index.json
```

6. Open `js/main.js` and update the URI in `page.metadata.uri`

7. For setting custom password. 
Run the below code in console

```
function simpleHash(s) {
    return s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
}

simpleHash(<YOUR_PASSWORD>)
```
Copy the value returned and Open `js/main.js` and replace `page.auth.hash` value with copied value

8. Run `npm run build`

### Configuration Details

```json   
{   
    "title":"Knowledge Base",
    "version": "1.3",
    "owner": "sajith.rahim",
    "year": "2022",
    // text to show ticker
    "ticker_text": "Knowledge Base v1.3",
    "show_post_count_in_ticker": "true",
    /*
    * array of names of top posts.
    */
    "top_posts":[
        "The Shawshank Redemption",
        "The Godfather",
        "The Lord of the Rings: The Return of the King"
    ],
    /*
    * metadata array of posts.
    */
    "posts": [
        {
            "title": "The Shawshank Redemption",
            // can contain html tags like h2, span etc for hightligthing
            "html_description": "<h2><span>Andy Dufresne</span> - who crawled through a river of s*** and came out clean on the other side.</h2>",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            // define type
            "type": "Project",
            "author": "Stephen King",
            // URI of md file
            "markdown_uri": "https://xyz.com/content/post-1.md",
            // rendered as txt, format not important.
            "date": "11-Jul-2022",
            "read_time": 26,
            // URI for custom poster image (will use default image if not provided.)
            "poster_uri": "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        },
       ...
    ]
}
```
