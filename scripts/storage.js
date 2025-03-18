export let storage = {
  // key names
    USE_COUNT_KEY: "use_count",
    DEPTH_KEY: "depth",
    NEW_TAB_KEY: "newtab",
    REGEXP_KEY: "regexp",
    REGEXP_CASESENSITIVE_KEY: "regexp_casesensitive",

  // Shared constants
    MAXIMUM_DEPTH: 5,
    DEFAULT_DEPTH: 5,
    DEFAULT_REGEXP: "^\\\[%s.*\\\]",

    get: function(key, defaultValue) {
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
      let value = defaultValue;
      console.log(`key: ${key}  defaultValue: ${defaultValue}`);
      chrome.storage.sync.get([key], function(result) {
        console.log(`key: ${key} result: ${result}`);
        console.log(`key: ${key} result.key: ${result.key}`);
        if (result.key != null && result.key != "undefined") {
          value = result.key;
        }
        //return result[key] || defaultValue;
      });
      return value;
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
      console.log(`key: ${key}  value: ${value}`);
      //chrome.storage.local.set({key: value});
      //chrome.storage.local.set({key: value}, function() {
      chrome.storage.local.set({"smoke": value}, function() {
        console.log(`SET: key: ${key} value: ${value}`);
      });
      chrome.storage.local.get(key, function(result) {
        console.log(`GET: key: ${key} result: ${result}`);
        console.log(`GET: key: ${key} result.smoke: ${result.smoke}`);
      });
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
