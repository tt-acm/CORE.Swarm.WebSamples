// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.userId = "5da0c032997b8c000432e6bf";

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTE5MzY3MTE0MzgsImV4cCI6MTYxMTk0MTg5NTQzOCwicHJvamVjdElkIjoiNWVmMDY3YmVlYmE2YzA4MjFjZGRkMmU2In0.XpFDmH9_KVghshXOXmEsPUnYksDOlPqPoiGy2u4lKPA";

swarmApp.addInput({
  type: "Slider",
  name: "Snooze_ms",
  values: [{ // tree structure
    Value: 1000
  }]
});


// Sending to Swarm for compute
swarmApp.runLongCompute().then(output => {
  // console.log("asynchronous logging has val:",output.outputList);
  let val = output.outputList;

  val.forEach(v => {
    console.log("Output Name: ", v.name);
    console.log("Output Value: ", v.outputValue);
  })
});
