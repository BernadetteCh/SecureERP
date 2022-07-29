window.crmController = (() => {
  const crm = window.crmModel;
  const view = window.view;

  let customersList = dataManager.readTableFromStore("customers");

  function listCustomers() {
    view.printTable(customersList, "Customers");
  }

  function addCustomer() {
    const INPUT_FIELDS = ["id", "name", "email", "subscribed"];

    let newArray = [];
    let id = newArray.push(util.generateUniqueId());
    let name = newArray.push(prompt("Please enter a name", "name"));
    let email = newArray.push(prompt("Please enter an email!", "email"));
    let subscribed = newArray.push(
      prompt("Did they subscribe to the newsletter?", "true or false")
    );

    customersList.push(util.addRow(INPUT_FIELDS, newArray));
  }
  function updateCustomer() {
    let customerIDInput = prompt(
      "Please enter the ID of the customer you want to update!",
      "customer-ID"
    );
    let itemToUpdate = prompt(
      "Which data do you want to update? (Pls write one of the following: name, birthday, department, clearance. Note: If you want to change everything, pls remove this entry and create a new entry!",
      "select: name, email, subscribed"
    );

    util.updateRow(customersList, customerIDInput, itemToUpdate);
    dataManager.writeTableToStore("customers", customersList);
  }

  function updateCustomer() {
    let customerIDInput = prompt(
      "Please enter the ID of the customer you want to update!",
      "customer-ID"
    );

    //if the customerIDInput exists as an ID in the customersList already, then update the customer.
    console.log(customersList);
    for (let i = 0; i < customersList.length; i++) {
      if (customerIDInput === customersList[i].id) {
        let customerToUpdate = customersList[i];
        let name = prompt("Please enter a name", "customer's name");
        let subscribed = prompt("Did the user subscribe?", "true or false?");
        let email = prompt("Please enter the email", "customer's email");

        //create Object with keys and values from the input
        customerToUpdate.name = name;
        customerToUpdate.subscribed = subscribed;
        customerToUpdate.email = email;
        console.log(customerToUpdate);
      } else console.log("This ID does not exist!");
    }
    console.log(customersList);
    dataManager.writeTableToStore("customers", customersList);
  }

  function deleteCustomer() {
    let customerIDInput = prompt(
      "Please enter the ID of the person you want to delete!",
      "customer-ID"
    );
    //if the userIDInput exists as an ID in the customersList already, then delete the whole user.
    console.log(customersList);
    for (let i = 0; i < customersList.length; i++) {
      if (customerIDInput === customersList[i].id) {
        console.log(customersList[i]);
        customersList.splice([i], 1);
        dataManager.writeTableToStore("customers", customersList);
      }
    }
    console.log(customersList);
  }

  function getSubscribedEmails() {
    let myCustomersEmails = [];
    for (let i = 0; i < customersList.length; i++) {
      if (customersList[i].subscribed === true) {
        myCustomersEmails.push(customersList[i].email);
      }
    }
    view.printMessage("subscribed Emails: "+myCustomersEmails);
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
        title: "List customers",
        operation: () => {
          listCustomers();
        },
      },
      {
        title: "Add new customer",
        operation: () => {
          addCustomer();
        },
      },
      {
        title: "Update customer",
        operation: () => {
          updateCustomer();
        },
      },
      {
        title: "Remove customer",
        operation: () => {
          deleteCustomer();
        },
      },
      {
        title: "Subscribed customer emails",
        operation: () => {
          getSubscribedEmails();
        },
      },
    ];
    view.printMenu("Customer Relationship Management", options);
  }

  return {
    menu,
  };
})();
