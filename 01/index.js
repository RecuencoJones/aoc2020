const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf8').split('\n').map((v) => parseInt(v)).filter((v) => Number.isSafeInteger(v))

const sortedData = [ ...data ].sort((left, right) => left - right)

function getPairSumIndexes(array, target) {
  let left = 0
  let right = array.length - 1

  while (left < right) {
    const sum = sortedData[left] + sortedData[right]

    if (sum === target) {
      return [left, right]
    } else if (sum < target) {
      left++
    } else if (sum > target) {
      right--
    }
  }

  return []
}

function getTripletSumIndexes(array, target) {
  let left
  let middle
  let right
  for (left = 0; left < array.length - 2; left++) {
    middle = left + 1
    right = array.length - 1

    while (middle < right) {
      const sum = sortedData[left] + sortedData[middle] + sortedData[right]

      if (sum === target) {
        return [left, middle, right]
      } else if (sum < target) {
        middle++
      } else if (sum > target) {
        right--
      }
    }
  }
  return []
}

const [leftPair, rightPair] = getPairSumIndexes(sortedData, 2020)
console.log(sortedData[leftPair] * sortedData[rightPair])
const [leftTriplet, middleTriplet, rightTriplet] = getTripletSumIndexes(sortedData, 2020)
console.log(sortedData[leftTriplet] * sortedData[middleTriplet] * sortedData[rightTriplet])
