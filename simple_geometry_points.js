// This example uses a point and a double as inputs and returns a curve back
// Link to this Swarm App: https://dev-swarm.herokuapp.com/app/5f884e4e7156fd0004ecd4be/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
rhino3dm().then((rhino) => {
  var swarmApp = new Swarm();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI3Njk0MzU2NzksInByb2plY3RJZCI6IjVmODg0ZTRlNzE1NmZkMDAwNGVjZDRiZSJ9._yWufgzymdHhZA8hdyRIffYb8Pgz9U8Sa6GFSYO4X1c";


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

  // Add Inputs
  swarmApp.addInput({
    type: "Point",
    name: "Pt",
    values: [
      { Value: pointA }, 
      { Value: pointB }
    ]
  });

  swarmApp.addInput({
    type: "Number",
    name: "Num",
    values: [{
      Value: 13
    }]
  });

  swarmApp.compute().then(val => {

    val.forEach(v=>{
      console.log("Output Name: ", v.name);
      console.log("Output Value: ", v.outputValue);
    })
  });

});
