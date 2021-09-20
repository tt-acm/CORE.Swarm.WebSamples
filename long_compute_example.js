// This example simplify awaits for a number of miliseconds.
// Swarm App: https://swarm.thorntontomasetti.com/app/5ef067beeba6c0821cddd2e6/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

// swarmApp.userId = "5da0c032997b8c000432e6bf";
// swarmApp.ssoId = "595eb281604ca5f75fd3bd17";
swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTE5MzY3MTE0MzgsImV4cCI6MTYxMTk0MTg5NTQzOCwicHJvamVjdElkIjoiNWVmMDY3YmVlYmE2YzA4MjFjZGRkMmU2In0.XpFDmH9_KVghshXOXmEsPUnYksDOlPqPoiGy2u4lKPA";


// swarmApp.addInput({
//   type: "Slider",
//   name: "Snooze_ms",
//   values: [{ // tree structure
//     Value: 1000
//   }]
// });
// Declare inputs first
let input_snooze = new Swarm.Input("Snooze_ms", "Slider");

input_snooze.addDataTree(0, 1000);

swarmApp.inputs.push(input_snooze);


// Sending to Swarm for compute
swarmApp.runLongCompute().then(output => {
  if (output == null) return console.log("No compute result came back.");
  let val = output.outputs;

  console.log("There are " + val.length + " inputs in this compute");

  let outputA = output.outputs[0];
  console.log("Output A has " + outputA.branches.length + " branches", outputA);
});

