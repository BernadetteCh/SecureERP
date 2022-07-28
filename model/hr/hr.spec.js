// load "modules"
require('../dataManager.mock.js');
require('../util.js');
require('./hr.js');

const hr = window.hrModel
const dataManager = window.dataManager

test('testGetOldestAndYoungestBaseData', () => {
    const hrDataTable = dataManager.readTableFromStore("humanresources")
    const result = hr.getOldestAndYoungest(hrDataTable)
    expect(result.oldest).toBe('Bob')
    expect(result.youngest).toBe('Alice')
})

test('testGetOldestAndYoungestCustomData', () => {
    const hrDataTable = [
        { name: "Gandalf", birthday: '1939-05-25', },
        { name: "Legolas", birthday: '1977-01-13', }
    ]
    const result = hr.getOldestAndYoungest(hrDataTable)
    expect(result.oldest).toBe('Gandalf')
    expect(result.youngest).toBe('Legolas')
})
