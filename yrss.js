(function($) {
    
    $.fn.rssfeed = function(url, options, fn) {
        
        // plugin defaults
        var defaults = {
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
        };
        
        // extend options
        var options = $.extend(defaults, options);
        
        // functions
        return this.each(function(i, e) {
            var s = '';
            
            // check for ssl protocol
            if (options.ssl) { s = 's'; }
            
            // add class to container
            if (!$(e).hasClass('rssFeed')) { $(e).addClass('rssFeed'); }
            
            // check for valid url
            if (url === null) { return false; }
            
            // create yql query
            var query = 'http' + s + '://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from feed where url="' + url + '"');
            if (options.limit !== null) { query += ' limit ' + options.limit; }
            query += '&format=json';
            
            // send request
            $.getJSON(query, function(data, status, errorThrown) {
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
                        // if errormsg option is not empty... *
                        if (options.errormsg !== '') {
                            // * assign custom error message
                            var msg = options.errormsg;
                            
                        // if errormsg option is empty... *
                        } else {
                            // * assign default error message
                            var msg = data.errorThrown;
                        }
                        
                        // * display error message
                        $(e).html('<div class="rssError"><p>' + msg + '</p></div>');
                        
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
    var process = function(e, data, options) {
        // feed data (entries)
        var entries = data.query.results.item;
        
        // abort if no entries exist
        if (!entries) { return false; }
        
        var html = '';
        var htmlObject;
        
        // for each entry... *
        $.each(entries, function(i) {
            // * assign entry variable
            var entry = entries[i];
            
            // * arrange entry tags
            var tags = entry.category.toString().toLowerCase().replace(/ /g, '-').replace(/,/g, ' ');
            
            // * assign date variable
            var pubDate;
            
            // if date option is true... *
            if (entry.pubDate) {
                // * create date object
                var entryDate = new Date(entry.pubDate);
                
                // * select date format
                if (options.dateformat === 'default') {
                    var pubDate = (entryDate.getMonth() + 1).toString() + '/' + entryDate.getDate().toString() + '/' + entryDate.getFullYear();
                } else if (options.dateformat === 'spellmonth') {
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var pubDate = months[entryDate.getMonth()] + ' ' + entryDate.getDate().toString() + ', ' + entryDate.getFullYear();
                } else if (options.dateformat === 'localedate') {
                    var pubDate = entryDate.toLocaleDateString();
                } else if (options.dateformat === 'localedatetime') {
                    var pubDate = entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString();
                }
            }
            
            // * build entry
            html += '<div class="entryWrapper" data-tag="' + tags + '">';
            html += '<div class="entryTitle"><' + options.titletag + '><a href="' + entry.link + '">' + entry.title + '</a></' + options.titletag + '></div>';
            if (options.date && pubDate) { html += '<div class="entryDate">' + pubDate + '</div>'; }
            
            // if content option is true... *
            if (options.content) {
                // * build content
                var content = entry.description;
                html += '<div class="entryContent">' + content + '</div>';
            }
            
            html += '</div>';
        });
        
        // provisional html result
        htmlObject = $(html);
        
        // if content option is true... *
        if (options.content) {
            // for each entry... *
            $.each(htmlObject, function() {
                // if snippet option is true... *
                if (options.snippet) {
                    // * check for first image
                    var image = $(this).find('img').first();
                    
                    // if image exists... *
                    if (image.length !== 0) {
                        // * create image wrapper
                        $(this).prepend('<div class="entryImage">');
                        
                        // * append image in wrapper
                        $(this).find('.entryImage').append(image);
                    }
                    
                    // * remove all content except for first paragraph
                    $(this).find('.entryContent *').not('p').first().hide();
                    
                    // * set character limit
                    var paragraph = $(this).find('p');
                    paragraph.text(paragraph.text().substring(0, options.snippetlimit) + ' ...');
                }
            });
        }
        
        // append final html result
        $(e).append(htmlObject);
        
        // apply target to links
        $('a', e).attr('target', options.linktarget);
    };
    
})(jQuery);
