// This example runs framing repair for Konstru. Pull nodes to workpoints within the tolerance.
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/615621a3e6556d0004f8c970/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');

// Rhino needs to load up first before using.
console.log("Starting...")
rhino3dm().then((rhino) => {
    console.log("Rhino3dm has loaded.  Constructing inputs...")

    //construct a new Swarm object
    var swarmApp = new Swarm.SwarmApp();
    swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

    // Swarm retrieve project id from the token
    swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzMwMzU1MDk0MDYsImV4cCI6MTYzMzA0MDY5MzQwNiwicHJvamVjdElkIjoiNjE1NjIxYTNlNjU1NmQwMDA0ZjhjOTcwIn0.ekpZKs-nwILMIWVrXRseU1nwY4l_FAezB0vGSsB0W4M";


    // Create Inputs
    // First, convert konstru grids into rhino.polyline with two end points
    // For each grid line in grids, take the start& end points out from Konstru Grid. 
    // Use the start&end points to create new Rhino.Polyline(2). We add it to an array of rhino.polylines, and feed it into the input "input_grids"
    let beamA = new rhino.Polyline(2); // Set number of edge points
    beamA.add(0, 0, 0);
    beamA.add(20, 0, 0);
    let beamB = new rhino.Polyline(2); // Set number of edge points
    beamB.add(0, 20, 0);
    beamB.add(20, 20, 0);
    let beamC = new rhino.Polyline(2); // Set number of edge points
    beamC.add(0.43, 0, 0);
    beamC.add(-0.12, 20.2, 0);
    let beamD = new rhino.Polyline(2); // Set number of edge points
    beamD.add(20.43, 0.1, 0);
    beamD.add(19.89, 19.98, 0);

  
    var encodedGrids = [beamA.toNurbsCurve().encode(), beamB.toNurbsCurve().encode(), beamC.toNurbsCurve().encode(), beamD.toNurbsCurve().encode() ];
    
    
    // Second, for each elevation, we find out the height value, extract the double value from the height. 
    // For example 0.0, 4.2, 8.5. In the end: [0.0, 4.2, 8.5]
    var elevation = [0, 20,40,60 ];


    // Declare inputs first
    let input_grids = new Swarm.Input("Grids", "Curve");
    let input_level = new Swarm.Input("Level Elevation", "Number");

    input_grids.addData(encodedGrids);
    input_level.addData(elevation);

    swarmApp.inputs.push(input_grids);
    swarmApp.inputs.push(input_level);

    // Sending to Swarm for compute
    swarmApp.compute().then(output => {
        let outputA = output.outputs.filter(o => o.name.includes("Workpoint"))[0];
        console.log("Output A has " + outputA.branches.length + " branches");
        let outputABranch1 = outputA.getDataTree(0);

           
        outputABranch1.forEach(wp => {
            //decode that curve object into the proper rhino3dm type you are expecting
            var wpJsonObject = JSON.parse(wp.data);   
            console.log("wpJsonObject", wpJsonObject);
        })        
    });
});
