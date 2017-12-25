module.exports = {
  sigmoid: x => 1 / (1 + Math.pow(Math.E, -x)),
  tanh: x => 2 / (1 + Math.pow(Math.E, -2 * x)) - 1,
  reLu: x => Math.max(0, x),
  linear: c => x => c * x,
}