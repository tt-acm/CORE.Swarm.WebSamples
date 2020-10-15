// This example uses a point and a double as inputs and returns a curve back
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
rhino3dm().then((rhino) => {

  pointA = {
    X: 18.9,
    Y: -22.5,
    Z: 2.9
  };

  pointB = {
    X: 11.2,
    Y: -2.55,
    Z: 12.9
  };

  var swarmApp = new Swarm();
  // Set Document unit and tolerance
  swarmApp.setDocument(8, 0.001);

  // Construct a input object, add it into an array, and do swarmApp.inputs = [inputs]
  swarmApp.addInput({
    type: "Point",
    name: "Pt",
    values: [pointA, pointB],
    ReferencedGeometry: [pointA, pointB]
  });

  swarmApp.addInput({
    type: "Number",
    name: "Num",
    values: [{ // tree structure
      Value: 13
    }]
  });


  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI3Njk0MzU2NzksInByb2plY3RJZCI6IjVmODg0ZTRlNzE1NmZkMDAwNGVjZDRiZSJ9._yWufgzymdHhZA8hdyRIffYb8Pgz9U8Sa6GFSYO4X1c";
  // swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDIxNjYwNzAwMTIsInByb2plY3RJZCI6IjVmN2YxNjA0NjY1YzYzMDAwNDliNTY1YiJ9.B_H-90KJ3qmEAyCvT0Jse8hQDodkZIK6FUKPp3cJVwY";

  swarmApp.callIntoSwarm().then(val => {
    // console.log("asynchronous logging has val:",val);

    val.forEach(v=>{
      console.log("Output Name: ", v.name);
      console.log("Output Value: ", v.outputValue);
    })
  });

});
