// This example performs a framing repair - like operation on a list of lines.
// It pulls frames to their nearest level within a tolerance.
//
// Link to the Swarm App: https://dev-swarm.herokuapp.com/app/5f7f1604665c6300049b565b/info
// 
// The goal with this example is to demonstrate how to pass lists of values in Inputs (including values with custom attributes set), and how to dig into the results data trees coming back as Outputs.



//reference Swarm and Rhino packages
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
rhino3dm().then((rhino) => {
  var swarmApp = new Swarm();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDIxNjYwNzAwMTIsInByb2plY3RJZCI6IjVmN2YxNjA0NjY1YzYzMDAwNDliNTY1YiJ9.B_H-90KJ3qmEAyCvT0Jse8hQDodkZIK6FUKPp3cJVwY";


  // Input 1 - a list of lines 
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9,-22.5,2.9);
  lineA.add(14.5,19.2,0);

  let lineB = new rhino.Polyline(2); // Set number of edge points
  lineB.add(18.9,-24.5,2.9);
  lineB.add(19.5,17.2,0);

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
  let pointA = { X:0.0, Y:0.0, Z:0.0 };
  let pointB = { X:0.0, Y:0.0, Z:10.0 };
  swarmApp.addInput({
    type: "Point",
    name: "Levels",
    values: [
      { Value: pointA }, 
      { Value: pointB }
    ]
  });


  //Input 3 - single tolerance value
  swarmApp.addInput({
    type: "Number",
    name: "Tolerance",
    values: [ { Value:3.14 } ]
  })


  swarmApp.compute().then(val => {
    // console.log("asynchronous logging has val:",val);

    val.forEach(v=>{
      console.log("Output Name: ", v.name);
      console.log("Output Value: ", v.outputValue);

      v.outputValue.forEach(el => {
        console.log("JSON.parse(el.data)", JSON.parse(el.data));
        let decoded = rhino.CommonObject.decode(JSON.parse(el.data));

        console.log("decoded", typeof(decoded)); // not sure what to do with this decoded geometry
      })
    })
  });

});
