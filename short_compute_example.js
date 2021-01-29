// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.userId = "5da0c032997b8c000432e6bf";
swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTE5MzI2NjU0NDAsImV4cCI6MTYxMTkzNzg0OTQ0MCwicHJvamVjdElkIjoiNWYxMWFkYzk5ZjQzNmYwMDA0ZGU2YjliIn0.OZaxvOH4uKe42f98DWDRNkvlZz3Ebc6N66ozKFQo6Jc";

// Add values to inputs
swarmApp.addInput({
  type: "Slider",
  name: "R",
  values: [{ // tree structure
    Value: 13
  }]
});

swarmApp.addInput({
  type: "Slider",
  name: "UV",
  values: [{ // tree structure
    Value: 3
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
