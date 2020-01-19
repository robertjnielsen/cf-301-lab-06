# City Explorer

#### Code Fellows 301 - Labs 06, 07, 08: City Explorer Back-End

**Version**: 1.2.7  
**Author**: Robert James Nielsen  
**Contact**: [robert.j.nielsen@outlook.com](mailto:robert.j.nielsen@outlook.com)

## Overview

City Explorer is a web app devoted to helping you discover more around the city of your choice!  
Just enter in a city, and City Explorer will show you a detailed map, daily weather, local events and more!

## Getting Started

## Architecture

### Dependencies

_Note_: All `npm` links listed below are direct to the release version required in **City Explorer**.

###### Express.js

**Version**: 4.17.1  
**Links**:  
[expressjs.com](https://expressjs.com/)  
[GitHub](https://github.com/expressjs)  
[npm](https://www.npmjs.com/package/express/v/4.17.1)

###### dotenv

**Version**: 8.2.0  
**Links**:  
[GitHub](https://github.com/motdotla/dotenv)  
[npm](https://www.npmjs.com/package/dotenv/v/8.2.0)

###### cors

**Version**: 2.8.5  
**Links**:  
[GitHub](https://github.com/expressjs/cors)  
[npm](https://www.npmjs.com/package/cors/v/2.8.5)

###### superagent

**Version**: 5.2.1  
**Links**:  
[GitHub](https://github.com/visionmedia/superagent)  
[npm](https://www.npmjs.com/package/superagent/v/5.2.1)

###### pg

**Version**: 7.17.1
**Links**:
[node-postgres](https://node-postgres.com/)  
[GitHub](https://github.com/brianc/node-postgres/tree/master/packages/pg)  
[npm](https://www.npmjs.com/package/pg/v/7.17.1)

### APIs

###### LocationIQ

**Link**: [LocationIQ](https://locationiq.com/)

###### DarkSky

**Link**: [DarkSky API](https://darksky.net/dev)

###### Eventful

**Link**: [Eventful API](http://api.eventful.com/)

## Change Log

**01/18/2020 - 1755**: App re-deployed to Heroku to include Heroku PostgreSQL database.  
**01/18/2020 - 1744**: Location data now stores in PostgreSQL database for quick reference.  
**01/18/2020 - 1440**: Updated with Eventful API to handle location event queries.  
**01/16/2020 - 1050**: Created database shchema, and connected server to database.  
**01/15/2020 - 2104**: Updated with DarkSky API to handle location weather data.  
**01/15/2020 - 1140**: Refactored locationHandler to utizlize API queries.  
**01/15/2020 - 1015**: Refactored '/weather' route to utizlize .map() functionality.  
**01/14/2020 - 1836**: Included error handling for bad responses and poor choices per the user input.  
**01/14/2020 - 1815**: Included data file representing API call to parse and render local weather.  
**01/14/2020 - 1137**: Enabled users to query a location, and return a map of the location based on latitude and longitude data provided by a LocationIQ API.  
**01/14/2020 - 1056**: Dependencies configured, inital route defined. Deployed to a Heroku dyno located at: (https://rjn-city-explorer.herokuapp.com/)

## Credits and Collaborations

[Andrew Kyllo](https://github.com/kyllo34)  
[Blandine Dasilveira](https://github.com/blandine12)

## Assignment: User Stories & Timeline

### Lab 06

#### Feature Task #1: Repository Set Up

**Estimated Time To Completion**: Approx 1 hour.  
**Time Started**: 0930  
**Time Complete**: 1010  
**Total Time Required To Complete**: 40 minutes.

#### Feature Task #2: Locations

**As A User**: I want to enter the name of a location so that I can see data about the area of interest to me.  
**Given**: That a user enters a valid location in the input;  
**When**: The user clicks the "Explore!" button;  
**Then**: The map will be populated with the location centered on the latitude and longitude of the search query.

**Estimated Time To Completion**: Approx 1 hour.  
**Time Started**: 1056  
**Time Complete**: 1137  
**Total Time Required To Complete**: Approx 40 minutes.

#### Feature Task #3: Weather

**As A User**: I want to request current weather information so that I can learn more about the typical weather patterns in the location I entered.  
**Given**: That a user enters a valid location in the input;  
**When**: The user clicks the "Explore!" button;  
**Then**: The weather forcast for the upcoming eight days will be displayed in the browser.

**Estimated Time To Completion**: Approx 1 hour and 30 minutes.  
**Time Started**: 1226  
**Time Complete**: 1815  
**Total Time Required To Complete**: Almost 6 hours.

#### Feature Task #4: Errors

**As A User**: I want clear messages if something goes wrong so I know if I need to make any changes or try again in a different manner.  
**Given**: That a user does not enter a valid location in the input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The user will receive an error message on the page and the data will not be rendered properly.

**Estimated Time To Completion**: Approx 30 minutes.
**Time Started**: 1823  
**Time Complete**: 1836  
**Total Time Required To Complete**: 13 minutes.

### Lab 07

#### Feature Task #1: Data Formatting

**As A User**: I want the application to provide properly formatted data so that I can view similar data for any location that I choose.  
**Given**: That a user enters a valid location in the input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The data will be rendered in the same format every time.

**Estimated Time To Completion**: Approx 30 minutes.  
**Time Started**: 1000  
**Time Complete**: 1015  
**Total Time Required To Complete**: 15 minutes.

#### Feature Task #2: Locations

**As A User**: I want to enter the name of a location so that I do not need to look up the latitute and longitude every time I learn about a new location.  
**Given**: That a user enteres a valid location input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The map will be populated with the location centered on the latitude and longitude of the search query.

**Estimated Time To Completion**: Approx 2 hours.  
**Time Started**: 1048  
**Time Complete**: 1140  
**Total Time Required To Complete**: Less than 1 hour.

#### Feature Task #3: Weather

**As A User**: I want to request current weather information at any location, so that I can learn more about the typical weather patterns in the area of interest.  
**Given**: That a user enteres a valid location input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The weather forecast for the upcoming eight days will be displayed in the browser.

**Estimated Time To Completion**: Approx 2 hours.  
**Time Started**: 1140  
**Time Complete**: 2104  
**Total Time Required To Complete**: Approx 9 hours and 20 minutes.

#### Feature Task #4: Events

**As A User**: I want to request information about events in the area, so that I can learn about what is taking place there.  
**Given**: That a user enteres a valid location input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The first twenty events hosted in the area will be displayed in the browser.

**Estimated Time To Completion**: Approx 1 hour.  
**Time Started**: 1310  
**Time Complete**: 1440  
**Total Time Required To Complete**: 1 hour and 30 minutes.  

### Lab 08

#### Feature Task #1: Database

**As A User**: I want the application to perform quickly, so that I can search for locations frequently and reliably.  
**Given**:Tthat a user enters a **new** valid location in the input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The results will be requested from each individual API, if not previously cached.  
**Then**: The results will be cached in a SQL database for future retrieval.

**Given**: That a user enters a **previously-used** valid location in the input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The location results will be loaded from a SQL database.

**Given**: That a user does enters an **invalid** location in the input.  
**When**: The user clicks the "Explore!" button.  
**Then**: The location information will not be displayed.

**Estimated Time To Completion**: Approx 1 hour.  
**Time Started**: 0930  
**Time Complete**: 1050  
**Total Time Required To Complete**: 1 hour and 20 minutes.

#### Feature Task #2: Server

**Estimated Time To Completion**: Approx 30 minutes.  
**Time Started**: 1710  
**Time Complete**: 1744  
**Total Time Required To Complete**: 34 minutes.

#### Feature Task #3: Deploy

**Estimated Time To Completion**: 30 minutes.  
**Time Started**: 1750  
**Time Complete**: 1755  
**Total Time Required To Complete**: 5 minutes.  

### Lab 09

#### Feature Task #1: Movies

**As A User**: I want to request information about movies that are connected to the area, so that users can learn more about the location.  

**Estimated Time To Completion**: 30 minutes.  
**Time Started**: 1830  
**Time Complete**:  
**Total Time Required To Complete**:  