// This example creates contours of a brep vertically
// Link to this Swarm App: https://dev-swarm.herokuapp.com/app/5f89fc936d4d5500043f5241/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');
const fs = require('fs');

let file3dmpath = "./mesh_sphere.3dm";

// Rhino needs to load up first before using.
console.log("Starting...")
rhino3dm().then(async function(rhino) {
  console.log("Rhino3dm has loaded.  Constructing inputs...")

  //construct a new Swarm object
  var swarmApp = new Swarm();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI5NTk0MDcwODcsImV4cCI6MTYwMjk2NDU5MTA4NywicHJvamVjdElkIjoiNWY4YjM4MGJiZDNhMDIwMDA0NjEzODVlIn0.8u5s7IaajIT2r5IWer9177gZA5XwygVuupaKhTTDEXM";

  let buffer = fs.readFileSync(file3dmpath);
  let arr = new Uint8Array(buffer);
  let doc = rhino.File3dm.fromByteArray(arr);
  console.log("doc", doc);

  let objects = doc.objects();
  for (let i = 0; i < objects.count; i++) {
    let mesh = objects.get(i).geometry();
    if (mesh instanceof rhino.Mesh) {
      console.log("mesh verticies", mesh.vertices().count);
      // Add Inputs
      swarmApp.addInput({
        type: "Mesh",
        name: "inputMesh",
        values: [{
          Value: mesh.encode()
        }] // Object to create contour
      });
    }
  }


  console.log("Inputs are set.  Running compute...")
  swarmApp.compute().then(val => {

    console.log("Compute returned results!  Unpacking outputs...")

    //we know the results for this App is a single output that returns an array of points
    //start by parsing the raw json that comes back in the compute response
    // console.log("Output Value: ", v.outputValue);
    val[0].outputValue.forEach(val => { // Fist compute output returns an array of points
      var resultCurveRawObject = JSON.parse(val.data);
      console.log("resultCurveRawObject", resultCurveRawObject);
    })

  });

});
