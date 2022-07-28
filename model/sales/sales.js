/* Sales module

Data table structure:
    - id (string)
    - customer id (string)
    - product (string)
    - price (float)
    - transaction date (string): in ISO 8601 format (like 1989-03-21)
*/

window.salesModel = (() => {
    const util = window.util
    const dataManager = window.dataManager
    let loadedTable = null
    const STORAGE_KEY = "sales"
    const INPUT_FIELDS = [
        "customerId",
        "product",
        "price",
        "transactionDate",
    ]

    function loadData(needRefresh) {
        if (!loadedTable || needRefresh) {
            return dataManager.readTableFromStore(STORAGE_KEY)
        }
        return loadedTable
    }

    function getInputFields() {
        return INPUT_FIELDS
    }

    return {
        getTable: loadData,
        getInputFields,
    }
})()