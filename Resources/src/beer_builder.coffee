## Build Temp Tabs ##
BB.temp_tab 			= Ti.UI.createTab
	window 				: Ti.UI.createWindow()
	title 				: 'Test'
BB.temp_tabs 			= Ti.UI.createTabGroup()
BB.temp_tabs.addTab BB.temp_tab
BB.temp  				=
	icon 				: '/img/fixer.png'
	title 				: 'Fixer'
	tab_group 			: BB.temp_tabs
BB.temp2  				=
	icon 				: '/img/efficiency.png'
	title 				: 'Efficiency'
	tab_group 			: BB.temp_tabs
BB.temp3  				=
	icon 				: '/img/abv.png'
	title 				: 'ABV'
	tab_group 			: BB.temp_tabs
BB.temp4  				=
	icon 				: '/img/me.png'
	title 				: 'My Recipes'
	tab_group 			: BB.temp_tabs
BB.temp5  				=
	icon 				: '/img/discover.png'
	title 				: 'Discover'
	tab_group 			: BB.temp_tabs
## -------------------- ##


## Build Menu ##
BB.menu 				= new BB.Menu [
	BB.recipe,
	BB.temp,
	BB.temp2,
	BB.temp3,
	BB.temp4,
	BB.temp5
]
## -------------------- ##

BB.menu.open()