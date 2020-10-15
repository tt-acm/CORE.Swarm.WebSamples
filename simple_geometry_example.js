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


  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9,-22.5,2.9);
  lineA.add(14.5,19.2,0);

  let lineB = new rhino.Polyline(2); // Set number of edge points
  lineB.add(20.5,-23.5,2.3);
  lineB.add(16.35,23.5,0);

  let levelReferencePt = {
    X: 7.9,
    Y: -2.4,
    Z: 0
  };

  // Add values to inputs
  swarmApp.addInput({
    type: "Curve",
    name: "FramingIn",
    values: [lineA.toPolylineCurve().encode()]
    // values: [lineA.toPolylineCurve().encode(), lineB.toPolylineCurve().encode()]
  });

  swarmApp.addInput({
    type: "Point",
    name: "Levels",
    values: [levelReferencePt],
  });


  swarmApp.addInput({
    type: "Number",
    name: "Tolerance",
    values: [{ // tree structure
      Value: 3.14
    }]
  });


  // swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDIxNjYwNzAwMTIsInByb2plY3RJZCI6IjVmN2YxNjA0NjY1YzYzMDAwNDliNTY1YiJ9.B_H-90KJ3qmEAyCvT0Jse8hQDodkZIK6FUKPp3cJVwY";

  swarmApp.compute().then(val => {
    // console.log("asynchronous logging has val:",val);

    val.forEach(v=>{
      console.log("Output Name: ", v.name);
      console.log("Output Value: ", v.outputValue);
    })
  });

});
