// This example creates contours of a brep vertically
// Link to this Swarm App: https://dev-swarm.herokuapp.com/app/5f89fc936d4d5500043f5241/info
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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI4Nzg4Mzk4NzcsInByb2plY3RJZCI6IjVmODlmYzkzNmQ0ZDU1MDAwNDNmNTI0MSJ9.0d2BDbfmGCjG7C-W2l2mvCS7xGDjOvW7NlMt2YkXOlA";


  // Create Inputs
  let sphere = new rhino.Sphere([0,0,0], 15);

  // Add Inputs
  swarmApp.addInput({
    type: "Brep",
    name: "Brep",
    values: [{ Value: sphere.toBrep().encode() }] // Object to create contour
  });

  swarmApp.addInput({
    type: "Number",
    name: "Num",
    values: [{ Value: 5.0 }] // Contour distance
  })

  console.log("Inputs are set.  Running compute...")
  swarmApp.compute().then(val => {

    console.log("Compute returned results!  Unpacking outputs...")

    //we know the results for this App are a single curve output parameter, containing multiple curves
    //start by parsing the raw json that comes back in the compute response
    console.log("Output Name: ", val[0].name);
    // console.log("Output Value: ", v.outputValue);
    val[0].outputValue.forEach(val => {// Fist compute output returns an array of curves
      var resultCurveRawObject = JSON.parse(val.data);

      //then decode that object into the proper rhino3dm type you are expecting
      var resultRhinoCurve = rhino.CommonObject.decode(resultCurveRawObject);
      console.log("Output Curve:", resultRhinoCurve);

      //now you can do whatever with the results --- its a nurbs curve!
      console.log("Point on Output Curve at t=0", resultRhinoCurve.pointAt(0.0));
      console.log("Point on Output Curve at t=0.5", resultRhinoCurve.pointAt(0.5));
      console.log("Point on Output Curve at t=1", resultRhinoCurve.pointAt(1.0));
    })

  });

});
