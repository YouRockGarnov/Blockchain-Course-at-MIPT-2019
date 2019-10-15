const TX = require('./transactionBuilder.js')

input1 = TX.createInput(100);
input2 = TX.createInput(150);
input3 = TX.createInput(20);

output1 = TX.createOutput(270);

inputlist = [input1, input2, input3]
outputlist = [output1]

transaction = TX.createTx(inputlist,outputlist);

transaction.input.forEach(e => {
    console.log(e);
});

transaction.output.forEach(e => {
    console.log(e);
});

console.log(transaction.nounce)