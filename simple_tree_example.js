// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.logging = true;

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjExMTM0NzQsImV4cCI6MTYwMzkyNjI5NzQ3NCwicHJvamVjdElkIjoiNWY5OTg1NTFkZDZkNzEwMDA0YzM4Y2E0In0.2sg6y0d01zdnMaPwZdw3ICtkMAkapv8Ow8GGOLNCMds";

// import { Input } from '@ttcorestudio/swarm';
// let testInput = new Input();
// console.log("testinpt", testInput);

// Declare inputs first
let inputA = new Swarm.Input("A", "Number");
let inputB = new Swarm.Input("B", "Number");

// Collect input values
for (var i = 0; i < 3; i++) {
    inputA.addDataTree(i,i);
    inputA.addData(i);
}
inputB.addData(1000); // Adding one item to the first branch
inputB.addData([1000,2000,3000]); // Adding an array to the first branch
inputB.addDataTree(1, 1); // Adding an array to the SECOND branch

// Collect inputs
swarmApp.inputs.push(inputA);
swarmApp.inputs.push(inputB);


// Sending to Swarm for compute
// Sending to Swarm for compute
swarmApp.runLongCompute().then(output => {
  if (output == null) return console.log("No compute result came back.");
  let val = output.outputs;

  console.log("There are " + val.length + " inputs in this compute");

  let outputA = output.outputs[0];
  console.log("Output A has " + outputA.branches.length + " branches", outputA);
});
