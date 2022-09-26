====================================================================================================
====================================================================================================

                                    SOFTWARE-ENGINEERING

                                2805ICT/3815ICT Group Project

Date: 23/09/2022

TETRIS
====================================================================================================
====================================================================================================


CONTRIBUTERS
============
[Isaac](https://github.com/Isaac-Pollack)
[Clay](https://github.com/clayajohnson)


INSTALLATION
============
Clone the repo, change into the directory and ensure [Node](https://nodejs.org/en/) is installed locally for you before continuing.\
Run `npm install` to install dependencies


USAGE
=====
From the project root directory, you can run [npm start] to the app in the development mode at [http://localhost:3000]

+ The page will reload when you make changes.
+ You may also see any lint errors in the console.


SOURCE CODE
====================================================================================================
====================================================================================================

Software-Engineering
├── .eslintrc.json          # IGNORE
├── .prettierignore         # IGNORE
├── .prettierrc             # IGNORE
├── package.json            # IGNORE
├── package-lock.json       # IGNORE
├── README.txt              # You are here - contains information on the project structure and usage
├── public                  # Browser resources and images
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src                     # Project source code and logic
    ├── App.js              # Application entrypoint - loads static HTML/CSS elements and React components
    ├── App.test.js         # Test harness entrypoint - setup and run tests
    ├── components          # React components directory
    │   └── card.js         # React component for rendering the contributer cards on the home page
    ├── index.css           # CSS style sheet - top level webpage appearance configuration
    ├── index.js            # Application index - loads the application entrypoint and informs the browser of resource locations
    ├── reportWebVitals.js  # Debugging script - used to measure application performance and log variables to console
    ├── routes              # Routes available within the application
    │   ├── Configure.js    # Configure page logic - renders the configuration page to the browser window and accepts user inputs
    │   ├── Hiscores.js     # Hiscore page logic - renders the Hiscore page to the browser window and shows the game play hiscore data
    │   ├── Home.js         # Application landing page - provides access to the Configure, Hiscore and Play functionality
    │   ├── Play.js         # Play page logic - handles game operations and user input, then renders computed game state to the browser window
    │   └── styles.css      # CSS style sheet - route level webpage appearance configuration
    └── setupTests.js       # Test harness configuration - set up test environment and variables


NAMING CONVENTION
====================================================================================================
====================================================================================================

# TODO