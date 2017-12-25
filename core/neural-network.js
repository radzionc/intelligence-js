const { random } = require('lodash')
const Matrix = require('./matrix')
const { sigmoid } = require('./activation-functions')


const gaussianRandom = (from, to) => Math.floor(from + Array
    .apply(null, Array(6))
    .map(Math.random)
    .reduce((acc, n) => acc + n) / 6 * (to - from + 1))


const updateWeights = (learningRate, errors, oneOutputs, otherOutputs) =>
    errors.multiply(
        oneOutputs.multiply(
            oneOutputs.elementMap(element => 1 - element)
        )
    ).dot(otherOutputs.transpose())
    .elementMap(element => element * learningRate)

const makeTrain = (inputWeightsMatrix, outputWeightsMatrix, learningRate, activationFunction) => ({ input, output }) => {
    const inputs = new Matrix(input).transpose()
    const outputs = new Matrix(output).transpose()

    const hiddenOutputs = inputWeightsMatrix.dot(inputs).elementMap(activationFunction)
    const finalOutputs = outputWeightsMatrix.dot(hiddenOutputs).elementMap(activationFunction)

    const outputErrors = outputs.subtract(finalOutputs)
    const hiddenErrors = outputWeightsMatrix.transpose().dot(outputErrors)

    const newOutputWeightsMatrix = outputWeightsMatrix.add(updateWeights(learningRate, outputErrors, finalOutputs, hiddenOutputs))
    const newInputsWeightsMatrix = inputWeightsMatrix.add(updateWeights(learningRate, hiddenErrors, hiddenOutputs, inputs))
    return {
        train: makeTrain(newInputsWeightsMatrix, newOutputWeightsMatrix, learningRate, activationFunction),
        predict: makePredict(newInputsWeightsMatrix, newOutputWeightsMatrix, activationFunction)
    }
}

const makePredict = (inputWeightsMatrix, outputWeightsMatrix, activationFunction) => (data) => {
    const inputs = new Matrix(data).transpose()
    
    const hiddenOutputs = inputWeightsMatrix.dot(inputs).elementMap(activationFunction)
    const finalOutputs = outputWeightsMatrix.dot(hiddenOutputs).elementMap(activationFunction)

    return finalOutputs.column(0)
}

const neuralNetwork = (inputNodesNumber, hiddenNodesNumber, outputNodesNumber, learningRate = 0.1, activationFunction = sigmoid) => {
    const inputWeightsMatrix = Matrix.random(hiddenNodesNumber, inputNodesNumber, () => gaussianRandom(-0.5, 0.5))
    const outputWeightsMatrix = Matrix.random(outputNodesNumber, hiddenNodesNumber, () => gaussianRandom(-0.5, 0.5))

    return makeTrain(inputWeightsMatrix, outputWeightsMatrix, learningRate, activationFunction)
}

const predictAfterAllTraining = (sets, train) => 
    sets.reduce(
        (accTrain, set) => accTrain.train(set),
        { train }
    ).predict


module.exports = { predictAfterAllTraining, neuralNetwork }