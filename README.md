# README
A web app version of VenomKB knowledge base for aggregating and identifying therapeutic uses of animal venoms and venom compounds.

## Installing the app

0. ```npm install```
0. Configure mongo


## Running the app

0. ```npm start```
0. ```mongod``` to start the mongo service if you are using a local server.
0. ```npm run "api"``` to start the api.

## Test it
```
npm test
```

## Build it
```
npm run "build" and the files will be deposited into the /index/dist/ folder
```

## Reserved Files

Folder contains .eslintrc, .eslintignore and .babelrc files in addition to .gitignore. These fiels are to provide linting instructions, ignore files for linting and ensure babel uses ES2015 and React transforms respectively. 

http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6/