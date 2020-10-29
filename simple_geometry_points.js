// This example uses a point and a double as inputs and returns a curve back
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/5f99ec6d5747d50004179db4/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
rhino3dm().then((rhino) => {
  var swarmApp = new Swarm();
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

    val.forEach(v => {
      console.log("Output Name: ", v.name);
      console.log("Output Value: ", v.outputValue);
    })
  });

});
