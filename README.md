# YRSS

[![YRSS releases](https://img.shields.io/github/release/bbClassic/YRSS.svg)](https://github.com/bbClassic/YRSS/releases)

YRSS is a jQuery plugin that utilizes [YQL](https://developer.yahoo.com/yql/) (Yahoo Query Language) to retrieve RSS (Really Simple Syndication) feed data and display it on an HTML page. Since the [Google Feed API](https://developers.google.com/feed/terms) has been discontinued, this provides another way to grab that data and customize it.

YRSS can be used to pull data from any RSS feed on the Internet. However, as with any 3rd party service there's always a chance it will go down or become unusable in the future. Let's hope that Yahoo! keeps YQL up and running.

## CORS

CORS stands for Cross-Origin Resource Sharing. It's a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated ([Wikipedia](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)).

YRSS bypasses CORS restrictions (if any) by requesting a JSON response at the end of the YQL query (`&format=json`). This allows you to grab RSS feed data from any source on the Internet.

## Setup

Include [yrss.js](yrss.js) or [yrss.min.js](yrss.min.js) as a dependency.

## Initialization

The following code snippet demonstrates how to initialize the plugin on an HTML element. It includes all options and their default values:

```js
var feed1 = 'https://bbis5740pssandbox.blackbaudhosting.com/feed.rss?id=1';
$('#element').rssfeed(feed1, {
    ssl: false,
    limit: 10,
    showerror: true,
    errormsg: '',
    tags: false,
    date: true,
    dateformat: 'default',
    titletag: 'h4',
    content: true,
    snippet: true,
    snippetimage: false,
    snippetlimit: 120,
    linktarget: '_self'
}, function () {
    // optional callback function
});
```

### Callback Function

As above, you can pass a callback function after the options are declared. This function will fire immediately after YQL returns feed data.

**Format:** `rssfeed(url, options, fn)`

## Configuration

`ssl`: (**boolean**) - enable or disable **https** protocol

`limit`: (**integer**) - number of entries to display

`showerror`: (**boolean**) - display error message if feed cannot be loaded

`errormsg`: (**string**) - display custom error message (if `showerror: true`)

`tags`: (**boolean**) - enable or disable tagging (entry tags are added as data attribute values on entry wrapper elements)

`date`: (**boolean**) - enable or disable entry dates

`dateformat`: (**string**) - accepts **default**, **spellmonth**, **localedate**, and **localedatetime** (if `date: true`)

`titletag`: (**string**) - accepts any HTML heading tag

`content`: (**boolean**) - show or hide entry content (entry title still displayed if `content: false`)

`snippet`: (**boolean**) - only first paragraph in content is displayed (if `content: true`)

`snippetimage`: (**boolean**) - entry image is displayed above entry title (if `content: true` and `snippet: true`)

`snippetlimit`: (**integer**) - character limit of first paragraph in content (if `content: true` and `snippet: true`)

`linktarget`: (**string**) - accepts **_self**, **_blank**, **_parent**, and **_top**

## Copyright

&copy; 2016 Mark Hillard

[MIT License](LICENSE.md)
