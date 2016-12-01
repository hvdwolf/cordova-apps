var myApp = new Framework7({
  material: true //enable Material theme
})

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
});


myApp.onPageInit('devices', function (page) {

  $('#pageTitle').text(pages[currentPage].name);
  var page_id = pages[currentPage].id;
  var devices_output = '';
  $.each(pages[currentPage].devices, function( index, value ) {
	  	var device = getObjects(devices, 'id', value.deviceId);
		  var id = device[0].id;
		  //console.log(type);
			devices_output += showDevice(id);
		
	});
	devices_output += '';
	$('#devices-content').html(devices_output);
});


function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}