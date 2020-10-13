var Swarm = require('@ttcorestudio/swarm');

var swarmInstance = new Swarm();
swarmInstance.setDocument(8, 0.001);

swarmInstance.addInput({
  type: "Number",
  name: "A",
  values: [{ // tree structure
    Value: 13
  }]
});

swarmInstance.addInput({
  type: "Number",
  name: "B",
  values: [{ // tree structure
    Value: 13
  }]
});

swarmInstance.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDIxMjY3NDI3MTMsInByb2plY3RJZCI6IjVmN2U4MDg0NzQ4MWU0MDAwNDg5YWFlZiJ9.Zmhz1R1arizYuF_RGuwRcQyLb9jPjYx3zRF4BDGVygo")
console.log("swarmInstance", swarmInstance);
swarmInstance.callIntoSwarm();

console.log("swarmInstance", swarmInstance);
