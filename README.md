# TRAVEL-APP FEND CAPSTONE

A travel app is built in which the user can input a destination and day of travel and the webapp displays the number of days to the trip, a picture of the location and the forecast (if possible) for the departure day.
Additionally, there is a todo list which the user can use to add items as reminders
Three APIs are used to achieve this. [geonames](http://www.geonames.org/export/web-services.html), which transforms the city name into coordinates, [weatherbit](https://www.weatherbit.io) which gives the weather forceast up to 16 days in advance and [pixabay](https://pixabay.com).

## Configure the web app

To run the webapp, open a terminal window and go to the working directory.

Make sure you have node v12.14.0 installed. If you have a later version and wish to keep it, try installing the node version manager [nvm](https://github.com/nvm-sh/nvm) and then type in the terminal:

```
nvm install 12.14.0
nvm use 12.14.0
```

After than you can install the dependecies included in the _package.json_ file by running the following command:

```
npm install
```

## Run the web app

To try out the web app from scratch, you can try building it and then running it. In order to do this, first delete the _dist_ folder by running in the terminal the following:

```
rm -rf dist
```

Then you can create re-generate this folder by typing:

```
npm run build-prod
```

And finally, you can start the server by typing:

```
npm run start
```

At this point, you can run the web app by going in the browser to the [Travel App](http://localhost:3000/)

## Environment variable - API Keys

```
Create a .env file in the root directory.
```

```
Add environment-specific variables on new lines in the form of REACT_APP_VARIABLE_NAME.
```

```
Very Important! Changing any environment variables will require you to restart the development server if it is running.
```

```
Go back to your server and console.log (process.env) and you should see that everything that’s in the .env file it’s in there in the console
```

```
Which means that in the code you can go ahead and change the API key, so you can pull the key from the environment variable and it’s no longer in the code.
## Test the web app

The webapp can be tested using the jest framework. In order to do this, once the server is up and running, simply go to [Travel App](http://localhost:3000/) and in a new terminal window (not where the server is running), type:
```

npm run test

```


```
