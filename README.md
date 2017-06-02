# VenomKB

Web app version of VenomKB - a knowledge base for aggregating and identifying therapeutic uses of animal venoms and venom compounds.

## To-do prior to release of v2.0.0

- [ ] Add support for species images
- [ ] Add support for protein images
- [ ] Integrate literature predications into data views
- [ ] Add "systemic effects" data
- [ ] Add "molecular effects" data
- [ ] Deploy to web

## Installation

```
npm install
```

## MongoDB setup

Currently, the database is on an unsecured AWS EC2 server located at `mongodb://54.221.23.226/venomkb-staging`

Once things are tightened up a bit, we will secure this.

## Running the app

To test the app in developer mode:
```
npm start
```

To build the app for production:
```
npm build
```

The application will be deposited into the `index/dist/` directory.

## Run tests

```
npm test
```

(Note: there currently aren't any tests to run)

## Reserved Files

Folder contains .eslintrc, .eslintignore and .babelrc files in addition to .gitignore. These files are to provide linting instructions, ignore files for linting, and ensure babel uses ES2015 and React transforms respectively. 

http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6/


### Features

* ES6 - 7 Support with Babel
* Redux dev tools to help you keep track of the app's state
* Routing
* hot module replacement support so you can change modules or react components without having to reload the browser
* a webpack production config so you can build the app and make it ready for production
* Sass support, just import your styles wherever you need them (and to add Bootstrap support)
* ESLINT to keep your js readable