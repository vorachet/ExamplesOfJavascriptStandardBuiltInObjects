# Simple programming problems

Collection of simple programming problems that can be your exercise. 

## Staircase

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
