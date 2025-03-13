var storage = {
    USE_COUNT_KEY: "use_count",
    DEPTH_KEY: "depth",
    NEW_TAB_KEY: "newtab",
    REG_EXP_KEY: "regexp",
    REG_EXP_OPT_KEY: "regexp_opt",
    DEFAULT_REGEXP: "^\\\[%s.*\\\]",

    get: function(key, defaultValue) {
        console.log(`key: ${key}  defaultValue: ${defaultValue}`);
        if (defaultValue != null || defaultValue != "undefined") {
            // return localStorage[key] || defaultValue;
            return chrome.storage.local.get(key) || defaultValue;
        } else {
            // return localStorage[key];
            return chrome.storage.local.get(key);
          // var retval = undefined;

          //   chrome.storage.local.get(key, function() {
          //     promise.then(
          //                  function(value) {retval = value;}
          //     )
          //   }
          //   );
          // return retval;
        }
    },

    set: function(key, value) {
        // localStorage[key] = value;
        chrome.storage.local.set({key: value});
    }

};
// var storage = {
//     USE_COUNT_KEY: "use_count",
//     DEPTH_KEY: "depth",
//     NEW_TAB_KEY: "newtab",
//     REG_EXP_KEY: "regexp",
//     REG_EXP_OPT_KEY: "regexp_opt",
//     DEFAULT_REGEXP: "^\\\[%s.*\\\]",
// 
//     get: function(key, defaultValue) {
//         if (defaultValue != null || defaultValue != "undefined") {
//             return localStorage[key] || defaultValue;
//         } else {
//             return localStorage[key];
//         }
//     },
// 
//     set: function(key, value) {
//         localStorage[key] = value;
//     }
// 
// };
