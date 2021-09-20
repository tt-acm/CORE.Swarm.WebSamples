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
  var swarmApp = new Swarm.SwarmApp();
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjMyNDIwNzksImV4cCI6MTYwMzkyODQyNjA3OSwicHJvamVjdElkIjoiNWY5OWVjNGM1NzQ3ZDUwMDA0MTc5ZDlkIn0.8lQYnI9R-NEQZc_OfSKFuBi5i8K4QjYLj1ioOCl8Pfw";

  let buffer = fs.readFileSync(file3dmpath);
  let arr = new Uint8Array(buffer);
  let doc = rhino.File3dm.fromByteArray(arr);
  console.log("doc", doc);

  // Declare inputs first
  let input_mesh = new Swarm.Input("inputMesh", "Mesh");
  

  let objects = doc.objects();
  for (let i = 0; i < objects.count; i++) {
    let mesh = objects.get(i).geometry();
    if (mesh instanceof rhino.Mesh) {
      console.log("mesh verticies", mesh.vertices().count);
      // Add Inputs
      input_mesh.addDataTree(0, mesh.encode());
    }
  }

  swarmApp.inputs.push(input_mesh);


  console.log("Inputs are set.  Running compute...")
  // Sending to Swarm for compute
  swarmApp.compute().then(output => {
    if (output == null) return console.log("No compute result came back.");
    let val = output.outputs;

    console.log("There are " + val.length + " inputs in this compute");

    let outputA = output.outputs[0];
    console.log("Output A has " + outputA.branches.length + " branches", outputA);
  });

});
