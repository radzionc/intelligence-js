const fillArray = (length, filler) => Array.apply(null, Array(length)).map(filler)

module.exports = class Matrix extends Array {
  constructor(...items) {
    super(...items)
  }

  static random(rowsNumber, columnsNumber, randomizer) {
    return new Matrix(...
        fillArray(rowsNumber, _ =>
            fillArray(columnsNumber, _ => randomizer())
        )
    )
  }

  transpose() {
    return new Matrix(...
      this.reduceRight((acc, item) => [ ...acc, item], [])
      .reduce(
        (acc, row, rowIndex) => acc.map((r, i) => [ ...r, row[i] ]),
        this[0].map(_ => [])
      )
    )
  }

  operationMap(other, func) {
    return this.map((row, rowIndex) =>
      row.map((element, columnIndex) => func(element, other[rowIndex][columnIndex]))
    )
  }

  elementMap(func) {
    return this.map(row => row.map(func))
  }

  multiply(other) {
    return this.operationMap(other, (one, other) => one * other)
  }

  subtract(other) {
    return this.operationMap(other, (one, other) => one - other)
  }

  add(other) {
    return this.operationMap(other, (one, other) => one + other)
  }

  dot(other) {
    return this.map((row, rowIndex) =>
      other[0].map((_, columnIndex) =>
        row.reduce(
          (acc, el, i) => acc + el * other[i][columnIndex],
          0
        )
      )
    )
  }

  column(index) {
    return this.map(row => row[index])
  }

  equalTo(other) {
    return this.every((row, rowIndex) =>
      row.every((element, columnIndex) =>
        element === other[rowIndex][columnIndex]
      )
    )
  }

  info() {
    return `(${this.length}, ${this[0] ? this[0].length : 0})`
  }
}