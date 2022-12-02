# .md-blog

<img align="right" style="float:right;border:1px solid black" width=120 height=120 src="https://raw.githubusercontent.com/sajith-rahim/cdn/main/content/blog/media/poc_tag.png" />

*render your markdown files as static SPA blog.*



<p>

<img src="https://alpinejs.dev/alpine_long.svg" width="80" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/jquery/jquery-original.svg"  width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="40" height="40" />
</p>


## Getting Started


### Configuration

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
