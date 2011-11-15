function Hash() {
	this.length = 0;
	this.items = new Array();
	for (var i = 0; i < arguments.length; i += 2) {
		if (typeof(arguments[i + 1]) != 'undefined') {
			this.items[arguments[i]] = arguments[i + 1];
			this.length++;
		}
	}
   
	this.removeItem = function(in_key)
	{
		var tmp_previous;
		if (typeof(this.items[in_key]) != 'undefined') {
			this.length--;
			var tmp_previous = this.items[in_key];
			delete this.items[in_key];
		}
	   
		return tmp_previous;
	}

	this.getItem = function(in_key) {
		return this.items[in_key];
	}

	this.setItem = function(in_key, in_value)
	{
		var tmp_previous;
		if (typeof(in_value) != 'undefined') {
			if (typeof(this.items[in_key]) == 'undefined') {
				this.length++;
			}
			else {
				tmp_previous = this.items[in_key];
			}

			this.items[in_key] = in_value;
		}
	   
		return tmp_previous;
	}

	this.hasItem = function(in_key)
	{
		return typeof(this.items[in_key]) != 'undefined';
	}

	this.clear = function()
	{
		for (var i in this.items) {
			delete this.items[i];
		}

		this.length = 0;
	}
}


function add_to_date(orig_date, increase_by){
	
	//this function expects a string of orig-date
	//it will return a string date in the format of YYYY-MM-DD
	
	var year			= parseInt(orig_date.substring(0, 4));
	var month		= parseInt(orig_date.substring(5, 7));
	var day			= parseInt(orig_date.substring(8, 10));
	var new_date	= new Date();

	new_date.setFullYear(year);
	new_date.setMonth(month);
	new_date.setDate(day + parseInt(increase_by));
	
	var date_string = new_date.getFullYear() + '-' + new_date.getMonth() + '-' + new_date.getDate();
	
	return date_string;
}

function subtract_from_date(orig_date, new_date){
	//TODO - this seems like i made it too complicated...
	//expects two dates in the form of YYYY-MM-DD
	var o_date = {
		year		: parseInt(orig_date.substring(0, 4)),
		month		: parseInt(orig_date.substring(5, 7)),
		day		: parseInt(orig_date.substring(8, 10)),
		new_date : new Date()
	}
	o_date.new_date.setFullYear(o_date.year);
	o_date.new_date.setMonth(o_date.month);
	o_date.new_date.setDate(o_date.day);
	
	var f_date = {
		year		: parseInt(new_date.substring(0, 4)),
		month		: parseInt(new_date.substring(5, 7)),
		day		: parseInt(new_date.substring(8, 10)),
		new_date	: new Date()
	}
	f_date.new_date.setFullYear(f_date.year);
	f_date.new_date.setMonth(f_date.month);
	f_date.new_date.setDate(f_date.day);

	var new_date = f_date.new_date.getTime() - o_date.new_date.getTime();
	var one_day = 1000 * 60 * 60 * 24;
	var days = new_date/one_day;
	
	return days;

}