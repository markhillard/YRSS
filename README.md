# YRSS

[![YRSS releases](https://img.shields.io/github/release/bbClassic/YRSS.svg)](https://github.com/bbClassic/YRSS/releases)

YRSS is a jQuery plugin that utilizes [YQL](https://developer.yahoo.com/yql/) (Yahoo Query Language) to retrieve RSS (Really Simple Syndication) feed data and display it on an HTML page. Since the [Google Feed API](https://developers.google.com/feed/terms) has been discontinued, this provides another way to grab that data and customize it.

## CORS

CORS stands for Cross-Origin Resource Sharing. It's a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated ([Wikipedia](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)).

YRSS bypasses CORS restrictions (if any) by requesting a JSON response at the end of the YQL query (`&format=json`). This allows you to grab data from any valid RSS feed on the Internet.

## Setup

Include [yrss.js](yrss.js) or [yrss.min.js](yrss.min.js) as a dependency.

Check out the [demo](http://bbclassic.github.io/YRSS/demo.html) to see a working example.

## Initialization

The following code snippet demonstrates how to initialize the plugin on an HTML element. It includes all options and their default values:

```js
var feed = 'http://www.theonion.com/feeds/rss';
$('#element').yrss(feed, {
    ssl: false,
    limit: 10,
    reverse: false,
    cache: true,
    maxage: 3600,
    showerror: true,
    errormsg: '',
    tags: false,
    date: true,
    dateformat: 'default',
    titletag: 'h4',
    content: true,
    image: false,
    snippet: true,
    snippetlimit: 120,
    linktarget: '_self',
    logging: false
}, function () {
    // optional callback function
});
```

### Callback Function

As above, you can pass a callback function after the options are declared. This function will fire immediately after YQL returns feed data. This is especially useful if you need to perform any actions that the plugin can't handle by default, like fixing text/image formatting issues or running any custom scripts after the feed is loaded.

**Format:** `yrss(url, options, fn)`

## Configuration

|Option|Type|Description|
|:-----|:---|:----------|
|`ssl`|boolean|enable or disable **https** protocol|
|`limit`|integer|number of entries to display|
|`reverse`|boolean|reverse order of entries|
|`cache`|boolean|enable or disable cache control|
|`maxage`|integer|maximum age of cache in seconds (if `cache: true`)|
|`showerror`|boolean|display error message if feed cannot be loaded|
|`errormsg`|string|display custom error message (if `showerror: true`)|
|`tags`|boolean|enable or disable tagging (entry tags are added as data attribute values on entry wrapper elements)|
|`date`|boolean|enable or disable entry dates|
|`dateformat`|string|accepts **default**, **spellmonth**, **localedate**, and **localedatetime** (if `date: true`)|
|`titletag`|string|accepts any HTML tag (recommended: **h1**, **h2**, **h3**, **h4**, etc.)|
|`content`|boolean|show or hide entry content (entry title still displayed if `content: false`)|
|`image`|boolean|entry image is positioned above entry text wrapper (if `content: true`)|
|`snippet`|boolean|converts entry content into plain text (if `content: true`)|
|`snippetlimit`|integer|character limit of snippet (if `content: true` and `snippet: true`)|
|`linktarget`|string|accepts **_self**, **_blank**, **_parent**, and **_top**|
|`logging`|boolean|enable or disable logging in console (full object data and entry array)|

## Copyright

&copy; 2018 Mark Hillard

[MIT License](LICENSE.md)
