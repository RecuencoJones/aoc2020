const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf8').split('\n').filter(String)

function matchesOldPolicy(v) {
  const [ policy, password ] = v.split(': ')
  const [ qty, char ] = policy.split(' ')
  const [ minQty, maxQty ] = qty.split('-').map((v) => parseInt(v))
  const passwordChars = password.split('')
  const passwordMatchingChars = passwordChars.filter((v) => v === char).length

  return minQty <= passwordMatchingChars && passwordMatchingChars <= maxQty
}

function matchesNewPolicy(v) {
  const [ policy, password ] = v.split(': ')
  const [ indexes, char ] = policy.split(' ')
  const [ leftIndex, rightIndex ] = indexes.split('-').map((v) => parseInt(v))

  const charAtLeft = password.charAt(leftIndex - 1)
  const charAtRight = password.charAt(rightIndex - 1)

  return (charAtLeft === char && charAtRight !== char) || (charAtLeft !== char && charAtRight === char)
}

const countOldPolicy = data.filter(matchesOldPolicy).length
const countNewPolicy = data.filter(matchesNewPolicy).length

console.log(countOldPolicy)
console.log(countNewPolicy)
