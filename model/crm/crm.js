/* Customer Relationship Management (CRM) module

Data table structure:
    - id (string)
    - name (string)
    - email (string)
    - subscribed (int): Is subscribed to the newsletter? 1: yes, 0: no
*/

window.crmModel = (() => {
  const util = window.util;
  const dataManager = window.dataManager;
  let loadedTable = null;
  const STORAGE_KEY = "customers";
  const INPUT_FIELDS = ["name", "email", "subscribed"];

  function loadData(needRefresh) {
    if (!loadedTable || needRefresh) {
      return dataManager.readTableFromStore(STORAGE_KEY);
    }
    return loadedTable;
  }

  function getInputFields() {
    return INPUT_FIELDS;
  }

  return {
    getTable: loadData,
    getInputFields,
  };
})();
