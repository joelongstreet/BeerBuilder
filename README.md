# Beer Builder :beer:

## About
Beer Builder is an iPhone app that assists brewers in quickly prototyping new beer recipes. The application will rely on an API who's current repository lives at [https://github.com/albatrocity/BeerBuilder-API](https://github.com/albatrocity/BeerBuilder-API)

## Testing
To run tests, you'll need to have node and npm installed. Install mocha globally `npm install mocha -g` and chai locally `npm install chai`. To run tests :  `mocha --compilers coffee:coffee-script -R spec`

## Compiling

### CoffeeScript
Beer Builder is written in [CoffeeScript](http://coffeescript.org). To compile written coffeescript, ensure you are in the root of the project and run the following command: `coffee -c -w -o Resources/ src/`. This will compile coffeescript source files, to build the actual project you'll need Titanium Studio SDK and XCode installed.

### Titanium
This project is compiled using [Appcelerator's Titanium Studio](http://www.appcelerator.com/). Appcelerator is a fickle beast and strange things can happen if you're using alternate versions of the SDK. For the best results use Titanium SDK 2.0.1.GA2. This application does not yet rely on any third party tools so I'll probably upgrade as new versions of Titanium are released.