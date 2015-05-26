$(document).ready(function(){
loadNews(country);
$("#status").html("<img src='http://i.stack.imgur.com/Pi5r5.gif' />");
var country = "";

function loadNews(country){
	switch(country){
		case 'us':
			country = ".com";
			break;
		case 'uk':
			country = ".co.uk";
			break;
		case 'ca':
			country = ".ca";
			break;
		case 'aus':
			country = ".com.au";
			break;
		case 'afr':
			country = ".co.za";
			break;
		case 'pk':
			country = ".com.pk";
			break;
		default:
			country = ".co.in";
	}
		
	$("#status").html("<img src='http://i.stack.imgur.com/Pi5r5.gif' />");
		$.ajax({
				url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=20&q=http://news.google' + country + '/news?output=rss',
				"type": "GET",
				cache: false,
				"dataType": "jsonp",
				})
			.done(
				function (data, textStatus) {
				for(var cnt in data['responseData'].feed['entries']){
					$("#page-news").append(
					"<div class='news-box'>" + 
							"<div class='news-title'>" + 
								data['responseData'].feed['entries'][cnt]['title'] + 
							"</div>" +
							"<div class='news-content'>" + 
								data['responseData'].feed['entries'][cnt]['content'] +
							"</div>" + 
					"</div>");
				}
				var srcArr = []; var newSrc ="";
				if(window.location.protocol == "file:"){
					$('#page-news img').each(function(){
						if($(this).attr('src') != undefined){
						newSrc = "http:" + $(this).attr('src');
						}
						srcArr.push($(this).attr("src",newSrc));
					});
					$('#page-news a').each(function(){
						$(this).attr("target","_blank");
					});
				}
				$("#page-news").slideDown( "slow" );
				$("#status").html('');
				});
	}
$("#refresh").click(function(){
	$("#page-news").hide();
	$("#status").html("<img src='http://i.stack.imgur.com/Pi5r5.gif' />");
	$("#page-news").html('');
	loadNews($(".active").attr('id'));
});

$(".country-selection").click(function(){
	$("#page-news").hide();
	$("#page-news").html('');
	$(".country-selection").removeClass("active");
	var this_country = $(this).attr('id');
	$("#" + this_country).addClass("active");
	loadNews(this_country);
});


$("#auto").change(function(){
	var loading_time = document.getElementById("auto").value;
	if(loading_time > 0 ){
		alert("News will automatically refresh in " + loading_time/100 + " minutes.");
	}
	var interval = setInterval(function(){
		$("#page-news").hide();
		$("#page-news").html('');
		loadNews($(".active").attr('id'));
			var d = new Date();
			document.getElementById("update-info").innerHTML = "Last Updated on " + d.toLocaleTimeString();
			console.log("Last updated on " + d.toLocaleTimeString());
	}, loading_time * 60 * 10);
	if(loading_time == 0){
		clearInterval(interval);
	}
});

});