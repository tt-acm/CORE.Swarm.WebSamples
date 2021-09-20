// This example creates contours of a brep vertically
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/5f99ec185747d50004179d71/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
console.log("Starting...")
rhino3dm().then((rhino) => {

  console.log("Rhino3dm has loaded.  Constructing inputs...")

  //construct a new Swarm object
  var swarmApp = new Swarm.SwarmApp();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjMxMDA1NjksImV4cCI6MTYwMzkyODI4NDU2OSwicHJvamVjdElkIjoiNWY5OWVjMTg1NzQ3ZDUwMDA0MTc5ZDcxIn0.gg4os0IWlP8ilJZ5Y8GX9XdnQDmksJFrIL_ZfLig4_I";


  // Create Inputs
  let sphere = new rhino.Sphere([0,0,0], 15);


  // Declare inputs first
  let input_brep = new Swarm.Input("Brep", "Brep");
  let input_contourDistance = new Swarm.Input("Num", "Number");

  input_brep.addDataTree(0, sphere.toBrep().encode());
  input_contourDistance.addDataTree(0, 5.0);

  swarmApp.inputs.push(input_brep);
  swarmApp.inputs.push(input_contourDistance);


  console.log("Inputs are set.  Running compute...")
  // Sending to Swarm for compute
  swarmApp.compute().then(output => {
    if (output == null) return console.log("No compute result came back.");
    let val = output.outputs;

    console.log("There are " + val.length + " inputs in this compute");

    let outputA = output.outputs[0];
    console.log("Output A has " + outputA.branches.length + " branches", outputA.outputValue);
  });

});
