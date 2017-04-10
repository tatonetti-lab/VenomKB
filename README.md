# README
A web app version of VenomKB knowledge base for aggregating and identifying therapeutic uses of animal venoms and venom compounds.

## Installing the app

0. ```npm install```
0. Configure mongo

## Mongo DB setup

Local mongo

Mongo in the cloud
Don't do this step 

schema definitions



## Running the app

There are two ways to run the app.

0. ```npm start```
0. ```mongod``` to start the mongo service if you are using a local server. ... add configuration file ... goto mongodb setup 
0. ```npm run "api"``` to start the api.

## Test it
```
npm test
```

## View It
http://localhost:3000/protein

## Build it
```
npm run "build" and the files will be deposited into the /index/dist/ folder
```

## Reserved Files

Folder contains .eslintrc, .eslintignore and .babelrc files in addition to .gitignore. These fiels are to provide linting instructions, ignore files for linting and ensure babel uses ES2015 and React transforms respectively. 

http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6/


Features:

* ES6 - 7 Support with Babel
* Redux dev tools to help you keep track of the app's state
* Routing
* hot module replacement support so you can change modules or react components without having to reload the browser
* a webpack production config so you can build the app and make it ready for production
* Sass support, just import your styles wherever you need them (and to add Bootstrap support)
* ESLINT to keep your js readable