export let storage = {
  // key names
    USE_COUNT_KEY: "use_count",
    DEPTH_KEY: "depth",
    NEW_TAB_KEY: "newtab",
    REG_EXP_KEY: "regexp",
    REG_EXP_OPT_KEY: "regexp_opt",

  // Shared constants
    MAXIMUM_DEPTH: 5,
    DEFAULT_DEPTH: 5,
    DEFAULT_REGEXP: "^\\\[%s.*\\\]",

    get: function(key, defaultValue) {
        console.log(`key: ${key}  defaultValue: ${defaultValue}`);
        // if (defaultValue != null || defaultValue != "undefined") {
        //     // return localStorage[key] || defaultValue;
        //     return chrome.storage.local.get(key) || defaultValue;
        // } else {
        //     // return localStorage[key];
        //     return chrome.storage.local.get(key);
        //   // var retval = undefined;

        //   //   chrome.storage.local.get(key, function() {
        //   //     promise.then(
        //   //                  function(value) {retval = value;}
        //   //     )
        //   //   }
        //   //   );
        //   // return retval;
        // }
      // TODO: consider switching from 'local' to 'sync'
      //const data = await chrome.storage.local.get(key);
      //return data[key] || defaultValue;
      //return chrome.storage.local.get(key, (result) => {
      chrome.storage.local.get(key, (result) => {
        console.log(`result: ${result}`);
        if (result[key] != null && result[key] != "undefined") {
          return result[key]
        } else {
          return defaultValue;
        }
        //return result[key] || defaultValue;
      });
      return defaultValue;
      //if (defaultValue != null || defaultValue != "undefined") {
      //}
      //let result = chrome.storage.local.get({key: defaultValue});
      //let data = result.then(;
      //chrome.storage.local.get({key: defaultValue}, (result) => {
      //  return result[key];
      //});
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
