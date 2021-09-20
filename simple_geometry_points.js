// This example uses a point and a double as inputs and returns a curve back
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/5f99ec6d5747d50004179db4/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
rhino3dm().then((rhino) => {
  var swarmApp = new Swarm.SwarmApp();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjMzMDkyNzAsImV4cCI6MTYwMzkyODQ5MzI3MCwicHJvamVjdElkIjoiNWY5OWVjNmQ1NzQ3ZDUwMDA0MTc5ZGI0In0.maF1xxW9d9C7fcBtILYn1lGzJ_vCUeNls5IptEXC9ak";


  // Create Inputs
  let pointA = {
    X: 18.9,
    Y: -22.5,
    Z: 2.9
  };

  let pointB = {
    X: 11.2,
    Y: -2.55,
    Z: 12.9
  };

  // Declare inputs first
  let input_pts = new Swarm.Input("Pt", "Point");
  let input_num = new Swarm.Input("Num", "Number");

  input_pts.addDataTree(0, [pointA, pointB]);
  input_num.addDataTree(0, 13);

  swarmApp.inputs.push(input_pts);
  swarmApp.inputs.push(input_num);


  // Sending to Swarm for compute
  swarmApp.compute().then(output => {
    if (output == null) return console.log("No compute result came back.");
    let val = output.outputs;

    console.log("There are " + val.length + " inputs in this compute");

    let outputA = output.outputs[0];
    console.log("Output A has " + outputA.branches.length + " branches", outputA);
  });

});
