***This project is no longer maintained***

# CORE.Swarm.WebSamples
SDK samples deomnstrating how to call into the external Swarm Compute API from a node.js app using the [CORE.Swarm.jspkg](https://github.com/tt-acm/CORE.Swarm.jspkg) and [rhino3dm](https://github.com/mcneel/rhino3dm) NPM packages.

This repo serves as both a learning resource for CORE studio web development teams needing to call into Swarm, and a development environment to iteratively improve the Swarm NPM package.

## Getting Started
**Check out Swarm SDK Documentation: https://github.com/tt-acm/CORE.Swarm.jspkg/wiki/How-to-use-the-Swarm-Javascript-SDK**

1. Clone this repo.
2. Run `npm install` in a terminal at the project root directory.  Make sure you're signed in to NPM to get access to the private [@ttcorestudio/swarm](https://www.npmjs.com/package/@ttcorestudio/swarm) NPM package.
3. Run `node <file_name>` pointing at one of the example files in a terminal.  The examples all `console.log()` the results that come back from Swarm.


## Local Swarm Package Development and Debugging
As stated above, one of the main goals here is to provide a development environmnet to make the Swarm NPM package better.  The instructions below describe how to point to that local github repo's source code (instead of at the production package in `node_modules`) using `npm link`, allowing you to iterate and debug the package code base along with the example files in this repo.

### Step 1: Link to the local package
1. Clone the [CORE.Swarm.jspkg](https://github.com/tt-acm/CORE.Swarm.jspkg) repo.
2. Run `npm install` in a terminal at the `CORE.Swarm.jspkg` project root directory.
3. Run `npm link` in a terminal at the `CORE.Swarm.jspkg` project root directory.
4. Run `npm link @ttcorestudio\swarm` in a terminal at the `CORE.Swarm.WebSamples` project root directory.
5. Test the link -- add a log statement in the `CORE.Swarm.jspkg` code somewhere to prove you're running the local version of the package.

### Step 2: Branch, Iterate and Debug
1. Branch out in both repos, and commit to git at your leisure on those branches.  Do not push changes in the package to npm yet!
2. Add the `--inspect-brk` flag to the node commands to use the chrome debugger to hit breakpoints, inspect variables etc.  For example, to debug the simple addition example, the terminal command would be `node --inspect-brk simple_addition_example.js`  This will activate the inspect mode, and break on the first line of code.
3. In Chrome, go to `chrome://inspect`, and look for the inspect link to your file in the list of remote targets.  Click in to launch the chrome debugger, set some breakpoints, and have at it!

### Step 3: Unlink local package
1. Run `npm unlink --no-save @ttcorestudio/swarm` in a terminal at the `CORE.Swarm.WebSamples` project root directory.
2. Run `npm unlink` in a terminal at the `CORE.Swarm.jspkg` project root directory.
3. Verify the symbolic link has been removed by running `ls -l node_modules | grep ^l` in a terminal at the `CORE.Swarm.WebSamples` project root directory.  If this returns any results, try manually deleting the package in vs code, and repeating step 2 above.

### Step 4: Pull requests and Publish NPM Package
1. Create pull requests in both repos to merge your changes into the `main` branches.  Code reviews!
2. Increment the version in the `CORE.Swarm.jspkg` repo by running the `npm version <major | minor | patch>` command.  More info [here](https://docs.npmjs.com/cli/version).
3. Publish the package by running `npm publish` in the `CORE.Swarm.jspkg` repo.

### Links: background reading that infromed this process 
[https://medium.com/@AidThompsin/how-to-npm-link-to-a-local-version-of-your-dependency-84e82126667a](https://medium.com/@AidThompsin/how-to-npm-link-to-a-local-version-of-your-dependency-84e82126667a)

[https://dev.to/erinbush/npm-linking-and-unlinking-2h1g](https://dev.to/erinbush/npm-linking-and-unlinking-2h1g)

[https://docs.npmjs.com/cli/link](https://docs.npmjs.com/cli/link)

[https://stackoverflow.com/questions/24933955/easy-way-to-list-node-modules-i-have-npm-linked](https://stackoverflow.com/questions/24933955/easy-way-to-list-node-modules-i-have-npm-linked)

[https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)

[https://nodejs.org/en/docs/guides/debugging-getting-started/](https://nodejs.org/en/docs/guides/debugging-getting-started/)
