// This example creates a mesh sphere.
// Swarm App: https://swarm.thorntontomasetti.com/app/5f11adc99f436f0004de6b9b/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.userId = "5e30091214c7ae0004f2fac2";
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
  let val = output.outputList;

  val.forEach(v => {
    console.log("Output Name: ", v.name);
    console.log("Output Value: ", v.outputValue);
  })
});
