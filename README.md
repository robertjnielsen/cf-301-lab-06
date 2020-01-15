# City Explorer

#### Code Fellows 301 - Lab 06: City Explorer Back-End

**Version**: 1.0.0  
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

### APIs

###### LocationIQ

**Link**: [locationiq.com](https://locationiq.com/)

## Change Log

**01/14/2020 - 1056**: Dependencies configured, inital route defined. Deployed to a Heroku dyno located at: (https://rjn-city-explorer.herokuapp.com/)  
**01/14/2020 - 1137**: Enabled users to query a location, and return a map of the location based on latitude and longitude data provided by a LocationIQ API.

## Credits and Collaborations

## Assignment: User Stories & Timeline

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
**Time Complete**:
**Total Time Required To Complete**:
