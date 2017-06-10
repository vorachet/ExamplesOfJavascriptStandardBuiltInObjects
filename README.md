# Examples of Javascript Standard Built-In Objects

Vorachet Jaroensawas
vorachet@gmail.com

## 1. Staircase

Staircase can be done using String.prototype.repeat()
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat

```

staircase = (n) => {
  const MIN = 0
  const MAX = 100
  const SYMBOL = '#'
  const SPACE_SYMBOL = ' '

  if (typeof n !== 'number') throw new Error('n must be number')
  if (n <= MIN || n > MAX) throw new Error(MIN +  ' < n <  ' + MAX + ' is required')

  var output = []
  for (var i = 1; i <= n; i++) {
    output.push(SPACE_SYMBOL.repeat(n - i) + SYMBOL.repeat(i) )
  }

  return output.join('\n')
}

console.log( staircase(20) )

/*

output:

                   #
                  ##
                 ###
                ####
               #####
              ######
             #######
            ########
           #########
          ##########
         ###########
        ############
       #############
      ##############
     ###############
    ################
   #################
  ##################
 ###################
####################

*/


```


## 2. Simple tuple data analytics

Here is good exmaple to learn

Array.prototype.map()
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map?v=control

Array.prototype.reduce()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=control

Array.prototype.filter()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=control


input (sample.txt)
```
001, Company1, CustomerAddress1, Product1
002, Company2, CustomerAddress2, Product1
003, Company3, CustomerAddress1, Prodcut2
004, Company1, CustomerAddress3, Prodcut3
005, Company1, CustomerAddress4, Product4
006, Company3, CustomerAddress2, Product5
007, Company2, CustomerAddress5, Prodcut6
008, Company1, CustomerAddress2, Product4
```

```
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

```

output
```

List of ordered items by companyName

  Company1:
    001 Company1 CustomerAddress1 Product1,
    004 Company1 CustomerAddress3 Prodcut3,
    005 Company1 CustomerAddress4 Product4,
    008 Company1 CustomerAddress2 Product4
  Company2:
    002 Company2 CustomerAddress2 Product1,
    007 Company2 CustomerAddress5 Prodcut6
  Company3:
    003 Company3 CustomerAddress1 Prodcut2,
    006 Company3 CustomerAddress2 Product5

List of ordered items by customerAddress

  CustomerAddress1:
    001 Company1 CustomerAddress1 Product1,
    003 Company3 CustomerAddress1 Prodcut2
  CustomerAddress2:
    002 Company2 CustomerAddress2 Product1,
    006 Company3 CustomerAddress2 Product5,
    008 Company1 CustomerAddress2 Product4
  CustomerAddress3:
    004 Company1 CustomerAddress3 Prodcut3
  CustomerAddress4:
    005 Company1 CustomerAddress4 Product4
  CustomerAddress5:
    007 Company2 CustomerAddress5 Prodcut6

Num of ordered items group by product

  2x Product1
  2x Product4
  1x Prodcut2
  1x Prodcut3
  1x Product5
  1x Prodcut6

```