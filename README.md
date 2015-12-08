# YRSS

YRSS is a jQuery plugin that utilizes YQL (Yahoo Query Language) to retrieve RSS (Really Simple Syndication) feed data and display it on an HTML page.

**Important:** This plugin has been configured to retrieve an RSS feed from BBNC/BBIS only.

## Setup

Copy the contents of [yrss.js](yrss.js) and paste it at the bottom of your client's global namespace file under **PLUGINS**.

## Initialization

The following code snippet demonstrates how to initialize the plugin on an HTML element. It includes all options and their default values:

```js
$('#element').rssfeed('https://bbis5740pssandbox.blackbaudhosting.com/feed.rss?id=1', {
    ssl: false,
    limit: 10,
    showerror: true,
    errormsg: '',
    date: true,
    dateformat: 'default',
    titletag: 'h4',
    content: true,
    snippet: true,
    snippetlimit: 120,
    linktarget: '_self'
});
```

## Configuration

`ssl`: (**boolean**) - enable or disable **https** protocol

`limit`: (**integer**) - number of entries to display

`showerror`: (**boolean**) - display error message if feed cannot be loaded

`errormsg`: (**string**) - display custom error message if `showerror` option is **true**

`date`: (**boolean**) - enable or disable entry dates

`dateformat`: (**string**) - accepts **default**, **spellmonth**, **localedate**, and **localedatetime** if `date` option is **true**

`titletag`: (**string**) - accepts any HTML heading tag

`content`: (**boolean**) - show or hide entry content (entry title and entry date will still be displayed)

`snippet`: (**boolean**) - entry image is moved above entry title and only first paragraph in content is displayed

`snippetlimit`: (**integer**) - character limit of first paragraph in content if `snippet` option is **true**

`linktarget`: (**string**) - accepts **_self**, **_blank**, **_parent**, and **_top**

## How to Contribute

Team contributions are how we keep our code great. Please adhere to the following guidelines.

### Workflow

For code changes, you'll need to submit a pull request. If you've never submitted one, it's easy. Just follow the [contribution docs](https://guides.github.com/introduction/flow/).

Basically:

1. Create a branch
2. Add commits
3. Open a Pull Request
4. Deploy
5. Merge (and delete branch if no longer needed)

## Suggestions / Concerns?

Please use the issue tracker in this repo to report bugs or suggest improvements.
