// This example uses moves the input line for a short distance
// Link to this Swarm App: https://dev-swarm.herokuapp.com/app/5f88e3de95d9e90004524a50/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
rhino3dm().then((rhino) => {
  var swarmApp = new Swarm();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI4MDY3OTY0MzcsInByb2plY3RJZCI6IjVmODhlM2RlOTVkOWU5MDAwNDUyNGE1MCJ9.crh_xVZpBscmJPIUyCj_aog99BP4hilbkImcUcO0Wgk";


  // Create Inputs
  let lineA = new rhino.Polyline(2); // Set number of edge points
  lineA.add(18.9,-22.5,2.9);
  lineA.add(14.5,19.2,0);

  // Add Inputs
  swarmApp.addInput({
    type: "Curve",
    name: "Crv",
    values: [lineA.toPolylineCurve().encode()]
  });


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
