var BB = {}


/*** Data Files ***/
Ti.include('data/beer_styles.js');
Ti.include('data/grains.js');
Ti.include('data/hops.js');
Ti.include('data/prototypes.js');
Ti.include('data/yeasts.js');
/*** ---------- ***/


/*** Modules and Plugins ***/
Ti.include('vendor/hash.js');
/*** ---------- ***/


/*** Class Includes ***/
Ti.include('lib/utilities.js');
Ti.include('lib/modal_picker.js');

	//Recipe
	Ti.include('lib/recipe/stats.js');
	Ti.include('lib/recipe/character.js');
	Ti.include('lib/recipe/setup.js');
	Ti.include('lib/recipe/grains.js');
	Ti.include('lib/recipe/hops.js');
	Ti.include('lib/recipe/fermentation.js');
	Ti.include('lib/recipe/delivery.js');
	Ti.include('lib/recipe/_recipe.js');

Ti.include('lib/menu.js');
/*** ---------- ***/


//Application File
Ti.include('lib/beer_builder.js');