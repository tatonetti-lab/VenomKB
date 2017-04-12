# README
A web app version of VenomKB - a knowledge base for aggregating and identifying therapeutic uses of animal venoms and venom compounds.

## Installing the app

0. ```npm install```
0. Configure mongo

## MongoDB setup

Currently, the database is on an unsecured AWS EC2 server located at mongodb://54.198.136.17/venomkb-staging

Once things are tightened up a bit, we will secure this.



## Running the app

There are two ways to run the app:

0. ```npm start```
0. ```mongod``` to start the mongo service if you are using a local server. ... add configuration file ... goto mongodb setup 
0. ```npm run "api"``` to start the api.

## Run tests
```
npm test
```

## View database records

List of proteins - http://localhost:3000/proteins
Single protein - http://localhost:3000/proteins/P000001745 {issue: throws error for a runtime error}

## Build it

```
`npm run build` and the files will be deposited into the /index/dist/ folder
```

## Reserved Files

Folder contains .eslintrc, .eslintignore and .babelrc files in addition to .gitignore. These fiels are to provide linting instructions, ignore files for linting and ensure babel uses ES2015 and React transforms respectively. 

http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6/


### Features

* ES6 - 7 Support with Babel
* Redux dev tools to help you keep track of the app's state
* Routing
* hot module replacement support so you can change modules or react components without having to reload the browser
* a webpack production config so you can build the app and make it ready for production
* Sass support, just import your styles wherever you need them (and to add Bootstrap support)
* ESLINT to keep your js readable