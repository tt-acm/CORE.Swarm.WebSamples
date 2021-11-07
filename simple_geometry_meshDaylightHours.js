// This example creates contours of a brep vertically
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/5f99ec4c5747d50004179d9d/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');
const fs = require('fs');

//point to analysis and context files
let analysisMeshFile = "./sunlightHours_analysis.3dm";
let contextMeshesFile = "./sunlightHours_context.3dm";

// Rhino needs to load up first before using.
console.log("Starting...")
rhino3dm().then(async function (rhino) {
    console.log("Rhino3dm has loaded.  Constructing inputs...")

    //construct a new Swarm object
    var swarmApp = new Swarm.SwarmApp();
    swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

    // Swarm retrieve project id from the token
    swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzYyNjAyMDc0OTcsImV4cCI6MTYzNjI2NTM5MTQ5NywicHJvamVjdElkIjoiNjE4NmY5YTdiYzEyYmQwMDA0YTUzOTU5In0.NJpzUiZJtMeyVh58VBd6DjXsGKdBaA_m5oExghTIlXs";

    // Declare inputs first
    let a_mesh = new Swarm.Input("Analysis Mesh", "Mesh");
    let c_mesh = new Swarm.Input("Context Meshes", "Mesh");
    let latitude = new Swarm.Input("Latitude", "Number");
    let month = new Swarm.Input("Month", "Integer");

    //read analysis rhino file and adding the mesh to the input
    let buffer = fs.readFileSync(analysisMeshFile);
    let arr = new Uint8Array(buffer);
    let doc = rhino.File3dm.fromByteArray(arr);
    let objects = doc.objects();
    for (let i = 0; i < objects.count; i++) {
        let mesh = objects.get(i).geometry();
        if (mesh instanceof rhino.Mesh) {
            console.log("analysis mesh verticies", mesh.vertices().count);
            a_mesh.addDataTree(0, mesh.encode());
        }
    }
    swarmApp.inputs.push(a_mesh);

    //same for context meshes
    buffer = fs.readFileSync(contextMeshesFile);
    arr = new Uint8Array(buffer);
    doc = rhino.File3dm.fromByteArray(arr);
    objects = doc.objects();
    for (let i = 0; i < objects.count; i++) {
        let mesh = objects.get(i).geometry();
        if (mesh instanceof rhino.Mesh) {
            console.log("context mesh verticies", mesh.vertices().count);
            c_mesh.addDataTree(0, mesh.encode());
        }
    }
    swarmApp.inputs.push(c_mesh);

    //add month and latitude
    latitude.addDataTree(0, 42.0);
    swarmApp.inputs.push(latitude);
    month.addDataTree(0, 8);
    swarmApp.inputs.push(month);

    console.log("Inputs are set.  Running compute...")
    // Sending to Swarm for compute
    swarmApp.compute().then(output => {
        if (output == null) return console.log("No compute result came back.");
        let val = output.outputs;

        //console.log("There are " + val.length + " inputs in this compute");

        let outputA = output.outputs[0];
        let outputABranch1 = outputA.getDataTree(0);
        outputABranch1.forEach( mesh => {
            console.log(mesh.attributes.UserDictionary['Sunlight Hours']);
        });
    });

});
