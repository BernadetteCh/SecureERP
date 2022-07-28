// // Do not modify this file!

// window.dataManager = (() => {
//   /**
//    * Read data from localStorage into a data table.
//    *
//    * @param {string} storageKey The name of the key to read from in localStorage.
//    *
//    * @returns The data parsed into a list of objects.
//    */
//   function readTableFromStore(storageKey) {
//     try {
//       return JSON.parse(window.localStorage.getItem(storageKey));
//     } catch (err) {
//       console.error("", err);
//     }
//   }

//   /**
//    * Write tabular readTableFromStoredata into localStorage.
//    *
//    * @param {string} storageKey The name of the key to write into in localStorage
//    * @param {*} table list objects containing tabular data.
//    */
//   function writeTableToStore(storageKey, table) {
//     window.localStorage.setItem(storageKey, JSON.stringify(table));
//   }

//   /**
//    * Initialize localstorege if empty
//    */
//   function initStorage() {
//     fetch("/model/data.json")
//       .then((data) => data.json())
//       .then((data) => {
//         for (let [key, table] of Object.entries(data)) {
//           if (readTableFromStore(key) === null) {
//             writeTableToStore(key, table);
//             console.log("Set up initial data to storage");
//           }
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to load initial data...", err);
//       });
//   }

//   initStorage();
//   return {
//     writeTableToStore,
//     readTableFromStore,
//   };
// })();

// Do not modify this file!

window.dataManager = (() => {
  /**
   * Read data from localStorage into a data table.
   *
   * @param {string} storageKey The name of the key to read from in localStorage.
   *
   * @returns The data parsed into a list of objects.
   */
  function readTableFromStore(storageKey) {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey));
    } catch (err) {
      console.error("", err);
    }
  }

  /**
   * Write tabular readTableFromStoredata into localStorage.
   *
   * @param {string} storageKey The name of the key to write into in localStorage
   * @param {*} table list objects containing tabular data.
   */
  function writeTableToStore(storageKey, table) {
    window.localStorage.setItem(storageKey, JSON.stringify(table));
  }

  /**
   * Initialize localstorege if empty
   */
  function initStorage() {
    fetch("/model/data.json")
      .then((data) => data.json())
      .then((data) => {
        for (let [key, table] of Object.entries(data)) {
          if (readTableFromStore(key) === null) {
            writeTableToStore(key, table);
            console.log("Set up initial data to storage");
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load initial data...", err);
      });
  }

  initStorage();

  function stopMenu(parameterWord) {
    const menu = document.getElementById(parameterWord);
    while (menu.childElementCount > 0) {
      menu.removeChild(menu.lastChild);
    }
  }
  return {
    writeTableToStore,
    readTableFromStore,
    stopMenu,
  };
})();
