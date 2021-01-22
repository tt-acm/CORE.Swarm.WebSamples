// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.userId = "5e14bcb6eac39955403ecc31";

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTEwODg0MTc0MzMsImV4cCI6MTYxMTA5MzYwMTQzMywicHJvamVjdElkIjoiNWUxNzg0NDg1YWMzMDcwMDA0ZTRjYzgwIn0.hAnESOLrSzuemTeNvr9gdL6477DymIgXQ4iG5jdcDyQ";

// Add values to inputs
swarmApp.addInput({
  type: "Slider",
  name: "num",
  values: [{ // tree structure
    Value: 13
  }]
});

// Sending to Swarm for compute
swarmApp.compute().then(output => {
//   console.log("asynchronous logging has val:",output);
  let val = output.outputList;

  val.forEach(v => {
    console.log("Output Name: ", v.name);
    console.log("Output Value: ", v.outputValue);
  })
});
