// This example runs framing repair for Konstru
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/619802a3e830a30004ccd6f1/info
var Swarm = require('@ttcorestudio/swarm');
rhino3dm = require('rhino3dm');
Swarm.userId = "5e30091214c7ae0004f2fac2";

// Rhino needs to load up first before using.
console.log("Starting...")
rhino3dm().then((rhino) => {

  console.log("Rhino3dm has loaded.  Constructing inputs...")

  //construct a new Swarm object
  var swarmApp = new Swarm.SwarmApp();
  swarmApp.saveCompute = true;
  swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

  // Swarm retrieve project id from the token
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzczNTI5OTk4MTMsImV4cCI6MTYzNzM1ODE4MzgxMywicHJvamVjdElkIjoiNjE5ODAyYTNlODMwYTMwMDA0Y2NkNmYxIn0.4RG2NkU-ymxERfntB1Kv0hSzofhIfFUKI5XEIBiwNwo";

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

  let braceA = new rhino.Polyline(2); // Set number of edge points
  braceA.add(20, 20, 0);
  braceA.add(0,0, -20);

//   var encodedBeams = [beamA.toNurbsCurve().encode(), beamB.toNurbsCurve().encode(), beamC.toNurbsCurve().encode(), beamD.toNurbsCurve().encode() ];

  var encodedBeams = [
    {
        'value': beamA.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "BeamA"
        }
    },
    {
        'value': beamB.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "BeamB"
        }
    },
    {
        'value': beamC.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "BeamC"
        }
    },{
        'value': beamD.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "BeamD"
        }
    }];


    var encodedColumns = [
    {
        'value': columnA.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "ColumnA"
        }
    },
    {
        'value': columnB.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "ColumnB"
        }
    },
    {
        'value': columnC.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "ColumnC"
        }
    },{
        'value': columnD.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "ColumnD"
        }
    }];

    var encodedBraces = [
    {
        'value': braceA.toNurbsCurve().encode(),
        'customAttributes': {
            'KonstruID': "BraceA"
        }
    }];

  // Declare inputs first
  let input_beam = new Swarm.Input("Beams", "Curve");
  let input_column= new Swarm.Input("Columns", "Curve");
  let input_brace= new Swarm.Input("Braces", "Curve");
  let input_tolerance= new Swarm.Input("Tolerance", "Number");

  input_beam.addData(encodedBeams);
  input_column.addData(encodedColumns);
  input_brace.addData(encodedBraces);
  input_tolerance.addData(0.05);

  swarmApp.inputs.push(input_beam);
  swarmApp.inputs.push(input_column);
  swarmApp.inputs.push(input_brace);
  swarmApp.inputs.push(input_tolerance);


  // Sending to Swarm for compute
  swarmApp.compute().then(output => {
      console.log("output", output.outputs);
    //   let ccc = output.outputs.filter(o => o.name.includes("Crv"))[0];
    //   let cc = ccc.getDataTree(0);
    //   console.log("cc",cc);
    let repaired_beams = output.outputs.filter(o => o.name.includes("Repaired Beams"))[0];
    let repaired_columns = output.outputs.filter(o => o.name.includes("Repaired Columns"))[0];
    let repaired_braces = output.outputs.filter(o => o.name.includes("Repaired Braces"))[0];
    // console.log("Output A has " + outputA.branches.length + " branches");
    let beamsBranch1 = repaired_beams.getDataTree(0);
    let columnsBranch1 = repaired_columns.getDataTree(0); 
    let bracesBranch1 = repaired_braces.getDataTree(0);  
    console.log("brace1's attributes", bracesBranch1[0].attributes.UserDictionary);
    console.log("beam1's attributes", beamsBranch1[0].attributes.UserDictionary);


    //decode that curve object into the proper rhino3dm type you are expecting
    var beam1RawObject = JSON.parse(beamsBranch1[0].data);   
    var resultBeamRhinoCurve1 = rhino.CommonObject.decode(beam1RawObject);

    var col1RawObject = JSON.parse(columnsBranch1[0].data);   
    var resultcolRhinoCurve1 = rhino.CommonObject.decode(col1RawObject);
    console.log(resultBeamRhinoCurve1)
});
});
