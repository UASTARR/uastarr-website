### Development Setup
1. Make sure you are under src
2. [Install](#initialize-node-modules) all packages (need to do this every time you switch a branch)
3. Start [tailwind](#how-to-start-tailwind-css)
4. Start web server with `node .`
5. Open the link on terminal

### Initialize node modules

Make sure you are under src in command line and run `npm install`.  
It should install (locally) all the packages needed (from package.json) into node_modules folder.  
> **Note**  
> Please run the command again when there's a change in package.json (i.e. adding packages).  

### Directory
    src                    # (running everything within src)
    ├── google_api
    │   └── api.js              # The api interface functions for google
    ├── routes                  # JS Files route to different pages
    ├── static                  # ! PUBLIC ! resource files to the website NEEDS CLEAN UP
    │   ├── dist                # main.css is needed for the website ('npm run tail')
    │   └── ...
    ├── templates               # ! PUBLIC ! pages
    ├── index.js                # The main file to start the web server
    ├── package-lock.json       # Do not touch
    ├── package.json            # All package listing and scripts
    └── tailwind.config.js

### We are using ES Modules not CommonJS modules

Tools to use to help you code in node:
 [Nodemon](https://www.npmjs.com/package/nodemon)
- automatically restars the node applicaiton when file changes in the directory are detected 
    npm install -g nodemon # or using yarn: yarn global add nodemon
    Then run index.js using nodemon
        nodemon index.js


Helpful information:
ExpressJS Routing
- If you are anything like me, then you probably learn better by watching videos in 2x speed.
    - https://www.youtube.com/watch?v=0Hu27PoloYw

To launch an HTML file using Express, you need to use the res.sendFile method, which sends a file to the browser. You also need to specify the path to the file, which can be done using the path module. For example, if your join.html file is in the same folder as your contact.js file, you can write:

import express from "express";
import path from "path";
export const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "join.html"));
});

This will send the join.html file when the user requests the / route. You can also use other routes to send different HTML files, or use parameters to dynamically send files based on the request. For more information on how to use res.sendFile, you can check out this web page.

### How to start [Tailwind CSS](https://tailwindcss.com/)
- Make sure you have [installed](#initialize-node-modules) Tailwind.  
- Open a <u>new</u> terminal under src, run `npm run tail`.
- This command will run a script in 'package.json' which will take the input 'main.css' file in the 'src' folder and builds a new one in 'dist' folder.  
- This command rebuilds the css file upon change of the ejs files.