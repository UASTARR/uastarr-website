# Development Setup
1. `cd src` Make sure you are under src directory
2. `npm install` [Install](#initialize-node-modules) all packages (need to do this every time you switch a branch)
3. [Create .env file](#create-dotenv-file)
4. `npm run dev` Start server
5. Open the link on terminal (usually is localhost)
> [!NOTE]  
> We are using ES Modules not CommonJS modules

## Directory
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
    
## Initialize node modules

Make sure you are under src in command line and run `npm install`.  
It should install (locally) all the packages needed (from package.json) into node_modules folder.  
> **Note**  
> Please run the command again when there's a change in package.json (i.e. adding packages).  

## Create dotenv file
Make sure to create a `.env` file under `src` with the following attributes
<!-- TODO: how to generate token -->
```
# For project on cloud console
credentials_client_id=
credentials_project_id=
credentials_auth_uri=
credentials_token_uri=
credentials_auth_provider_x509_cert_url=
credentials_client_secret=

# Contact us form
spreadsheet_id=
recaptcha_secret_key=
NEXT_PUBLIC_RECAPTCHA_SITEKEY=
NEXT_PUBLIC_MAP_KEY=

# Authorization Tokens
token_type
token_client_id
token_client_secret
token_refresh_token

# Firebase
firebase_apiKey=
firebase_authDomain=
firebase_projectId=
firebase_storageBucket=
firebase_messagingSenderId=
firebase_appId=
```

# References
- [Cloud Firestore](https://firebase.google.com/docs/firestore?_gl=1*ez9530*_up*MQ..*_ga*MTgxNjkwNjgzOS4xNzE4NDM4MTQ5*_ga_CW55HF8NVT*MTcxODQzODE0OC4xLjAuMTcxODQzODE0OC4wLjAuMA..)
- [Integrate Firebase with a Next.js app](https://firebase.google.com/codelabs/firebase-nextjs#0)
- [Tailwind Styling (built in to next js)](https://tailwindcss.com/)
- [Photo Zoomed in](https://medium.com/@thomasaugot/adding-zoom-functionality-to-an-image-viewer-in-react-next-js-4621be8eb770)
- [Count Down (or copilot)](https://devpress.csdn.net/react/62eb6977648466712833a0e4.html)

# Dependency Vulnerability Fixes
## googleapis
- qs
    - Affected version `< 6.14.1`
    - Patched version `6.14.1`