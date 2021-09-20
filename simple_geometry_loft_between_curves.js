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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDk5ODkyOTU1NjMsImV4cCI6MTYwOTk5NDQ3OTU2MywicHJvamVjdElkIjoiNWZmNjdjYTY5ZjNmODAwMDA0YWZhZjk0In0.TiC-WKkikNFbaOlJG_rqClpjVQqE-LNY4O3P2Hc4IM0";

  // Declare inputs first
  let input_crvA = new Swarm.Input("Curve A", "Curve");
  let input_crvB = new Swarm.Input("Curve B", "Curve");

  // Create Inputs
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9, -22.5, 0);
  lineA.add(14.5, 19.2, 0);


  let lineB = new rhino.Polyline(2); // Set number of edge points
  lineB.add(18.9, -22.5, 5);
  lineB.add(14.5, 19.2, 5);

  input_crvA.addDataTree(0, lineA.toNurbsCurve().encode());
  input_crvB.addDataTree(0, lineB.toNurbsCurve().encode());

  swarmApp.inputs.push(input_crvA);
  swarmApp.inputs.push(input_crvB);


  // console.log("INPUT", lineA.toNurbsCurve().encode());
  console.log("Inputs are set.  Running compute...")
  swarmApp.compute().then(output => {
    if (output == null) return console.log("No compute result came back.");
    let val = output.outputs;
  
    console.log("There are " + val.length + " inputs in this compute");
  
    let outputA = output.outputs[0];
    console.log("Output A has " + outputA.branches.length + " branches", outputA);
  });

});
