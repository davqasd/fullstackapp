## Create Rails application

Given we have two models, Article and Story. Article has name, text and type (like blog post, facebook post or tweet).
Story has name and contains one or more articles.

There should be a single API enpoint that returns list of articles. Basing on query params list could be:

 - searched by article name or text
 - grouped by story with totals:
   - article count
   - article type count
   - last created article
- sorted on any field `*`
- grouped by any of field `*`


## Add UI

Display the data.

UI should consist of:

- table of articles
- select box with options to group by
- sort controls in column headers `*`
- search input field `*`

Using React.js and MobX will be a big plus.


## Add realtime `*`

Let's suppose there are two users are on the same page and if one of them will create/delete/update article, second user should see these changes in real time.


## Deploy it `*`

Application should be up and running on the server. Please provide SSH access to it.
____
`*` - Optional, but their implementation will be considered
