// This example creates contours of a brep vertically
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/5f99ec4c5747d50004179d9d/info
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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjMyNDIwNzksImV4cCI6MTYwMzkyODQyNjA3OSwicHJvamVjdElkIjoiNWY5OWVjNGM1NzQ3ZDUwMDA0MTc5ZDlkIn0.8lQYnI9R-NEQZc_OfSKFuBi5i8K4QjYLj1ioOCl8Pfw";

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
