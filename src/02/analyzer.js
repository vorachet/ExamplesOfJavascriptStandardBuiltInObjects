#!/usr/bin/env node

const fs = require('fs')

var Analyzer = function (filename) {
    const data = fs.readFileSync(filename).toString()
    const lines = data.split(/\r?\n/)
    this.orders = lines.map( (x) => {
        const tuple = x.split(',')
        return {
            orderId: tuple[0].trim(),
            companyName: tuple[1].trim(),
            customerAddress: tuple[2].trim(),
            orderedItem: tuple[3].trim()
        }
    })
}

Analyzer.prototype.getOrders = function () {
    return this.orders
}

Analyzer.prototype.showAllOrders = function (searchAttr, searchVal) {
    let matchedTuples = this.orders.filter(function (tuple) {
        return tuple[searchAttr] === searchVal;
    })
    return '\t' + searchVal + ': ' + matchedTuples.map((x) => '\n\t\t' +
        x.orderId + ' ' + x.companyName + ' ' +
        x.customerAddress + ' ' + x.orderedItem).join(', ')
}

Analyzer.prototype.countOrderedItem = function () {
    const countKey = 'orderedItem'
    // grouping by reduce()
    const group =  this.orders.reduce( (rv, x) => {
        (rv[x[countKey]] = rv[x[countKey]] || []).push(x)
        return rv;
        }, {})
    let result = []
    for (let item in group) result.push({item: item, count: group[item].length})
    let desc = result.sort( (a,b) => {return b.count - a.count})
    return desc.map((x) => '\t' + x.count + 'x ' + x.item ).join('\n')
}

if (process.argv.length !== 3) {
    console.log('usage: node analyzer <data file>')
    console.log('usage: node analyzer sample.txt')
    return -1
}

const filename = process.argv[2]

const analyzer = new Analyzer(filename)

console.log('\nList of ordered items by companyName\n')

console.log(analyzer.showAllOrders('companyName', 'Company1'))
console.log(analyzer.showAllOrders('companyName', 'Company2'))
console.log(analyzer.showAllOrders('companyName', 'Company3'))

console.log('\nList of ordered items by customerAddress\n')

console.log(analyzer.showAllOrders('customerAddress', 'CustomerAddress1'))
console.log(analyzer.showAllOrders('customerAddress', 'CustomerAddress2'))
console.log(analyzer.showAllOrders('customerAddress', 'CustomerAddress3'))
console.log(analyzer.showAllOrders('customerAddress', 'CustomerAddress4'))
console.log(analyzer.showAllOrders('customerAddress', 'CustomerAddress5'))

console.log('\nNum of ordered items group by product\n')

console.log(analyzer.countOrderedItem())

