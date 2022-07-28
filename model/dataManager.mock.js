// Do not modify this file!

window.dataManager = (() => {
    const data = require("./data.json")
    /**
     * Read data from localStorage into a data table.
     * 
     * @param {string} storageKey The name of the key to read from in localStorage.
     * 
     * @returns The data parsed into a list of objects.
    */
    function readTableFromStore(storageKey) {
        return data[storageKey]
    }

    /**
     * Write tabular data into localStorage.
     * 
     * @param {string} storageKey The name of the key to write into in localStorage
     * @param {*} table list objects containing tabular data.
     */
    function writeTableToStore(storageKey, table) {
        data[storageKey] = table
    }

    return {
        writeTableToStore,
        readTableFromStore
    }
})();