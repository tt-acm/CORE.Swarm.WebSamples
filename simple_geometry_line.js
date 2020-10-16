// This example uses moves the input line for a short distance
// Link to this Swarm App: https://dev-swarm.herokuapp.com/app/5f88e3de95d9e90004524a50/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
console.log("Starting...")
rhino3dm().then((rhino) => {

  console.log("Rhino3dm has loaded.  Constructing inputs...")

  //construct a new Swarm object
  var swarmApp = new Swarm();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI4MDY3OTY0MzcsInByb2plY3RJZCI6IjVmODhlM2RlOTVkOWU5MDAwNDUyNGE1MCJ9.crh_xVZpBscmJPIUyCj_aog99BP4hilbkImcUcO0Wgk";


  // Create Inputs
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9, -22.5, 2.9);
  lineA.add(14.5, 19.2, 0);

  // Add Inputs
  swarmApp.addInput({
    type: "Curve",
    name: "Crv",
    values: [{ Value: lineA.toNurbsCurve().encode() }]
  });

  console.log("Inputs are set.  Running compute...")
  swarmApp.compute().then(val => {

    console.log("Compute returned results!  Unpacking outputs...")

    //we know the results for this App are a single curve output parameter, containing a single item
    //start by parsing the raw json that comes back in the compute response
    var resultCurveRawObject = JSON.parse(val[0].outputValue[0].data);

    //then decode that object into the proper rhino3dm type you are expecting
    var resultRhinoCurve = rhino.CommonObject.decode(resultCurveRawObject);
    console.log("Output Curve:", resultRhinoCurve);

    //now you can do whatever with the results --- its a nurbs curve!
    console.log("Point on Output Curve at t=0", resultRhinoCurve.pointAt(0.0));
    console.log("Point on Output Curve at t=0.5", resultRhinoCurve.pointAt(0.5));
    console.log("Point on Output Curve at t=1", resultRhinoCurve.pointAt(1.0));
  });

});
