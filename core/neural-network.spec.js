const { set } = require('mnist')

const { predictAfterAllTraining, neuralNetwork } = require('./neural-network')
const { normalizedSet } = require('./set')

const maxIn = list => list.indexOf(Math.max(...list))


it('neural network', () => {
    const ts = Date.now()
    const { training, test } = set(80, 20)

    const train = neuralNetwork(784, 200, 10)

    const predict = predictAfterAllTraining(
        training.map(normalizedSet),
        train
    )

    const tr = Date.now()
    const testResult = test
        .map(normalizedSet)
        .map(({ input, output }) => {
            const result = predict(input)
            return maxIn(result) === maxIn(output)
        })
        .filter(b => b).length / test.length
    console.log(testResult)
})