const crypto = require('crypto');
const sha256 = require('crypto-js/sha256');
const target = 5;

exports.createInput = (_amount) => {
    var input = {
        id : randomId(),
        type : "input",
        amount : _amount,
    };
    return input;
};

exports.createOutput = (_amount) => {

    var output = {
        id : randomId(),
        type : "output",
        amount : _amount
    };
    return output;
};

function randomId(){
    a = Math.random();
    return myHash(a.toString());
}

function myHash(_value){
    return Math.round(parseInt(sha256(_value),16)/Math.pow(10, 70))
}

exports.createTx = (_input, _output) => {
    var transaction = {
        input: [],
        output: [],
        nounce: 0
    }
    _input.forEach(e => {
        addInput(transaction, e)
    });
    _output.forEach(e => {
        addOutput(transaction, e)
    });

    let nounce = -1;
    let hash_arg = 0;
    do{
        nounce++;
        hash_arg = transaction.input[0].toString() +  transaction.output[0].toString() + nounce.toString();
        console.log(myHash(hash_arg));
        console.log(nounce);
    } while (myHash(hash_arg) >= target);

    transaction['nounce'] = nounce;
    return transaction;
};

function addInput(_tx, _input){
    _tx.input.push(_input);
}

function addOutput(_tx, _output){
    _tx.output.push(_output);
}