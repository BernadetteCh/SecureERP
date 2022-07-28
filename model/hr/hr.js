/* Human resources (HR) module

Data table structure:
    - id (string)
    - name (string)
    - birth date (string): in ISO 8601 format (like 1989-03-21)
    - department (string)
    - clearance level (int): from 0 (lowest) to 7 (highest)
*/

window.hrModel = (() => {
    const util = window.util
    const dataManager = window.dataManager
    let loadedTable = null
    const STORAGE_KEY = "humanresources"
    const INPUT_FIELDS = [
        "name",
        "birthday",
        "department",
        "clearance",
    ]

    function loadData(needRefresh) {
        if (!loadedTable || needRefresh) {
            return dataManager.readTableFromStore(STORAGE_KEY)
        }
        return loadedTable
    }


    function getOldestAndYoungest(data) {
        return {
            oldest: "A",
            youngest: "B"
        }
    }

    function getInputFields() {
        return INPUT_FIELDS
    }

    return {
        getTable: loadData,
        getInputFields,
        getOldestAndYoungest,
    }
})()