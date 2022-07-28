// load "modules"
require('./util.js');

const util = window.util

test('testUniqueIdGeneration', () => {
    let ids = []
    const num = 200
    for (let i = 0; i < num; i++) {
        const prevIds = ids.map(id => ({ id: id }))
        ids.push(util.generateUniqueId(prevIds))
    }
    // console.debug("Generated ids: ", ids)
    const idSet = new Set(ids)
    expect(idSet.size).toBe(num)
})
