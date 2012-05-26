BB.recipe 				= 
	icon 				: '/img/builder.png'
	title 				: 'Builder'
	tab_group			: Ti.UI.createTabGroup()

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
BB.recipe.tabs 	= [
	Ti.UI.createTab(
		window 			: new BB.RecipeSetup()
		title 			: 'Setup'
	),
	Ti.UI.createTab(
		window 			: new BB.RecipeGrains()
		title 			: 'Grains'
	),
	Ti.UI.createTab(
		window 			: new BB.RecipeHops()
		title 			: 'Hops'
	),
	Ti.UI.createTab(
		window 			: new BB.RecipeFermentation()
		title 			: 'Fermentation'
	),
	Ti.UI.createTab(
		window 			: new BB.RecipeDelivery()
		title 			: 'Delivery'
	)
]
## -------------------- ##


## Build Recipe Tab Group ##
BB.recipe.tab_group.addTab 	BB.recipe.tabs[0]
BB.recipe.tab_group.addTab 	BB.recipe.tabs[1]
BB.recipe.tab_group.addTab 	BB.recipe.tabs[2]
BB.recipe.tab_group.addTab 	BB.recipe.tabs[3]
BB.recipe.tab_group.addTab 	BB.recipe.tabs[4]
## -------------------- ##


## Add in Shared View ##
for tab in BB.recipe.tabs
	tab.addEventListener 'focus', ->
		@window.add BB.recipe.views.stats
## -------------------- ##