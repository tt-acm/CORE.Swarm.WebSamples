// App Name: Swap 2d both app test 1
// Swarm App: https://swarm.thorntontomasetti.com/app/60c23db76f061700047e315e/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.logging = true;

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMzNDkzODc0NDksImV4cCI6MTYyMzM1NDU3MTQ0OSwicHJvamVjdElkIjoiNjBjMjNkYjc2ZjA2MTcwMDA0N2UzMTVlIn0.9imBE-tHbYHU1v4xtsXwsYoxa2sBdZJHY47IQkoRzkU";
// swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMwOTk3NDI4NzUsImV4cCI6MTYyMzEwNDkyNjg3NSwicHJvamVjdElkIjoiNWU1MDA5MTA0MWQxNjIwMDA0YWFhZDNhIn0.B19S57dqx9X3-oz0f23R7zDX7hkT701ycdrVUwUZzjs";

// import { Input } from '@ttcorestudio/swarm';
// let testInput = new Input();
// console.log("testinpt", testInput);

// Declare inputs first
let input_plan = new Swarm.Input("View", "Value List");
let input_locationA = new Swarm.Input("Wall Location A", "Text");
let input_locationB = new Swarm.Input("Wall Location B", "Text");
let input_thickness = new Swarm.Input("Thickness", "Number");
let input_zoneRelativeLength = new Swarm.Input("Zone Relative Length[x+1]", "Text");
let input_lonBarSpacing = new Swarm.Input("Longitudinal Bar Spacing [x]", "Number");
let input_lonBarSize = new Swarm.Input("Longitudinal Bar Size[x]", "Text");
let input_xLayer = new Swarm.Input("Number of Layers [x]", "Integer");
let input_height = new Swarm.Input("Height", "Number");
let input_verBarSpacing = new Swarm.Input("Vertical Bar Spacing[Y]", "Number");
let input_verBarSize = new Swarm.Input("Vertical Bar Size[Y]", "Text");

input_plan.addDataTree(0, "False");
input_locationA.addDataTree(0, "100,100,0");
input_locationB.addDataTree(0, "0,0,0");
input_thickness.addDataTree(0, 12);
input_zoneRelativeLength.addDataTree(0, "0, 0.5,1");
input_lonBarSpacing.addDataTree(0,3)
input_lonBarSize.addDataTree(0, "6");
input_xLayer.addDataTree(0, 3);
input_height.addDataTree(0, "50");
input_verBarSpacing.addDataTree(0, 3);
input_verBarSize.addDataTree(0, "6");

input_locationA.addDataTree(1, "100,100,0");
input_locationB.addDataTree(1, "0,0,0");
input_thickness.addDataTree(1, 12);
input_zoneRelativeLength.addDataTree(1, "0, 0.5,1");
input_lonBarSpacing.addDataTree(1,3)
input_lonBarSize.addDataTree(1, "6");
input_xLayer.addDataTree(1, 3);
input_height.addDataTree(1, "50");
input_verBarSpacing.addDataTree(1, 3);
input_verBarSize.addDataTree(1, "6");

swarmApp.inputs.push(input_locationA);
swarmApp.inputs.push(input_locationB);
swarmApp.inputs.push(input_thickness);
swarmApp.inputs.push(input_zoneRelativeLength);
swarmApp.inputs.push(input_lonBarSpacing);
swarmApp.inputs.push(input_lonBarSize);
swarmApp.inputs.push(input_xLayer);
swarmApp.inputs.push(input_height);
swarmApp.inputs.push(input_verBarSpacing);
swarmApp.inputs.push(input_verBarSize);



// Sending to Swarm for compute
swarmApp.compute().then(output => {
  if (output == null) return console.log("No compute result came back.");
  // console.log("asynchronous logging has val:",output);
  let val = output.outputs;

  console.log("There are " + val.length + " inputs in this compute");

  let outputA = output.outputs[0];
  console.log("Output A has " + outputA.branches.length + " branches");
  let outputABranch2 = outputA.getDataTree(1);

  console.log("Second branch of Output A contains following data: ", outputABranch2);


  val.forEach(v => {
    console.log("Output Name: ", v.name);
    
    if (v.name == "SWRM_OUT:106:Monocle Obj") {
      console.log("Output Value: ", v.outputValue);  
    }
  })
});
