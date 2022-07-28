window.hrController = (() => {
  const hr = window.hrModel;
  const view = window.view;

  let employeeList = dataManager.readTableFromStore("humanresources");

  function listEmployees() {
    view.printTable(employeeList, "Human resources");
  }

  function addEmployee() {
    const INPUT_FIELDS = ["id", "name", "birthday", "department", "clearance"];
    let newArray = [];
    let id = newArray.push(util.generateUniqueId());
    let name = newArray.push(prompt("Please enter a name"));
    let birthday = newArray.push(
      prompt(
        "Please enter a birth date (string): in ISO 8601 format",
        "1989-03-21"
      )
    );
    let department = newArray.push(prompt("Please enter the department"));
    let clearance = newArray.push(
      prompt(
        "Please enter the clearance level",
        "from 0 (lowest) to 7 (highest)"
      )
    );

    employeeList.push(util.addRow(INPUT_FIELDS, newArray));

    dataManager.writeTableToStore("humanresources", employeeList);
  }
  function updateEmployee() {
    let employeeIDInput = prompt(
      "Please enter the ID of the employee, whose data you want to update!",
      "Employee-ID"
    );
    let itemToUpdate = prompt(
      "Which data do you want to update? (Pls write one of the following: birthday, department, clearance. Note: If you want to change everything, pls remove this entry and create a new entry!",
      "select: name, birthday, department, clearance"
    );

    util.updateRow(employeeList, employeeIDInput, itemToUpdate);

    dataManager.writeTableToStore("humanresources", employeeList);
  }
  function deleteEmployee() {
    let employeeIDInput = prompt(
      "Please enter the ID of the employee, whose data you want to delete!",
      "Employee-ID"
    );
    employeeList = util.removeRow(employeeList, employeeIDInput);
    dataManager.writeTableToStore("humanresources", employeeList);
  }
  function getOldestAndYoungest() {
    let oldestDate = "";
    let nameOldest = "";
    let youngestDate = "";
    let nameYoungest = "";
    let countLoops = 0;
    let employeeBirthday = "";
    employeeList.forEach((element) => {
      employeeBirthday = new Date(element.birthday);

      if (countLoops === 0) {
        oldestDate = new Date(element.birthday);
        nameOldest = element.name;
        youngestDate = new Date(element.birthday);
        nameYoungest = element.name;
      }
      if (employeeBirthday.getTime() < oldestDate.getTime()) {
        oldestDate = new Date(element.birthday);
        nameOldest = element.name;
      } else if (employeeBirthday.getTime() > youngestDate.getTime()) {
        youngestDate = new Date(element.birthday);
        nameYoungest = new Date(element.name);
      }

      countLoops++;
    });

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    p1.innerText =
      "Youngest employee " + nameYoungest + " Birthday: " + youngestDate;
    p2.innerText = "Oldest employee " + nameOldest + " Birthday: " + oldestDate;

    let divResult = document.getElementById("result");
    divResult.appendChild(p1);
    divResult.appendChild(p2);
  }
  function getAverageAge() {
    let averageAge = util.getAge(employeeList);
    view.printMessage(`The average Age is: ${averageAge}`);
  }
  function nextBirthdays() {
    let input = document.createElement("input");
    let button = document.createElement("button");
    //button.type = "submit";
    button.innerText = "submit";
    button.innerText = "submit";
    input.type = "date";
    input.id = "inputDate";
    button.addEventListener("click", getBirthday);
    let inputDiv = document.getElementById("inputDiv");
    inputDiv.appendChild(input);
    inputDiv.appendChild(button);

    let twoWeeks = 14 * 24 * 60 * 60 * 1000;
    //let oneYear = (365 * 24 * 60 * 60 * 1000);

    function getBirthday() {
      let foundBirhday = false;
      let iYear = 0;
      let newEmDate;
      let days = 0;
      let daysToBirthday = 0;
      let iDate;
      let employeeName = "";

      inputDate = document.querySelector("#inputDate").value;
      iDate = new Date(inputDate);
      iYear = iDate.getFullYear();

      employeeList.forEach((element) => {
        const [yearE, monthE, dayE] = element.birthday.split("-");
        newEmDate = iYear + "-" + monthE + "-" + dayE;
        newEmDate = new Date(newEmDate);
        days = newEmDate.getTime() - iDate.getTime();
        if (days <= twoWeeks && days > 0) {
          console.log("days " + days);
          employeeName = element.name;
          daysToBirthday = days;
          foundBirhday = true;
        }
      });
      daysToBirthday = daysToBirthday / 24 / 60 / 60 / 1000;
      let p = document.createElement("p");
      if (foundBirhday === true) {
        view.printMessage(
          `Employee ${employeeName} Birthday is in ${daysToBirthday}`
        );
        // p.innerText =
        //   "Employee " +
        //   employeeName +
        //   " Birthday is in " +
        //   daysToBirthday +
        //   " days.";
      } else {
        view.printMessage(`No Birthday in the next 2 weeks`);
        // p.innerText = "No Birthday in the next 2 weeks";
      }
      let divResult = document.getElementById("result");
      divResult.appendChild(p);
    }
  }
  function countEmployeesWithClearance() {
    view.printErrorMessage("Not implemented yet."); // - Raphael
  }
  function countEmployeesPerDepartment() {
    view.printErrorMessage("Not implemented yet."); // - Raphael
  }

  function menu() {
    const options = [
      {
        title: "Back to main menu",
        operation: () => {
          window.displayMainMenu();
        },
      },
      { title: "List employees", operation: () => listEmployees() },
      { title: "Add new employee", operation: () => addEmployee() },
      { title: "Update employee", operation: () => updateEmployee() },
      { title: "Remove employee", operation: () => deleteEmployee() },
      {
        title: "Oldest and youngest employees",
        operation: () => getOldestAndYoungest(),
      },
      { title: "Employees average age", operation: () => getAverageAge() },
      {
        title: "Employees with birthdays in the next two weeks",
        operation: () => nextBirthdays(),
      },
      {
        title: "Employees with clearance level",
        operation: () => countEmployeesWithClearance(),
      },
      {
        title: "Employee numbers by department",
        operation: () => countEmployeesPerDepartment(),
      },
    ];
    view.printMenu("Human resources", options);
  }

  return {
    menu,
  };
})();
