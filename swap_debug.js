// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info
rhino3dm = require('rhino3dm');
var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.logging = true;
swarmApp.saveCompute = true;

// swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMyNzgyNDQ5MDQsImV4cCI6MTYyMzI4MzQyODkwNCwicHJvamVjdElkIjoiNjBjMTBkYTZiNjI3ZDAwMDA0OGNmZDBiIn0.qSpPXFZZ8Sb_vXiU-PvV9VSWDZkPd3FyN2yZ-JJWDQM";
swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM4Njg1OTYzMjksImV4cCI6MTYyMzg3Mzc4MDMyOSwicHJvamVjdElkIjoiNjBjYTQ0YTJkOGE3ZWYwMDA0ZWFhZDJhIn0.eg5ygMB9HdCTN2EQafMpeqBy2JrC2HkYs5gRXRVLCAE";

// import { Input } from '@ttcorestudio/swarm';
// let testInput = new Input();
// console.log("testinpt", testInput);

// Declare inputs first
let input_wallID = new Swarm.Input("Wall_ID", "Text");
let input_locationA = new Swarm.Input("Wall Location A", "Text");
let input_locationB = new Swarm.Input("Wall Location B", "Text");
let input_thickness = new Swarm.Input("Thickness", "Number");
let input_zoneRelativeLength = new Swarm.Input("Zone Relative Length[x+1]", "Number");
let input_lonBarSpacing = new Swarm.Input("Vertical_barSpacing", "Number");
let input_lonBarSize = new Swarm.Input("Vertical_barSize", "Integer");
let input_xLayer = new Swarm.Input("Number of Layers [x]", "Integer");


input_wallID.addDataTree(0, "wall 1");
input_locationA.addDataTree(0, "100,100,0");
input_locationB.addDataTree(0, "0,0,0");
input_thickness.addDataTree(0, 12);
input_zoneRelativeLength.addDataTree(0, [0, 0.25,0.5,1]);
input_lonBarSpacing.addDataTree(0,[3,4,5])
input_lonBarSize.addDataTree(0, [6,7,8]);
input_xLayer.addDataTree(0, [2,3,4]);




input_wallID.addDataTree(1, "wall 1");
input_locationA.addDataTree(1, "200,200,0");
input_locationB.addDataTree(1, "100,100,0");
input_thickness.addDataTree(1, 12);
input_zoneRelativeLength.addDataTree(1, [0, 0.25,0.5,1]);
input_lonBarSpacing.addDataTree(1,[3,4,5])
input_lonBarSize.addDataTree(1, [6,7,8]);
input_xLayer.addDataTree(1, [2,3,4]);


swarmApp.inputs.push(input_wallID);
swarmApp.inputs.push(input_locationA);
swarmApp.inputs.push(input_locationB);
swarmApp.inputs.push(input_thickness);
swarmApp.inputs.push(input_zoneRelativeLength);
swarmApp.inputs.push(input_lonBarSpacing);
swarmApp.inputs.push(input_lonBarSize);
swarmApp.inputs.push(input_xLayer);


rhino3dm().then((rhino) => {

  // Sending to Swarm for compute
swarmApp.runLongCompute().then(output => {
  if (output == null) return console.log("No compute result came back.");
  // console.log("asynchronous logging has val:",output);
  let val = output.outputs;

  console.log("There are " + val.length + " inputs in this compute");

  let outputA = output.outputs[0];
  console.log("Output A has " + outputA.branches.length + " branches");
  let outputABranch2 = outputA.getDataTree(1);

  // console.log("Second branch of Output A contains following data: ", outputABranch2);


  val.forEach(v => {
    console.log("Output Name: ", v.name);
    
    if (v.name == "SWRM_OUT:108:Zone Boundaries") {
      // console.log("Output Value: ", v.outputValue);  

      console.log("v.outputValue['{ 0; 0; }'].data", v.outputValue['{ 0; 0; }'][0].data);

      var resultCurve1RawObject = JSON.parse(v.outputValue['{ 0; 0; }'][0].data);
      

      // //decode that curve object into the proper rhino3dm type you are expecting
      var resultRhinoCurve1 = rhino.CommonObject.decode(resultCurve1RawObject);
      console.log("resultrhino", resultRhinoCurve1);
    }
  })
});
})

