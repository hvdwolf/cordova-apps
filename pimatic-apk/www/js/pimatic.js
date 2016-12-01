//DEFINE THE CONNECTION
var host = '192.168.xxx.yyy';
var port = 80;
var user = 'admin';
var pass = 'PASSWORD';

var socket = io.connect('http://'+host+':'+port+'?username='+user+'&password='+pass, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  timeout: 20000,
  forceNew: true
});


var currentPage = '';
var pages;
var devices = {};
var groups = {};
//var pages = JSON.parse(localStorage.pages);
//var devices = JSON.parse(localStorage.devices);
//createPages();

//MESSAGE ON CONSOLE WHEN CONNECTED
socket.on('connect', function() {
  console.log('Connection to Pimatic API Established');
});
//SHOW ALL EVENTS ON CONSOLE
socket.on('event', function(data) {
  console.log(data);
});
//MESSAGE ON CONSOLE WHEN DISCONNECTED
socket.on('disconnect', function(data) {
  console.log('Connection to Pimatic API lost, reconnecting...');
});

socket.on('pages', function(data){
  console.log(data);
  pages = data;
  createPages();
});

socket.on('groups', function(data){
   $.each(data, function( index, value ){
	  groups[value.id] = value;
	});
	console.log(groups); 
});


socket.on('devices', function(data){
  $.each(data, function( index, value ){
	  devices[value.id] = value;
	});
	console.log(devices);  
});

socket.on('deviceAttributeChanged', function(data) {
  	devices[data.deviceId].attributes[0].value = data.value;
  	
  	if(data.attributeName == 'dimlevel'){
  		$("#"+data.deviceId).val(data.value);
  	}
  	if(data.attributeName == 'state'){
	  	$("#"+data.deviceId).prop('checked', data.value);
  	}
 });

function createPages(){
	var items = '';
	$.each(pages, function( index, value ){
		items += '<li><a href="devices.html" data-page="devices" onclick="getPage(\''+index+'\')" class="item-link"><div class="item-content"><div class="item-inner"><div class="item-title">'+value.name+'</div></div></div></a></li>';
	});
	
	$('#pimatic-pages').html(items);	
}

function getPage(id){
	currentPage = id;
}

function showDevice(id){
	var data = devices[id];
	var type = data.template;
	var value = data.attributes[0].value;
	
	
	if(type == 'switch'){
		var selected = '';
		if(value){
			selected = 'checked';
		}
		return '<li><div class="item-content"><div class="item-inner"><div class="item-title label">'+data.name+'</div><div class="item-input"><label class="label-switch"><input type="checkbox" '+selected+' id="'+id+'" onchange="toggleSwitch(\''+id+'\')"><div class="checkbox"></div></label></div></div></div></li>';
	}
	if(type == 'dimmer'){
		return '<li><div class="item-content"><div class="item-inner"><div class="item-title label">'+data.name+'</div><div class="item-input"><div class="range-slider"><input onchange="setDimLevel(\''+id+'\')" id="'+id+'" value="'+value+'" type="range" min="0" max="100" step="1"></div></div></li>';
	}
	return '';
}

function toggleSwitch(id){
	var value = 'off';
	if($('#' + id).is(":checked")){
		value = 'on';
	}
	socket.emit('call', {
        id: 'executeAction-1',
        action: 'executeAction',
        params: {
            actionString: 'turn '+id+' '+ value
        }
    });
}

function setDimLevel(id){
	
	var value = $('#'+id).val();
	socket.emit('call', {
        id: 'executeAction-1',
        action: 'executeAction',
        params: {
            actionString: 'dim ' +id+ ' to '+value
        }
    });
}
