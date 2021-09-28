// This example runs framing repair for Konstru
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/615332b1947d9c0004adf618/info
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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzI4NDI1MTc5MjksImV4cCI6MTYzMjg0NzcwMTkyOSwicHJvamVjdElkIjoiNjE1MzMyYjE5NDdkOWMwMDA0YWRmNjE4In0.UeST4z41rjmIao_27iQqnfMTMh1hoa-GHKIroPmanQw";


  // Create Inputs
  let beamA = new rhino.Polyline(2); // Set number of edge points
  beamA.add(0, 0, 0);
  beamA.add(20, 0, 0);
  let beamB = new rhino.Polyline(2); // Set number of edge points
  beamB.add(0, 20, 0);
  beamB.add(20, 20, 0);
  let beamC = new rhino.Polyline(2); // Set number of edge points
  beamC.add(0.43, 0, 0);
  beamC.add(-0.12, 20.2, 0);
  let beamD = new rhino.Polyline(2); // Set number of edge points
  beamD.add(20.43, 0.1, 0);
  beamD.add(19.89, 19.98, 0);

  let columnA = new rhino.Polyline(2); // Set number of edge points
  columnA.add(0, 0, -0.89);
  columnA.add(0, 0, -20);
  let columnB = new rhino.Polyline(2); // Set number of edge points
  columnB.add(0, 20, -0.95);
  columnB.add(0, 20, -20);
  let columnC = new rhino.Polyline(2); // Set number of edge points
  columnC.add(20, 0, 0);
  columnC.add(20, 0, -20);
  let columnD = new rhino.Polyline(2); // Set number of edge points
  columnD.add(20, 20, 0);
  columnD.add(20,20, -20);

  var encodedBeams = [beamA.toNurbsCurve().encode(), beamB.toNurbsCurve().encode(), beamC.toNurbsCurve().encode(), beamD.toNurbsCurve().encode()];
  var encodedColumns = [columnA.toNurbsCurve().encode(), columnB.toNurbsCurve().encode(), columnC.toNurbsCurve().encode(), columnD.toNurbsCurve().encode()];

  // Declare inputs first
  let input_beam = new Swarm.Input("Beams", "Curve");
  let input_column= new Swarm.Input("Column", "Curve");
  input_beam.addDataTree(0, encodedBeams);
  input_column.addDataTree(0, encodedColumns);

  swarmApp.inputs.push(input_beam);
  swarmApp.inputs.push(input_column);

  console.log("INPUT:input_beam", input_beam);
  console.log("INPUT:input_column", input_column);
  console.log("Inputs are set.  Running compute...")
  // Sending to Swarm for compute
  swarmApp.compute().then(output => {
    if (output == null) return console.log("No compute result came back.");
    let val = output.outputs;

    console.log("There are " + val.length + " inputs in this compute");

    let outputA = output.outputs[0];
    console.log("Output A has " + outputA.branches.length + " branches", outputA);
    console.log("Output A value: ", outputA.outputValue);
  });

});
