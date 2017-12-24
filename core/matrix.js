module.exports = class Matrix extends Array {
  constructor(...items) {
    super(...items)
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

  elementMap(other, func) {
    return new Matrix(...
      this.map((row, rowIndex) =>
        row.map((element, columnIndex) => func(element, other[rowIndex][columnIndex]))
      )
    )
  }

  multiply(other) {
    return this.elementMap(other, (one, other) => one * other)
  }

  subtract(other) {
    return this.elementMap(other, (one, other) => one - other)
  }

  add(other) {
    return this.elementMap(other, (one, other) => one + other)
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
}