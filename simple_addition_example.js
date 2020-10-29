// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjExMTM0NzQsImV4cCI6MTYwMzkyNjI5NzQ3NCwicHJvamVjdElkIjoiNWY5OTg1NTFkZDZkNzEwMDA0YzM4Y2E0In0.2sg6y0d01zdnMaPwZdw3ICtkMAkapv8Ow8GGOLNCMds";

// Add values to inputs
swarmApp.addInput({
  type: "Number",
  name: "A",
  values: [{ // tree structure
    Value: 13
  }]
});

swarmApp.addInput({
  type: "Number",
  name: "B",
  values: [{ // tree structure
    Value: 16
  }]
});

// Sending to Swarm for compute
swarmApp.compute().then(val => {
  // console.log("asynchronous logging has val:",val);

  val.forEach(v => {
    console.log("Output Name: ", v.name);
    console.log("Output Value: ", v.outputValue);
  })
});
