const view = window.view

const crmController = window.crmController
const salesController = window.salesController
const hrController = window.hrController

function displayMainMenu() {
    const options = [
        { title: "Customer Relationship Management (CRM)", operation: () => { crmController.menu(); } },
        { title: "Sales", operation: () => { salesController.menu(); } },
        { title: "Human Resources", operation: () => { hrController.menu(); } },
    ]

    dataManager.stopMenu("menu");

    view.printMenu("Main menu", options)
}





displayMainMenu()