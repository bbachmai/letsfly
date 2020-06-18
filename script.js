var map;
var popup_closed = 1;
function createMap () {
	var options = {
		center: { lat: 47.42, lng: 11.65 },
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	map = new google.maps.Map(document.getElementById('map'), options);
	
	var points_script = document.createElement('script');
	points_script.src = 'points.js';
	document.getElementsByTagName('head')[0].appendChild(points_script);
	
	var therm_on = document.getElementById('therm');
	var wave_on = document.getElementById('wave');
	
	if (therm_on.checked == true) {
		var routes_script = document.createElement('script');
		routes_script.src = 'routes_therm.js';
		document.getElementsByTagName('head')[0].appendChild(routes_script);
	}
	
	if (wave_on.checked == true) {
		var routes_wave_script = document.createElement('script');
		routes_wave_script.src = 'routes_wave.js';
		document.getElementsByTagName('head')[0].appendChild(routes_wave_script);
	}
	
	map.data.setStyle({
	icon: 'points_icon.png',
	strokeWeight: 7.0,
	clickable: true
	});
	
	map.data.addListener('mouseover',function(event) {
	if (popup_closed == 1) {
		var popup = new google.maps.InfoWindow({
			content:
			event.feature.getProperty("name"),
			position: event.latLng,
			pixelOffset: new google.maps.Size(-5,-5)
		});
		popup.open(map);
		popup_closed = 0;	
	}
	setTimeout(function(){popup.close();popup_closed = 1;},'800');
	});
	
	map.data.addListener('click',function(event) {
		if (event.feature.getProperty("address")) {
		window.open(event.feature.getProperty("address"), '_blank');
		};
	});
}
	
function knausr_pts_callback (geojson) {
	map.data.addGeoJson(geojson);
}	

function knausr_routes_callback (geojson) {
	map.data.addGeoJson(geojson);
}	
