const fs = require('fs')
const map = fs.readFileSync('data.txt', 'utf8').split('\n').filter(String)

function getTrees(xStep, yStep) {
  const state = map.reduce((state, line, index) => {
    if (index % yStep !== 0) return state

    const cell = line.charAt(state.x % line.length)
    
    if (cell === '#') {
      state.trees++
    }

    state.y += yStep
    state.x += xStep

    return state
  }, { x: 0, y: 0, trees: 0 })

  return state.trees
}

const slopes = [
  getTrees(1, 1),
  getTrees(3, 1),
  getTrees(5, 1),
  getTrees(7, 1),
  getTrees(1, 2)
]

console.log(slopes.reduce((accum, next) => accum * next, 1))

