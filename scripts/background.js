import {storage} from './storage.js'

var CMD_REG_EXP = /:([ptwi]{1,})$/;

// var storage = {
//     USE_COUNT_KEY: "use_count",
//     DEPTH_KEY: "depth",
//     NEW_TAB_KEY: "newtab",
//     REG_EXP_KEY: "regexp",
//     REG_EXP_OPT_KEY: "regexp_opt",
//     DEFAULT_REGEXP: "^\\\[%s.*\\\]",
// 
//     get: function(key, defaultValue) {
//         console.log(`key: ${key}  defaultValue: ${defaultValue}`);
//         if (defaultValue != null || defaultValue != "undefined") {
//             // return localStorage[key] || defaultValue;
//             return chrome.storage.local.get(key) || defaultValue;
//         } else {
//             // return localStorage[key];
//             return chrome.storage.local.get(key);
//           // var retval = undefined;
// 
//           //   chrome.storage.local.get(key, function() {
//           //     promise.then(
//           //                  function(value) {retval = value;}
//           //     )
//           //   }
//           //   );
//           // return retval;
//         }
//     },
// 
//     set: function(key, value) {
//         // localStorage[key] = value;
//         chrome.storage.local.set({key: value});
//     }
// 
// };


var kwSearch = {
    findBookmarks: async function (regex, text, callback) {
        console.log("findBookmarks: enter");

        // var maxDepth = storage.get(storage.DEPTH_KEY) || 5;
        let maxDepth = 5;
        //var maxDepth = storage.get(storage.DEPTH_KEY) || 5;
        var results = [];

      console.log(`findBookmarks: text ${text}`)
      console.log(`findBookmarks: maxDepth ${maxDepth}`)
        chrome.bookmarks.search(text, function (matched) {
            for (var i = 0; i < matched.length && results.length < maxDepth; i++) {
              console.log(`findBookmarks: i ${i} matched[i].title ${matched[i].title}`)
                if(matched[i].title && regex.test(matched[i].title)) {
                    results.push(matched[i]);
                }
            }
            callback(results);
        });
    },

    loadUrl: function (url, options) {
        var newTab = storage.get(storage.NEW_TAB_KEY);

      console.log(`loadUrl: url ${url}`);
        if (options.window) {
            chrome.windows.create({url: url});
        }

      let queryOptions = {active: true, lastFocusedWindow: true};
      chrome.tabs.query(queryOptions, ([tab]) => {
        console.log(`loadUrl: tab.id ${tab.id}`);
        chrome.tabs.update(tab.id, {url: url, pinned: options.pinned, selected: true});
      });
      //console.log("loadUrl: pre-getCurrent");
      //chrome.tabs.getCurrent(function(tab) {
      //  console.log("loadUrl: tab: " + JSON.stringify(tab));
      //  if (tab != null) {
      //    console.log(`loadUrl: tab.id ${tab.id}`);
      //    chrome.tabs.update(tab.id, {url: url, pinned: options.pinned, selected: true});
      //  }
      //});
        //chrome.tabs.getSelected(null, function (tab) {
        //    if (tab != null && newTab != "true" && options.tab != true || tab.url == "chrome://newtab/") {
        //        chrome.tabs.update(tab.id, {url: url, pinned: options.pinned, selected: true});
        //    } else {
        //        chrome.tabs.create({url: url, pinned: options.pinned, selected: true});
        //    }
        //});
        kwSearch.updateCount();
    },

    updateCount: function() {
        var cnt = storage.get(storage.USE_COUNT_KEY, 0);
        storage.set(storage.USE_COUNT_KEY, parseInt(cnt) + 1);
    },

    getSuggestion: function (bookmarks, text) {
        return bookmarks.map(function (bookmark){
            var t = bookmark.title;
            var re = new RegExp("(" + text + ")");

            return {
                content: bookmark.url,
                description: 'Open ' + (re.test(t) ? t.replace(re, '<match>' + RegExp.$1 +'</match>') : '<match>' + t + '</match>')
            };
        });
    },

    getRegExp: async function(text) {
        var regExp = storage.get(storage.REG_EXP_KEY);
        var reCase = storage.get(storage.REG_EXP_OPT_KEY);

        if (reCase != "true") {
            reCase = "i";
        } else {
            reCase = null;
        }
        let r = new RegExp(storage.DEFAULT_REGEXP.replace(/%s/g, text), reCase);

      console.log(`regExp: ${regExp}`);
    //    if (regExp != null) {
    //        r = new RegExp(regExp.replace(/%s/g, text), reCase);
    //    }
      // regExp.then(function(value) {
      //   console.log(`value: ${value}`);
      //   console.log("value: " + JSON.stringify(value));
      //   if (Object.keys(value).length != 0) {
      //     r = new RegExp(value.replace(/%s/g, text), reCase);
      //   }
      // })

        return r;
    },

    buildOptions: function(text) {
        if(CMD_REG_EXP.test(text)) {
            var cmd = RegExp.$1;
            return {
                pinned: cmd.indexOf("p") != -1, 
                window: cmd.indexOf("w") != -1, 
                incognito: cmd.indexOf("i") != -1, 
                tab: cmd.indexOf("t") != -1
            }
        } else {
            return {};
        }
    }
};

chrome.omnibox.onInputChanged.addListener(async function (text, suggest) {
    if (!text) {
        return;
    }

    text = text.replace(CMD_REG_EXP, "");

    kwSearch.findBookmarks(kwSearch.getRegExp(text), text, function (results) {
        suggest(kwSearch.getSuggestion(results, text));
    });
});

chrome.omnibox.onInputEntered.addListener(function (text) {
    if (!text) {
        return;
    }
    var options = kwSearch.buildOptions(text);

    text = text.replace(CMD_REG_EXP, "");

    if (/(^http:|^https:|^javascript:|^ftp:|^file:)/.test(text)) {
        kwSearch.loadUrl(text, options);
    }

    kwSearch.findBookmarks(kwSearch.getRegExp(text), text, function (results) {
        if (results.length > 0) {
            kwSearch.loadUrl(results[0].url, options);
        } 
    });
});
