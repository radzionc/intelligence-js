const Matrix = require('./matrix')

it('should transpose', () => {
  const matrix = new Matrix(
    [1, 2, 3],
    [4, 5, 6]
  )
  const result = matrix.transpose()
  const expected = new Matrix(
    [1, 4],
    [2, 5],
    [3, 6]
  )
  expect(result.equalTo(expected)).toBe(true)
})

it('should add', () => {
  const one = new Matrix(
    [1, 1, 1],
    [1, 1, 1]
  )
  const other = new Matrix(
    [2, 2, 2],
    [2, 2, 2]
  )

  const result = one.add(other)

  const expected = new Matrix(
    [3, 3, 3],
    [3, 3, 3]
  )
  expect(result.equalTo(expected)).toBe(true)
})

it('should dot', () => {
  const one = new Matrix(
    [1, 2, 1],
    [0, 1, 0],
    [2, 3, 4]
  )
  const other = new Matrix(
    [2, 5],
    [6, 7],
    [1, 8]
  )

  const result = one.dot(other)
  const expected = new Matrix(
    [15, 27],
    [6, 7],
    [26, 63]
  )

  expect(result.equalTo(expected)).toBe(true)
})

it('should elementMap', () => {
  const matrix = new Matrix(
    [1, 2, 3],
    [4, 5, 6]
  )
  const expected = new Matrix(
    [0, 0, 0],
    [0, 0, 0]
  )
  const result = matrix.elementMap(_ => 0)
  expect(result.equalTo(expected)).toBe(true)
})