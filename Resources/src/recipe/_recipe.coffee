BB.recipe 				= 
	icon 				: '/img/builder.png'
	title 				: 'Builder'

## Build Recipe Classes ##
BB.recipe.stats 		= new BB.RecipeStats()
BB.recipe.character 	= new BB.RecipeCharacter()
BB.recipe.ingredients 	=
	grains 				: []
	hops 				: []
	yeasts 				: []
## -------------------- ##


## Build Global Recipe Views ##
BB.recipe.views 		=
	stats 				: BB.recipe.stats.build_screen()
	#character 			: BB.recipe.character.build_screen()
## -------------------- ##


## Build Recipe Tabs ##
BB.recipe.tabs 	=
	setup				: Ti.UI.createTab
		window 			: new BB.RecipeSetup()
		title 			: 'Setup'
	grains				: Ti.UI.createTab
		window 			: new BB.RecipeGrains()
		title 			: 'Grains'
	hops				: Ti.UI.createTab
		window 			: new BB.RecipeHops()
		title 			: 'Hops'
	fermentations		: Ti.UI.createTab
		window 			: new BB.RecipeFermentation()
		title 			: 'Fermentation'
	delivery			: Ti.UI.createTab
		window 			: new BB.RecipeDelivery()
		title 			: 'Delivery'
## -------------------- ##


## Build Recipe Tab Group ##
BB.recipe.tab_group		= Ti.UI.createTabGroup()
BB.recipe.tab_group.addTab 	BB.recipe.tabs.setup
BB.recipe.tab_group.addTab 	BB.recipe.tabs.grains
BB.recipe.tab_group.addTab 	BB.recipe.tabs.hops
BB.recipe.tab_group.addTab 	BB.recipe.tabs.fermentations
BB.recipe.tab_group.addTab 	BB.recipe.tabs.delivery
## -------------------- ##