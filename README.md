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

After than you can install the dependecies included in the *package.json* file by running the following command:

```
npm install
```

## Run the web app

To try out the web app from scratch, you can try building it and then running it. In order to do this, first delete the *dist* folder by running in the terminal the following:

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

## Test the web app

The webapp can be tested using the jest framework. In order to do this, once the server is up and running, simply go to [Travel App](http://localhost:3000/) and in a new terminal window (not where the server is running), type:
```
npm run test
```


