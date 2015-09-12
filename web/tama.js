
var lastseq=0;
var tamaCanvas=Array();


function drawTama(id, tama) {
	var ctx;
	if (tamaCanvas.length<=id) {
		var c=new Element('canvas', {
			'height': 320,
			'width': 480
		});
		c.inject($("tamas"));
		tamaCanvas[id]=c;
	}
	ctx=tamaCanvas[id].getContext("2d");
	ctx.fillStyle="#efffe0";
	ctx.fillRect(0,0,480,320);
	var p=0;
	for (y=0; y<32; y++) {
		for (x=0; x<48; x++) {
			var c=tama.pixels.substr(p++, 1);
			if (c=='A') ctx.fillStyle="#efffe0";
			if (c=='B') ctx.fillStyle="#A0B090";
			if (c=='C') ctx.fillStyle="#707058";
			if (c=='D') ctx.fillStyle="#102000";
			ctx.fillRect(x*10, y*10, 9, 9);
		}
	}
}

function updateTama() {
	var myReq=new Request.JSON({
		method: 'get',
		url: 'gettama.php',
		onSuccess: function(respJson, respTxt) {
			setTimeout("updateTama()", 100);
			if (respTxt!="") { //yeah, dirty hack
				lastseq=respJson.lastseq;
					for (var i=0; i<respJson.tama.length; i++) {
					drawTama(respJson.tama[i].id, respJson.tama[i]);
				}
			}
		},
		onError: function(text, err) {
			//Just try again in a while.
			setTimeout("updateTama()", 500);
		}
	});
	myReq.get({"lastseq": lastseq});
}


window.addEvent('domready', function() {
	updateTama();
});
