# Beer Builder :beer:

## Titanium
This project is compiled using [Appcelerator's Titanium Studio](http://www.appcelerator.com/). Appcelerator is a fickle beast and strange things can happen if you're using alternate versions of the SDK. For the best results use Titanium SDK 2.0.1.GA2. This application does not yet rely on any third party tools so I'll probably upgrade as new versions of Titanium are released.

## Compiling 
Beer Builder is written in [CoffeeScript](http://coffeescript.org). To compile and watch, cd into /BeerBuilder/Resources and run the following command: `coffee -c -w -o lib src`

## More Information
Features and project status are tracked on a [public Trello board](https://trello.com/board/beer-builder/4fb469d6250c221b0bb71b10)

## Code

### Modal Picker
Use the modal picker to generate a screen for editing ingredients. The modal consumes the lower 85% of the screen and accepts two data types - picker and range.
	[
		{
			type 		: picker, date-picker, range
			callback 	: function(type, id, quantity)
			[data] 		: array
			[value] 	: string

			//if type == range
			min			: number - min value for range
			max			: number - max value for range
		},
		...
	]