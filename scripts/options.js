import {storage} from './storage.js'

// window.onload = function() {
//   loadOptions();
// 
//   $("saveBtn").addEventListener('click', save);
// 
//   var helpElements = document.getElementsByClassName("help");
// 
//   for(var i = 0; i < helpElements.length; i++) {
//     helpElements[i].addEventListener('click', function() {
//       this.addEventListener('click', showHelp(this.id.substring(1)));
//     });
//   }
// }
// 
// var MAX_DEPTH = 5;
// 
// function $(id) {
//     return document.getElementById(id);
// }
// 
// function save() {
//     storage.set(storage.REGEXP_KEY, $("regexp").value);
//     storage.set(storage.REGEXP_CASESENSITIVE_KEY, $("regexpcase").checked);
//     storage.set(storage.NEW_TAB_KEY, $("newtab").checked);
//     storage.set(storage.DEPTH_KEY, parseInt($("maxDepth").value));
// 
//     //window.close();
// }
// 
// function loadOptions() {
//     //var re = storage.get(storage.REGEXP_KEY);
//     let re = storage.get(storage.REGEXP_KEY, storage.DEFAULT_REGEXP);
//     console.log(`re: ${re}`);
//     var reCase = storage.get(storage.REGEXP_CASESENSITIVE_KEY);
//     var newTab = storage.get(storage.NEW_TAB_KEY);
//     //var maxDepth = storage.get(storage.DEPTH_KEY, 5);
//     let maxDepth = storage.get(storage.DEPTH_KEY, storage.DEFAULT_DEPTH);
// 
//     //$("regexp").value = (re ? re : storage.DEFAULT_REGEXP);
//     $("regexp").value = re;
//     $("regexpcase").checked = (reCase == "true" ? true : false);
//     $("newtab").checked = (newTab == "true" ? true : false);
//     $("maxDepth").value = maxDepth;
//     $("xrange").innerHTML = storage.MAXIMUM_DEPTH;
//     $("usageCount").innerHTML = storage.get(storage.USE_COUNT_KEY, 0);
// }
// 
// function showHelp(index) {
//     var helpText = [
//         'Regular Expression defines the expression by which the extension identifies the portion of the bookmark title to be used as keyword. For example if the bookmark title is "[fb] Facebook" then the "[fb]" represents the keyword portion of the bookmark.',
//         'Case Sensitive option defines if the keyword searches are cases sensetive.',
//         'Open in New Tab option defines if the bookmark should be opened in the new tab.',
//         '# of Suggestions defines how many suggestions should the search return if there is more then one match. Note that even if there is more then one match the first entry from the list will be loaded.',
//         'Keyword Expended keeps track of how many times you used the extension to expan/load a bookmark using the keyword'
//     ];
//     $("msg").innerHTML = helpText[index];
// }

const saveOptions = () => {
  const regexp_value = document.getElementById('regexp').value;
  const regexp_casesensitive_value = document.getElementById('regexpcase').checked;
  console.log(`regexp_casesensitive_value: ${regexp_casesensitive_value}`);

  chrome.storage.sync.set(
                          {
                            regexp: regexp_value
                            , regexp_casesensitive: regexp_casesensitive_value
                          },
                          () => {
                          }
  );

};

const restoreOptions = () => {
  chrome.storage.sync.get(
                          {regexp: storage.DEFAULT_REGEXP
                          , regexp_casesensitive: false
                          },
                          (items) => {
                            document.getElementById('regexp').value = items.regexp;
                            document.getElementById('regexpcase').checked = items.regexp_casesensitive;
                            console.log(`items.regexp_casesensitive: ${items.regexp_casesensitive}`);
                          }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);
