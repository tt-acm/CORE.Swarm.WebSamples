// This example simplify adds two numbers together, with tree inputs
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.logging = true;

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjExMTM0NzQsImV4cCI6MTYwMzkyNjI5NzQ3NCwicHJvamVjdElkIjoiNWY5OTg1NTFkZDZkNzEwMDA0YzM4Y2E0In0.2sg6y0d01zdnMaPwZdw3ICtkMAkapv8Ow8GGOLNCMds";


// Declare inputs first
let input_A = new Swarm.Input("A", "Number");
let input_B = new Swarm.Input("B", "Number");

// Add values to inputs
input_A.addDataTree(0, [13, 14]);
input_A.addDataTree(1, 15);
input_B.addDataTree(0, [13,14]);

swarmApp.inputs.push(input_A);
swarmApp.inputs.push(input_B);

// Sending to Swarm for compute
swarmApp.compute().then(output => {
  if (output == null) return console.log("No compute result came back.");
  let val = output.outputs;

  console.log("There are " + val.length + " inputs in this compute");

  let outputA = output.outputs[0];
  console.log("Output A has " + outputA.branches.length + " branches", outputA);
});
