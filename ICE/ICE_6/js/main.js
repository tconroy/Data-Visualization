// globals
var titleList     = $('#titleList'),
	releaseList   = $('#releaseList'),
	consensusList = $('#consensusList'),
	uri           = "data/sampleData.json";

$(function(){
	init();
});


// collect JSON data via AJAX request. Pass data into loadData function.
var init = function() {
	$.ajax({
		url: uri,
		dataType: "json",
	}).done(loadData);
};

// takes in JSON data object
var loadData = function( data ) {

	for( var i=0; i<data.movies.length; i++ ){
		var thisMovie   = data.movies[i],
			title       = thisMovie.title,
			releaseDate = thisMovie.release_dates.theater,
			consensus   = thisMovie.critics_consensus;

			// random color to represent this entry
			var randColor = '#'+Math.floor(Math.random()*16777215).toString(16);
			
			// send data to display.
			titleList.append("<li style='color:"+randColor+"'>"+title+"</li>");
			releaseList.append("<li style='color:"+randColor+"'>"+releaseDate+"</li>");
			consensusList.append("<li style='color:"+randColor+"'><p>"+consensus+"</p></li>");

	}

};