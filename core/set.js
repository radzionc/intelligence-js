const Set = (input, output) => ({ input, output })

const normalizeNumber = number => number === 1 ? 0.99 : number === 0 ? 0.01 : number
const normalizedSet = ({ input, output }) => Set(input.map(normalizeNumber), output.map(normalizeNumber))

module.exports = {
  Set,
  normalizedSet
}