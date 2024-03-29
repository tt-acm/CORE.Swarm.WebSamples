// This example runs framing repair for Konstru
// Link to this Swarm App: https://swarm.thorntontomasetti.com/app/615332b1947d9c0004adf618/info
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
  swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzI4NDI1MTc5MjksImV4cCI6MTYzMjg0NzcwMTkyOSwicHJvamVjdElkIjoiNjE1MzMyYjE5NDdkOWMwMDA0YWRmNjE4In0.UeST4z41rjmIao_27iQqnfMTMh1hoa-GHKIroPmanQw";


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

  // Declare inputs first
  let input_beam = new Swarm.Input("Beams", "Curve");
  let input_column= new Swarm.Input("Column", "Curve");
  input_beam.addData(encodedBeams);
  input_column.addData(encodedColumns);

  swarmApp.inputs.push(input_beam);
  swarmApp.inputs.push(input_column);

//   console.log("INPUT:input_beam", input_beam);
//   console.log("INPUT:input_column", input_column);
//   console.log("Inputs are set.  Running compute...")

  // Sending to Swarm for compute
  swarmApp.compute().then(output => {
    let outputA = output.outputs[0];
    console.log("Output A has " + outputA.branches.length + " branches");
    let outputABranch1 = outputA.getDataTree(0);
         

    // //decode that curve object into the proper rhino3dm type you are expecting
    var resultCurve1RawObject = JSON.parse(outputABranch1[0].data);   
    var resultRhinoCurve1 = rhino.CommonObject.decode(resultCurve1RawObject);
    console.log("resultrhino", resultRhinoCurve1.points().get(0), resultRhinoCurve1.points().get(1));
});
});
