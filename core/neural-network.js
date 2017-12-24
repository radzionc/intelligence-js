const { random } = require('lodash')
const { matrix, transpose, multiply, subtract, add } = require('mathjs')


const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x))
const tanh = x => 2 / (1 + Math.pow(Math.E, -2 * x)) - 1
const reLu = x => Math.max(0, x)
const linear = c => x => c * x
const Set = (input, output) => ({ input, output })


const fillArray = (length, filler) => Array.apply(null, Array(length)).map(filler)

const randomMatrix = (rowsNumber, columnsNumber, from = -0.5, to = 0.5) =>
    matrix(
        fillArray(rowsNumber, _ =>
            fillArray(columnsNumber, _ => random(from, to, true))
        )
    )

const toMatrix = list => transpose(matrix([list]))
const multiplyWithActivation = activationFunction => (one, other) => multiply(one, other).map(activationFunction)

const simpleMultiply = (one, other) => one.map((element, index) => other.get(index) * element)

const updateWeights = (learningRate, errors, oneOutputs, otherOutputs) =>
    multiply(
        simpleMultiply(
            errors,
            simpleMultiply(
                oneOutputs,
                oneOutputs.map(element => 1 - element)
            )
        ),
        transpose(otherOutputs)
    ).map(element => element * learningRate)


const makeTrain = (inputWeightsMatrix, outputWeightsMatrix, learningRate, activationFunction) => ({ input, output }) => {
    const inputs = toMatrix(input)
    const outputs = toMatrix(output)

    const makeOutputs = multiplyWithActivation(activationFunction)

    const hiddenOutputs = makeOutputs(inputWeightsMatrix, inputs)
    const finalOutputs = makeOutputs(outputWeightsMatrix, hiddenOutputs)

    const outputErrors = subtract(outputs, finalOutputs)
    const hiddenErrors = multiply(transpose(outputWeightsMatrix), outputErrors)

    const newOutputWeightsMatrix = add(outputWeightsMatrix, updateWeights(learningRate, outputErrors, finalOutputs, hiddenOutputs))
    const newInputsWeightsMatrix = add(inputWeightsMatrix, updateWeights(learningRate, hiddenErrors, hiddenOutputs, inputs))
    return {
        train: makeTrain(newInputsWeightsMatrix, newOutputWeightsMatrix, learningRate, activationFunction),
        predict: makePredict(newInputsWeightsMatrix, newOutputWeightsMatrix, activationFunction)
    }
}

const makePredict = (inputWeightsMatrix, outputWeightsMatrix, activationFunction) => (data) => {
    const inputs = toMatrix(data)
    const makeOutputs = multiplyWithActivation(activationFunction)
    
    const hiddenOutputs = makeOutputs(inputWeightsMatrix, inputs)
    const finalOutputs = makeOutputs(outputWeightsMatrix, hiddenOutputs)

    return transpose(finalOutputs)._data[0]
}

const neuralNetwork = (inputNodesNumber, hiddenNodesNumber, outputNodesNumber, learningRate = 0.1, activationFunction = sigmoid) => {
    const inputWeightsMatrix = randomMatrix(hiddenNodesNumber, inputNodesNumber)
    const outputWeightsMatrix = randomMatrix(outputNodesNumber, hiddenNodesNumber)

    return makeTrain(inputWeightsMatrix, outputWeightsMatrix, learningRate, activationFunction)
}

const predictAfterAllTraining = (sets, train) => 
    sets.reduce(
        (accTrain, set) => accTrain.train(set),
        { train }
    ).predict

const normalizeNumber = number => number === 1 ? 0.99 : number === 0 ? 0.01 : number
const normalizeSet = ({ input, output }) => Set(input.map(normalizeNumber), output.map(normalizeNumber))

module.exports = { sigmoid, tanh, reLu, linear, Set, randomMatrix, predictAfterAllTraining, neuralNetwork, normalizeSet, toMatrix, updateWeights}