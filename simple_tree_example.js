// This example simplify adds two numbers together
// Swarm App: https://swarm.thorntontomasetti.com/app/5f998551dd6d710004c38ca4/info

var Swarm = require('@ttcorestudio/swarm');
var swarmApp = new Swarm.SwarmApp();
console.log("swarmapp", Swarm);
swarmApp.setDocument(8, 0.001); // Set Document unit and tolerance

swarmApp.logging = true;

swarmApp.appToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM5MjExMTM0NzQsImV4cCI6MTYwMzkyNjI5NzQ3NCwicHJvamVjdElkIjoiNWY5OTg1NTFkZDZkNzEwMDA0YzM4Y2E0In0.2sg6y0d01zdnMaPwZdw3ICtkMAkapv8Ow8GGOLNCMds";


// Declare inputs first
let inputA = new Swarm.Input("A", "Number");
let inputB = new Swarm.Input("B", "Number");

// Collect input values
for (var i = 0; i < 3; i++) {
    inputA.InnerTree.addData(i,{Value:i});
    inputA.InnerTree.addData(i,{Value:10});

    //inputB.InnerTree.addData(0,{Value:1000});
}
inputB.InnerTree.addData(0,[{Value:1000}]); // Adding one branch of two item into input B

// Collect inputs
swarmApp.inputs.push(inputA);
swarmApp.inputs.push(inputB);


// Sending to Swarm for compute
swarmApp.compute().then(output => {
  if (output == null) return console.log("No compute result came back.");
  // console.log("asynchronous logging has val:",val);
  let val = output.outputList;

  val.forEach(v => {
    console.log("Output Name: ", v.name);
    console.log("Output Value: ", v.outputValue);
  })
});
