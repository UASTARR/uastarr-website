### Development Setup
1. `cd src` Make sure you are under src directory
2. `npm install` [Install](#initialize-node-modules) all packages (need to do this every time you switch a branch)
3. `npm run dev` Start server
4. Open the link on terminal (usually is localhost)

### Initialize node modules

Make sure you are under src in command line and run `npm install`.  
It should install (locally) all the packages needed (from package.json) into node_modules folder.  
> **Note**  
> Please run the command again when there's a change in package.json (i.e. adding packages).  

### Directory
    src                    # (running everything within src)
    ├── google_api
    │   └── api.js              # The api interface functions for google
    ├── app
    │   ├── components
    │   │   ├── navbar
    │   │   └── footer
    │   ├── {other pages' directories (folder names are routes)}
    │   ├── page.tsx            # Home page
    │   └── layout.tsx          # Base layout
    ├── package-lock.json       # Do not touch
    ├── package.json            # All package listing and scripts
    └── tailwind.config.js

### We are using ES Modules not CommonJS modules
