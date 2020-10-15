// This example uses a point and a double as inputs and returns a curve back
// Link to this Swarm App: https://dev-swarm.herokuapp.com/app/5f88bc9695d9e90004524a39/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
rhino3dm().then((rhino) => {
  var swarmApp = new Swarm();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI3OTY3MzM4OTEsInByb2plY3RJZCI6IjVmODhiYzk2OTVkOWU5MDAwNDUyNGEzOSJ9.sTFExp1_3rZBfiDVuepj2ul4G1I6sY6kHrLqNEpGwLw";


  // Create Inputs
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9,-22.5,2.9);
  lineA.add(14.5,19.2,0);

  // Add Inputs
  swarmApp.addInput({
    type: "Curve",
    name: "FramingIn",
    values: [lineA.toPolylineCurve().encode()]
  });

  swarmApp.addInput({
    type: "Number",
    name: "Num",
    values: [{
      Value: 13
    }]
  });

  swarmApp.compute().then(val => {
    // console.log("asynchronous logging has val:",val);

    val.forEach(v=>{
      console.log("Output Name: ", v.name);
      console.log("Output Value: ", v.outputValue);
    })
  });

});
