// This example uses moves the input line for a short distance
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/5f99ec325747d50004179d88/info
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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjMxOTY2NzgsImV4cCI6MTYwMzkyODM4MDY3OCwicHJvamVjdElkIjoiNWY5OWVjMzI1NzQ3ZDUwMDA0MTc5ZDg4In0.44TwLr6y0AHLNQlLutLpXnz9kWqWJTBHulPweJb5d4k";


  // Create Inputs
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9, -22.5, 2.9);
  lineA.add(14.5, 19.2, 0);


  // Declare inputs first
  let input_curve = new Swarm.Input("Crv", "Curve");
  input_curve.addDataTree(0, lineA.toNurbsCurve().encode());
  swarmApp.inputs.push(input_curve);

  console.log("INPUT", lineA.toNurbsCurve().encode());
  console.log("Inputs are set.  Running compute...")
  // Sending to Swarm for compute
  swarmApp.compute().then(output => {
    if (output == null) return console.log("No compute result came back.");
    let val = output.outputs;

    console.log("There are " + val.length + " inputs in this compute");

    let outputA = output.outputs[0];
    console.log("Output A has " + outputA.branches.length + " branches", outputA);
  });

});
