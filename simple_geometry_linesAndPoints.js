// This example performs a framing repair - like operation on a list of lines.
// It pulls frames to their nearest level within a tolerance.
//
// Link to the Swarm App: https://swarm.thorntontomasetti.com/app/5f9985a7dd6d710004c38d73/info
// 
// The goal with this example is to demonstrate how to pass lists of values in Inputs (including values with custom attributes set), and how to dig into the results data trees coming back as Outputs.



//reference Swarm and Rhino packages
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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjA4OTgxNzcsImV4cCI6MTYwMzkyNjA4MjE3NywicHJvamVjdElkIjoiNWY5OTg1YTdkZDZkNzEwMDA0YzM4ZDczIn0.q5EX8MlDMcBvN86CNPbTohF_vghc88AHBdsu2UfRN5M";


  // Input 1 - a list of lines 
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9, -22.5, 2.9);
  lineA.add(14.5, 19.2, 0);

  let lineB = new rhino.Polyline(2); // Set number of edge points
  lineB.add(18.9, -24.5, 2.9);
  lineB.add(19.5, 17.2, 0);

  // Add Input to app
  // note that a list of values is being passed into this single input, and that each input item can have both a value and a dictionary of key/value attributes
  swarmApp.addInput({
    type: "Curve",
    name: "FramingIn",
    values: [
      {
        Value: lineA.toNurbsCurve().encode(),
        customAttributes: {
          "konstruId": "112358"
        }
      },
      {
        Value: lineB.toNurbsCurve().encode(),
        customAttributes: {
          "konstruId": "13213455"
        }
      }
    ]
  });


  //Input 2 - a list of points
  let pointA = { X: 0.0, Y: 0.0, Z: 0.0 };
  swarmApp.addInput({
    type: "Point",
    name: "Levels",
    values: [
      { Value: pointA }
    ]
  });


  //Input 3 - single tolerance value
  swarmApp.addInput({
    type: "Number",
    name: "Tolerance",
    values: [{ Value: 5.0 }]
  })

  console.log("Inputs are set.  Running compute...")

  //the actual compute call.  The val coming back in the promise is the collection of all Swarm App Outputs
  swarmApp.compute().then(val => {

    console.log("Compute returned results!  Unpacking outputs...")

    //check for nulls in the outputValues - if an output isn't populated during a compute, this will be null
    if(val[0].outputValue === null ){
      console.log("Compute returned null; bailing out.");
      return;
    }

    //we know the results of this App are a single output containing 2 curves, whose end points might have been sucked to a level depending on the tolerance set above.

    //the code below shows how to get at the geometry and attributes coming back from the Swarm Server in an Output

    //first curve and its attributes
    var resultCurve1RawObject = JSON.parse(val[0].outputValue[0].data);
    var resultCurve1Attributes = val[0].outputValue[0].attributes.UserDictionary;

    //decode that curve object into the proper rhino3dm type you are expecting
    var resultRhinoCurve1 = rhino.CommonObject.decode(resultCurve1RawObject);

    //now you can do whatever with the results --- its a nurbs curve!
    console.log("Adjusted Start Point on Output Curve 1", resultRhinoCurve1.pointAt(0.0));
    console.log("Adjusted Start Point on Output Curve 1", resultRhinoCurve1.pointAt(1.0));
    //attributes, too
    console.log("Adjusted Curve 1 custom attributes", resultCurve1Attributes);

  });
});
