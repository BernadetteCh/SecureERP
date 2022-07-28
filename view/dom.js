window.view = (() => {
  function printErrorMessage(message) {
    const messageBox = document.getElementById("error-message");
    messageBox.innerText = message;
  }

  function printMessage(message) {
    const messageBox = document.getElementById("message");
    messageBox.innerText = message;
  }

  function getInput(message) {
    return prompt(message);
  }

  function getInputs(fields) {
    let result = {};
    // ... tip: you can use prompt to get multiple input
    return result;
  }

  function printTable(table, title) {
    let counter = 0;
    let myTable = document.createElement("table");
    let h2 = document.createElement("h2");
    h2.innerText = title;
    let tableRowH = document.createElement("tr");

    tableRowH.id = "tableHeader";
    myTable.appendChild(tableRowH);
    let resultDiv = document.getElementById("result");
    resultDiv.appendChild(h2);
    resultDiv.appendChild(myTable);
    table.forEach(function (value, index) {
      let tableRow = document.createElement("tr");

      for (let key in value) {
        if (counter < 1) {
          let header = document.createElement("th");
          let textNode = document.createTextNode(key);
          header.appendChild(textNode);
          let tableHeader = document.getElementById("tableHeader");
          tableHeader.appendChild(header);
        }
        let tableData = document.createElement("td");
        let tNode = document.createTextNode(value[key]);

        tableData.appendChild(tNode);
        tableRow.appendChild(tableData);
      }
      counter++;
      myTable.appendChild(tableRow);
    });
  }

  function printGeneralResults(data, title) {
    printTable(data, title);
  }

  function printMenu(title, listOptions) {
    const menuNode = document.getElementById("menu");
    const titleNode = document.createElement("h1");
    titleNode.innerText = title;
    const listNode = document.createElement("ul");
    for (let i = 0; i < listOptions.length; i++) {
      const listItemNode = document.createElement("li");
      const buttonNode = document.createElement("button");
      buttonNode.innerText = listOptions[i].title;
      //Ask for innerText to add ClassList to style specific buttons
      if (buttonNode.innerText === "Customer Relationship Management (CRM)") {
        buttonNode.classList.add("crmButton");
      }
      if (buttonNode.innerText === "Sales") {
        buttonNode.classList.add("salesButton");
      }

      if (buttonNode.innerText === "Human Resources") {
        buttonNode.classList.add("humanResourceButton");
      }

      buttonNode.onclick = listOptions[i].operation;
      listItemNode.appendChild(buttonNode);
      listNode.appendChild(listItemNode);
    }
    menuNode.appendChild(listNode);
  }

  return {
    printErrorMessage,
    getInput,
    getInputs,
    printTable,
    printMessage,
    printGeneralResults,
    printMenu,
  };
})();
