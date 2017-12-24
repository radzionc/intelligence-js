const { set } = require('mnist')

const { randomMatrix, predictAfterAllTraining, neuralNetwork, normalizeInput, normalizeSet, toMatrix, updateWeights } = require('./neural-network')

it('should create neural network', () => {
    // const ts = Date.now()
    // const { training, test } = set(800, 200)

    // const train = neuralNetwork(784, 200, 10)

    // const predict = predictAfterAllTraining(training.map(normalizeSet), train)

    // const tr = Date.now()
    // const testResult = test
    //     .map(normalizeSet)
    //     .map(({ input, output }) => {
    //         const result = predict(input)
    //         const maxIn = list => list.indexOf(Math.max(...list))
    //         const maxInResult = maxIn(result)
    //         const maxInOutput = maxIn(output)
 
    //         return maxInResult === maxInOutput
    //     })
    //     .filter(b => b).length / test.length
    // console.log(testResult)
})