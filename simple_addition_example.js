var Swarm = require('@ttcorestudio/swarm');

var swarmApp = new Swarm();
// Set Document unit and tolerance
swarmApp.setDocument(8, 0.001);

// Construct a input object, add it into an array, and do swarmApp.inputs = [inputs]
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

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDIxMjY3NDI3MTMsInByb2plY3RJZCI6IjVmN2U4MDg0NzQ4MWU0MDAwNDg5YWFlZiJ9.Zmhz1R1arizYuF_RGuwRcQyLb9jPjYx3zRF4BDGVygo";

swarmApp.callIntoSwarm().then(val => {
  // console.log("asynchronous logging has val:",val);

  val.forEach(v=>{
    console.log("Output Name: ", v.name);
    console.log("Output Value: ", v.outputValue);
  })
});
