// This example creates a mesh sphere.
// Swarm App: https://swarm.thorntontomasetti.com/app/5f11adc99f436f0004de6b9b/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.userId = "5e30091214c7ae0004f2fac2";
swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTE5MzI2NjU0NDAsImV4cCI6MTYxMTkzNzg0OTQ0MCwicHJvamVjdElkIjoiNWYxMWFkYzk5ZjQzNmYwMDA0ZGU2YjliIn0.OZaxvOH4uKe42f98DWDRNkvlZz3Ebc6N66ozKFQo6Jc";
// swarmApp.logging = true;

// Declare inputs first
let input_R = new Swarm.Input("R", "Slider");
let input_UV = new Swarm.Input("UV", "Slider");

// Add values to inputs
input_R.addDataTree(0, 13);
input_UV.addDataTree(0, 3);

swarmApp.inputs.push(input_R);
swarmApp.inputs.push(input_UV);

// Sending to Swarm for compute
swarmApp.compute().then(output => {
  if (output == null) return console.log("No compute result came back.");
  let val = output.outputs;

  console.log("There are " + val.length + " inputs in this compute");

  let outputA = output.outputs[0];
  console.log("Output A has " + outputA.branches.length + " branches", outputA);
});
