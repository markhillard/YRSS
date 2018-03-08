/* YRSS 1.1.5 */
/* Copyright (c) 2018 Mark Hillard - MIT License */

(function ($) {
    
    // use strict mode
    'use strict';
    
    $.fn.yrss = function (url, options, fn) {
        
        // plugin defaults
        var defaults = {
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
        };
        
        // extend options
        options = $.extend(defaults, options);
        
        // return function
        return this.each(function (i, e) {
            // check for ssl protocol
            var s = '';
            if (options.ssl) { s = 's'; }
            
            // add class to container
            if (!$(e).hasClass('rss-feed')) { $(e).addClass('rss-feed'); }
            
            // check for valid url
            if (!url) { return false; }
            
            // create yql query
            var query = 'http' + s + '://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from feed where url="' + url + '"');
            
            // set limit
            if (!!options.limit) { query += ' limit ' + options.limit; }
            
            // reverse feed order
            if (options.reverse) { query += ' | reverse()'; }
            
            // set maximum cache age
            if (options.cache) { query += '&_maxage=' + options.maxage; }
            
            // specify format
            query += '&format=json';
            
            // send request
            $.getJSON(query, function (data, status, errorThrown) {
                // if successful... *
                if (status === 'success') {
                    // * run function to create html result
                    process(e, data, options);
                    
                    // * optional callback function
                    if ($.isFunction(fn)) { fn.call(this, $(e)); }
                    
                // if there's an error... *
                } else if (status === 'error' || status === 'parsererror') {
                    // if showerror option is true... *
                    if (options.showerror) {
                        // variable scoping (error)
                        var msg;
                        
                        // if errormsg option is not empty... *
                        if (options.errormsg !== '') {
                            // * assign custom error message
                            msg = options.errormsg;
                            
                        // if errormsg option is empty... *
                        } else {
                            // * assign default error message
                            msg = errorThrown;
                        }
                        
                        // * display error message
                        $(e).html('<div class="rss-error"><p>' + msg + '</p></div>');
                        
                    // if showerror option is false... *
                    } else {
                        // * abort
                        return false;
                    }
                }
            });
        });
    };
    
    // create html result
    var process = function (e, data, options) {
        // feed data (entries)
        var entries = data.query.results.item;
        
        // check if entries are not inside an array (only 1 entry)
        if (!$.isArray(entries)) { entries = [entries]; }
        
        // log object data to console if logging is true
        if (options.logging) {
            console.log('Object Data:');
            console.log(data);
            console.log('Entry Array:');
            console.log(entries);
        }
        
        // abort if no entries exist
        if (!entries) { return false; }
        
        // html variables
        var html = '';
        var htmlObject;
        
        // for each entry... *
        $.each(entries, function (i) {
            // * assign entry variable
            var entry = entries[i];
            
            // * variable scoping (tags)
            var tags;
            
            // if entry tags exist... *
            if (!!entry.category) {
                // * check for data type
                if ($.isArray(entry.category)) {
                    var arr = Object.keys(entry.category).map(function(key) {
                        if (entry.category[key].domain !== '') {
                            return entry.category[key].domain + ':' + entry.category[key].content;
                        } else {
                            return entry.category[key].content;
                        }
                    });
                    tags = arr;
                } else if ($.type(entry.category) === 'object') {
                    var domain = entry.category.domain,
                        obj = entry.category.content;
                    if (entry.category.domain !== '') {
                        tags = domain + ':' + obj;
                    } else {
                        tags = obj;
                    }
                } else {
                    tags = entry.category;
                }
                
                // * arrange entry tags
                tags = tags.toString().toLowerCase().replace(/ /g, '-').replace(/,/g, ' ');
            }
            
            // * variable scoping (date)
            var pubDate;
            
            // if date option is true... *
            if (entry.pubDate) {
                // * create date object
                var entryDate = new Date(entry.pubDate);
                
                // * select date format
                if (options.dateformat === 'default') {
                    pubDate = (entryDate.getMonth() + 1).toString() + '/' + entryDate.getDate().toString() + '/' + entryDate.getFullYear();
                } else if (options.dateformat === 'spellmonth') {
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    pubDate = months[entryDate.getMonth()] + ' ' + entryDate.getDate().toString() + ', ' + entryDate.getFullYear();
                } else if (options.dateformat === 'localedate') {
                    pubDate = entryDate.toLocaleDateString();
                } else if (options.dateformat === 'localedatetime') {
                    pubDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();
                }
            }
            
            // * build entry
            html += '<div class="entry-wrapper"';
            if (options.tags && !!entry.category) { html += 'data-tag="' + tags + '"'; }
            html += '><div class="entry-title"><' + options.titletag + '><a href="' + entry.link + '">' + entry.title + '</a></' + options.titletag + '></div>';
            if (options.date && pubDate) { html += '<div class="entry-date">' + pubDate + '</div>'; }
            
            // if content option is true... *
            if (options.content) {
                // * check for rss description/encoded value
                var content;
                if (!!entry.description) {
                    content = $.trim(entry.description);
                } else {
                    content = $.trim(entry.encoded);
                }
                
                // * build content
                html += '<div class="entry-content">' + content + '</div>';
            }
            
            html += '</div>';
        });
        
        // provisional html result
        htmlObject = $(html);
        
        // if content option is true... *
        if (options.content) {
            // for each entry... *
            $.each(htmlObject, function () {
                // if image option is true... *
                if (options.image) {
                    // * check for first image
                    var image = $(this).find('img').first();
                    
                    // if image exists... *
                    if (image.length !== 0) {
                        // * create image wrapper
                        $(this).prepend('<div class="entry-image">');
                        
                        // * append first image in image wrapper and wrap all textual elements after it
                        $(this).find('.entry-image').append(image).nextAll().wrapAll('<div class="entry-text"></div>');
                    } else {
                        $(this).children().wrapAll('<div class="entry-text"></div>');
                    }
                    
                // if image option is false... *
                } else {
                    // * remove all images from content
                    $(this).find('img').remove();
                }
                
                // if snippet option is true... *
                if (options.snippet) {
                    // * set character limit
                    var content = $(this).find('.entry-content');
                    var contentLength = $(content).text().length;
                    content.text(function (i, v) {
                        if (contentLength === 0) {
                            return '';
                        } else if (contentLength !== 0 && contentLength <= options.snippetlimit) {
                            return v;
                        } else {
                            return v.substring(0, options.snippetlimit) + ' ...';
                        }
                    });
                }
            });
        }
        
        // append final html result
        $(e).append(htmlObject);
        
        // apply target to links
        $('a', e).attr('target', options.linktarget);
    };
    
})(jQuery);
