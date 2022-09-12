# Firebase React CRUD Boilerplate

![project image](https://repository-images.githubusercontent.com/533463497/7b279ad7-53b7-4c62-b60b-4281f571bdcf)

This project is a boilerplate for CRUD web applications using Firebase, React & Typescript. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## First-time Setup

1. Create a **Google Firebase Project**.

2. Link your **React App** with your **Firebase Project** and set the following environment variables with the values provided from Google: `REACT_APP_FIREBASE_API_KEY`, `REACT_APP_FIREBASE_AUTH_DOMAIN`, `REACT_APP_FIREBASE_PROJECT_ID`, `REACT_APP_FIREBASE_STORAGE_BUCKET`, `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`, `REACT_APP_FIREBASE_APP_ID`, `REACT_APP_FIREBASE_MEASUREMENT_ID`

3. Add **Firestore** & **Authentication** to the **Firebase Project**. For authentication, set **Google** as a provider. For the sake of simplicity, the other providers aren't implemented in the app but it could be done easily.

4. Run `yarn install` in the project directory to install all the required dependencies.

5. Run `yarn start` in the project directory to start the React App in development mode.

6. **_Optional_** — If you wish to use the Firebase Emulators for development, you need to run the command `firebase init` and activate Firestore & Auth emulators. Also set the `REACT_APP_FIREBASE_USE_EMULATORS` environment variable to `true`. You must then open a terminal and run the command `firebase emulators:start`. If you want persistent data, run `firebase emulators:start --import {DATA-DIRECTORY} --export-on-exit {DATA-DIRECTORY}`

7. **_Optional_** — If you have the VS Code extension [Restore Terminals](https://marketplace.visualstudio.com/items?itemName=EthanSK.restore-terminals) installed, add the following to your VS Code repository settings; it will run the `yarn start` and `firebase emulators:start` (with persistent data) commands automatically:

```JSON
"restoreTerminals.terminals": [
    {
      "splitTerminals": [
        {
          "name": "emulators",
          "commands": ["firebase emulators:start --import /saved-data --export-on-exit /saved-data"]
        }
      ]
    },
    {
      "splitTerminals": [
        {
          "name": "react start",
          "commands": ["yarn start"]
        }
      ]
    }
  ]
```
