window.salesController = (() => {
  // const sales = window.salesModel
  const view = window.view;

  let salesList = dataManager.readTableFromStore("sales");

  function listTransactions() {
    view.printTable(salesList, "List Transactions");
  }

  function addTransaction() {
    const INPUT_FIELDS = [
      "id",
      "customerId",
      "product",
      "price",
      "transactionDate",
    ];
    let newArray = [];
    let id = newArray.push(util.generateUniqueId());
    let customerId = newArray.push(
      prompt(
        "Please enter the customer-ID. Note: If this customer is new, please create an customer entry first",
        "Customer-ID"
      )
    );
    let product = newArray.push(prompt("Please enter the product"));
    let price = newArray.push(prompt("Please enter the price!"));
    let transactionDate = newArray.push(
      prompt("Please enter the date of the transaction", "1989-03-21")
    );

    salesList.push(util.addRow(INPUT_FIELDS, newArray));

    dataManager.writeTableToStore("sales", salesList);
  }

  function updateTransaction() {
    let transactionIDInput = prompt(
      "Please enter the ID of the transaction, which data you want to update!",
      "Transaction-ID"
    );
    let itemToUpdate = prompt(
      "Which data do you want to update? (Pls write one of the following: product, price, transactionDate. Note: If you want to change everything, pls remove this entry and create a new entry!",
      "select: product, price, transactionDate"
    );

    util.updateRow(salesList, transactionIDInput, itemToUpdate);

    dataManager.writeTableToStore("sales", salesList);
  }

  function deleteTransaction() {
    let transactionIDInput = prompt(
      "Please enter the ID of the transaction, which data you want to delete!",
      "Transaction-ID"
    );

    salesList = util.removeRow(salesList, transactionIDInput);
    dataManager.writeTableToStore("sales", salesList);
  }

  function getBiggestRevenueTransaction() {
    let biggestPrice = 0;
    salesList.forEach((element) => {
      for (let key in element) {
        if (key === "price") {
          if (biggestPrice < element[key]) biggestPrice = element[key];
        }
      }
    });
    let p = document.createElement("p");
    p.innerText = biggestPrice;
    document.getElementById("result").innerHTML="";
    document.getElementById("result").appendChild(p);
  }

  function getBiggestRevenueProduct() {
    let products = [];
    let alreadyInList = false;
    let biggestSum = 0;
    let productName = "";

    salesList.forEach((element) => {
      alreadyInList = false;
      products.forEach((pElement) => {
        for (item in pElement) {
          if (element.product === item) {
            alreadyInList = true;
            pElement[item] += element.price;
          }
        }
      });
      if (alreadyInList === false) {
        let pName = element.product;
        let pPrice = element.price;
        let myProdukt = {};
        myProdukt[pName] = pPrice;
        products.push(myProdukt);
      }
    });

    products.forEach((element) => {
      for (item in element) {
        if (element[item] > biggestSum) {
          biggestSum = element[item];
          productName = item;
        }
      }
    });

    let p = document.createElement("p");
    p.innerText = productName + ": " + biggestSum;
    document.getElementById("result").innerHTML = "";
    document.getElementById("result").appendChild(p);
  }

  function countTransactionsBetween() {
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    let submit = document.createElement("button");
    input1.type = "date";
    input2.type = "date";
    submit.type = "submit";
    submit.innerText = "submit";
    submit.id = "mySubmit";
    submit.addEventListener("click", submitButton);

    let inputDiv = document.getElementById("inputDiv");
    inputDiv.innerHTML = "";
    inputDiv.appendChild(input1);
    inputDiv.appendChild(input2);
    inputDiv.appendChild(submit);

    function submitButton() {
      let idList = [];
      let date1 = new Date(input1.value);
      let date2 = new Date(input2.value);
      let count = 0;

      salesList.forEach((element) => {
        let transactionDate = new Date(element.transactionDate);

        if (
          transactionDate.getTime() >= date1.getTime() &&
          transactionDate.getTime() <= date2.getTime()
        ) {
          count++;
        }
      });
      let p = document.createElement("p");
      p.innerText = "Quantity of Orders between: " + count;
      document.getElementById("result").appendChild(p);
    }
  }

  function sumTransactionsBetween() {
    let input1 = document.createElement("input");
    let input2 = document.createElement("input");
    let submit = document.createElement("button");
    input1.type = "date";
    input2.type = "date";
    submit.type = "submit";
    submit.innerText = "submit";
    submit.id = "mySubmit";
    submit.addEventListener("click", submitButton);

    let inputDiv = document.getElementById("inputDiv");
    inputDiv.innerHTML = "";
    inputDiv.appendChild(input1);
    inputDiv.appendChild(input2);
    inputDiv.appendChild(submit);

    function submitButton() {
      let idList = [];
      let date1 = new Date(input1.value);
      let date2 = new Date(input2.value);
      let sum = 0;

      salesList.forEach((element) => {
        let transactionDate = new Date(element.transactionDate);

        if (
          transactionDate.getTime() >= date1.getTime() &&
          transactionDate.getTime() <= date2.getTime()
        ) {
          sum += element.price;
        }
      });
      let p = document.createElement("p");
      p.innerText = "Sum of Orders between: " + sum;
      document.getElementById("result").innerHTML = "";
      document.getElementById("result").appendChild(p);
    }
  }

  function menu() {
    const options = [
      {
        title: "Back to main menu",
        operation: () => {
          window.displayMainMenu();
        },
      },
      {
        title: "List transactions",
        operation: () => {
          listTransactions();
        },
      },
      {
        title: "Add new transaction",
        operation: () => {
          addTransaction();
        },
      },
      {
        title: "Update transaction",
        operation: () => {
          updateTransaction();
        },
      },
      {
        title: "Remove transaction",
        operation: () => {
          deleteTransaction();
        },
      },
      {
        title: "Get the transaction that made the biggest revenue",
        operation: () => {
          getBiggestRevenueTransaction();
        },
      },
      {
        title: "Get the product that made the biggest revenue altogether",
        operation: () => {
          getBiggestRevenueProduct();
        },
      },
      {
        title: "Count number of transactions between",
        operation: () => {
          countTransactionsBetween();
        },
      },
      {
        title: "Sum the price of transactions between",
        operation: () => {
          sumTransactionsBetween();
        },
      },
    ];
    view.printMenu("Sales", options);
  }

  return {
    menu,
  };
})();
