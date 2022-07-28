window.util = (() => {
  function generateUniqueId() {
    let randomId = "12345678910";
    text = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < letters.length; i++) {
      text += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    let specialSymbols = ["?", "_", "!", "%", "-", "+", "§", "$", "/", "&"];
    let lettersOfText = text.slice(0, 3);
    let creationOfARandomNum = Math.random(0, 1); //creates a random Number
    let stringOfRandomNumber = creationOfARandomNum.toString(); //convert it to a string to slice it in the next step
    let randomNum = stringOfRandomNumber.slice(2, 8);
    for (let i = 0; i < randomId.length; i++) {
      let randomIndex = Math.floor(Math.random() * randomId.length);
      randomId = randomId.replace(
        randomId,
        randomNum + specialSymbols[randomIndex] + lettersOfText
      );
    }
    return randomId;
  }

  function addRow(table, newRowData) {
    let newEntry = {};
    for (let i = 0; i < table.length; i++) {
      newEntry[table[i]] = newRowData[i];
    }
    return newEntry;
  }

  function removeRow(table, id) {
    console.log(table);
    let correctIndexToDeleteRow = "";
    table.forEach(function (element, index) {
      for (let key in element) {
        if (id === element.id) {
          correctIndexToDeleteRow = index;
        }
      }
    });
    table.splice(correctIndexToDeleteRow, 1);
    console.log(table);
    return table;
  }
  function updateRow(List, id, updateItem) {
    for (let i = 0; i < List.length; i++) {
      if (id === List[i].id) {
        if (updateItem === "name") {
          let newName = prompt(
            "What do you want to change the name to?",
            "new name"
          );
          List[i].name = newName;
        } else if (updateItem === "birthday") {
          let newBirthday = prompt(
            "What do you want to change the birthday to?",
            "2000-01-01"
          );
          List[i].birthday = newBirthday;
        } else if (updateItem === "department") {
          let newDepartment = prompt(
            "What do you want to change the department to?",
            "new department"
          );
          List[i].department = newDepartment;
        } else if (updateItem === "clearance") {
          let newClearance = prompt(
            "What do you want to change the clearance to?",
            "new clearance (1-7)"
          );
          List[i].clearance = newClearance;
        } else if (updateItem === "email") {
          let newEmail = prompt(
            "What do you want to change the email to?",
            "new email"
          );
          List[i].email = newEmail;
        } else if (updateItem === "subscribed") {
          let newSubscribed = prompt(
            "What do you want to change the subscribtion-status to?",
            "true or false"
          );
          List[i].subscribed = newSubscribed;
        } else if (updateItem === "product") {
          let newProduct = prompt(
            "What do you want to change the product to?",
            "new product"
          );
          List[i].product = newProduct;
        } else if (updateItem === "price") {
          let newPrice = prompt(
            "What do you want to change the price to?",
            "new price"
          );
          List[i].price = newPrice;
        } else if (updateItem === "transactionDate") {
          let newTransactionDate = prompt(
            "What do you want to change the transactionDate to?",
            "2000-09-13"
          );
          List[i].transactionDate = newTransactionDate;
        }
      } else console.log("This ID does not exist!");
    }
    return List;
  }

  function getAge(birthDate, nowDate) {
    let currentAge = [];
    for (let element in birthDate) {
      console.log(birthDate[element].birthday);
      var ageInMilliseconds =
        new Date() - new Date(birthDate[element].birthday);
      currentAge.push(
        Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365)
      ); // converts  to years
    }
    let total = 0;
    for (let i = 0; i < currentAge.length; i++) {
      total += currentAge[i];
    }
    //calculates the avarageAge of all ages in from the array
    let averageAgeOfEmployees = Math.round(total / currentAge.length);
    console.log(averageAgeOfEmployees);
    return averageAgeOfEmployees;
  }
  getAge();
  return {
    generateUniqueId,
    getAge,
    updateRow,
    removeRow,
    addRow,
  };
})();
