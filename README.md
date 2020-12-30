# Getting Started with Currency Conversion App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Deployment

This application can be deployed in Heroku for free. Please find the instructions below: 

Create the Heroku app

heroku create $APP_NAME --buildpack mars/create-react-app

This command:

sets the app name & its default URL https://$APP_NAME.herokuapp.com
sets the app to use this buildpack
configures the heroku git remote in the local repo, so git push heroku master will push to this new Heroku app.

Deploy 
git push heroku master

This command pushes the changes and deploys to master branch