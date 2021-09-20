// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();

swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.logging = true;
// swarmApp.saveCompute = true;
// swarmApp.ssoId = "xxxx";
// swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTYwMDcxNTEwNzAsImV4cCI6MTYxNjAxMjMzNTA3MCwicHJvamVjdElkIjoiNWU5Zjc5OWUxZTBlNzEwMDA0YjE4OWNhIn0.AibAdwl3C7XoIsk6Qt8I59257qX9aDuXiiLan5QOfbw";

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTA2ODA3MTQ5OTYsImV4cCI6MTYxMDY4NTg5ODk5NiwicHJvamVjdElkIjoiNWVmMzJhNzRjYjcyMWIwMDA0MWZmMzY1In0.m5CF4BLiOJ6bcBSOuLHf7sJE3_aXpafFNlPMFjsHSf8";


// // Declare inputs first
// let inputA = new Swarm.Input("Length", "Slider");
// let inputB = new Swarm.Input("Radius", "Slider");

let inputA = new Swarm.Input("Snooze_ms", "Slider");

// Collect input values
inputA.addData(1000);
// inputB.addData(12); // Adding one item to the first branch

// Collect inputs
swarmApp.inputs.push(inputA);
// swarmApp.inputs.push(inputB);


// Sending to Swarm for compute
swarmApp.compute().then(output => {
  console.log("asynchronous logging has val:",output.outputs);
  let val = output.outputs;

  val.forEach(v => {
    console.log("Output Name: ", v.name);
    console.log("Output Value: ", v.outputValue);
  })
});
