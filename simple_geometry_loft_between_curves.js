// This example uses moves the input line for a short distance
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/5f99ec325747d50004179d88/info
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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDk5ODkyOTU1NjMsImV4cCI6MTYwOTk5NDQ3OTU2MywicHJvamVjdElkIjoiNWZmNjdjYTY5ZjNmODAwMDA0YWZhZjk0In0.TiC-WKkikNFbaOlJG_rqClpjVQqE-LNY4O3P2Hc4IM0";


  // Create Inputs
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9, -22.5, 0);
  lineA.add(14.5, 19.2, 0);


  let lineB = new rhino.Polyline(2); // Set number of edge points
  lineB.add(18.9, -22.5, 5);
  lineB.add(14.5, 19.2, 5);

  // Add Inputs
  swarmApp.addInput({
    type: "Curve",
    name: "Curve A",
    values: [{ Value: lineA.toNurbsCurve().encode() }]
  });

  swarmApp.addInput({
    type: "Curve",
    name: "Curve B",
    values: [{ Value: lineB.toNurbsCurve().encode() }]
  });
  // console.log("INPUT", lineA.toNurbsCurve().encode());
  console.log("Inputs are set.  Running compute...")
  swarmApp.compute().then(output => {
    if (output == null) return console.log("No compute result came back.");

    console.log("Compute returned results!  Unpacking outputs...", output)

    let val = output.outputList;

    //we know the results for this App are a single curve output parameter, containing a single item
    //start by parsing the raw json that comes back in the compute response
    var resultLoftRawObject = JSON.parse(val[0].outputValue[0].data);
    console.log("resultLoftRawObject", resultLoftRawObject);

    //then decode that object into the proper rhino3dm type you are expecting
    var resultRhinoLoft = rhino.CommonObject.decode(resultLoftRawObject);
    console.log("Output Loft:", resultRhinoLoft.vertices().count);

    let threeMesh = resultRhinoLoft.toThreejsJSON(true);
    console.log("threeMesh", threeMesh);

    //now you can do whatever with the results --- its a nurbs curve!
    // console.log("Point on Output Curve at t=0", resultRhinoLoft.pointAt(0.0));
    // console.log("Point on Output Curve at t=0.5", resultRhinoLoft.pointAt(0.5));
    // console.log("Point on Output Curve at t=1", resultRhinoLoft.pointAt(1.0));
  });

});
