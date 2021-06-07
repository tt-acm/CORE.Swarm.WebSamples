// This example simplify awaits for a number of miliseconds.
// Swarm App: https://swarm.thorntontomasetti.com/app/5ef067beeba6c0821cddd2e6/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

// swarmApp.userId = "5da0c032997b8c000432e6bf";
// swarmApp.ssoId = "595eb281604ca5f75fd3bd17";
swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTE5MzY3MTE0MzgsImV4cCI6MTYxMTk0MTg5NTQzOCwicHJvamVjdElkIjoiNWVmMDY3YmVlYmE2YzA4MjFjZGRkMmU2In0.XpFDmH9_KVghshXOXmEsPUnYksDOlPqPoiGy2u4lKPA";


// Declare inputs first
let inputA = new Swarm.Input("Snooze_ms", "Slider");
let inputB = new Swarm.Input("B", "Number");


inputA.addData(1000);



// Sending to Swarm for compute
swarmApp.runLongCompute().then(output => {
  console.log("output", output.outputs[0].outputValue);
  // let val = output.outputList;

  // val.forEach(v => {
  //   console.log("Output Name: ", v.name);
  //   console.log("Output Value: ", v.outputValue);
  // })
});
