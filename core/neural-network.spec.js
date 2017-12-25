const { set } = require('mnist')

const { predictAfterAllTraining, neuralNetwork } = require('./neural-network')
const { normalizedSet } = require('./set')

const maxIn = list => list.indexOf(Math.max(...list))


it('neural network', () => {
    const ts = Date.now()
    const { training, test } = set(2000, 400)

    const train = neuralNetwork(784, 200, 10)

    const predict = predictAfterAllTraining(
        training.map(normalizedSet),
        train
    )
    console.log('training ', (Date.now() - ts) * 0.001)
    const tr = Date.now()
    const testResult = test
        .map(normalizedSet)
        .map(({ input, output }) => {
            const result = predict(input)
            return maxIn(result) === maxIn(output)
        })
        .filter(b => b).length / test.length
    console.log('testing ', (Date.now() - tr) * 0.001)
    console.log(testResult)
})