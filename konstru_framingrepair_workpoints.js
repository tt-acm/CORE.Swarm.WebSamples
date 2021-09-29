// This example runs framing repair for Konstru. Pull nodes to workpoints within the tolerance.
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/6154b9e140a7790004ab977e/info
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
    swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzI5NDI2ODMxNzgsImV4cCI6MTYzMjk0Nzg2NzE3OCwicHJvamVjdElkIjoiNjE1NGI5ZTE0MGE3NzkwMDA0YWI5NzdlIn0.xSwjyceXu4VeSKXhArDsszt0ukUwiR4NpZ1lCus4CvQ";


    // Create Inputs
    // Convert Konstru element, by end point. Reconstruct new polylines of two endpoints using the konstru end points. (Kosntru element to Rhino polyline conversion)
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

    let columnA = new rhino.Polyline(2); // Set number of edge points
    columnA.add(0, 0, -0.89);
    columnA.add(0, 0, -20);
    let columnB = new rhino.Polyline(2); // Set number of edge points
    columnB.add(0, 20, -0.95);
    columnB.add(0, 20, -20);
    let columnC = new rhino.Polyline(2); // Set number of edge points
    columnC.add(20, 0, 0);
    columnC.add(20, 0, -20);
    let columnD = new rhino.Polyline(2); // Set number of edge points
    columnD.add(20, 20, 0);
    columnD.add(20,20, -20);

    var encodedBeams = [beamA.toNurbsCurve().encode(), beamB.toNurbsCurve().encode(), beamC.toNurbsCurve().encode(), beamD.toNurbsCurve().encode() ];
    var encodedColumns = [columnA.toNurbsCurve().encode(), columnB.toNurbsCurve().encode(), columnC.toNurbsCurve().encode(), columnD.toNurbsCurve().encode() ];

    let pointA = { X: 0.0, Y: 0.0, Z: 0.0 };
    let pointB = { X: 20.0, Y: 0.0, Z: 0.0 };
    let pointC = { X: 0.0, Y: 20.0, Z: 0.0 };
    let pointD = { X: 20.0, Y:20.0, Z: 0.0 };

    let workPoints = [pointA, pointB, pointC, pointD];


    // Declare inputs first
    let input_beam = new Swarm.Input("Beams", "Curve");
    let input_column = new Swarm.Input("Columns", "Curve");
    let input_workpoints = new Swarm.Input("Workpoints", "Point");
    let input_tolerance = new Swarm.Input("Tolerance", "Number");

    input_beam.addData(encodedBeams);
    input_column.addData(encodedColumns);
    input_workpoints.addData(workPoints);
    input_tolerance.addData(0.5); // Insert the actual tolerance

    swarmApp.inputs.push(input_beam);
    swarmApp.inputs.push(input_column);
    swarmApp.inputs.push(input_workpoints);
    swarmApp.inputs.push(input_tolerance);

    //   console.log("INPUT:input_beam", input_beam);
    //   console.log("INPUT:input_column", input_column);
    //   console.log("Inputs are set.  Running compute...")

    // Sending to Swarm for compute
    swarmApp.compute().then(output => {
        let outputA = output.outputs[0];
        console.log("Output A has " + outputA.branches.length + " branches");
        let outputABranch1 = outputA.getDataTree(0);
           
        outputABranch1.forEach(beam => {
            //decode that curve object into the proper rhino3dm type you are expecting
            var beamJsonObject = JSON.parse(beam.data);   
            var resultRhinoCurve = rhino.CommonObject.decode(beamJsonObject);
            // Points are formatted in format [x,y,z,weight]. We can ignore the weight value in our case.
            console.log("Curve end points:", resultRhinoCurve.points().get(0), resultRhinoCurve.points().get(1));
        })        
    });
});
