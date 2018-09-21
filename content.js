var scripts = document.querySelectorAll('script[src]');

function detectPattern(payload,link)
{
	var re = /var _0x[a-z]{1}[0-9]{3}=\["\\x[A-F0-9]{2}\\/gm;
	if( payload.match(re) ){
		alert("Possible Magecart found - "+link);
	}

}

function httpGet(theUrl)
{
	var req = new XMLHttpRequest();
	req.open('GET', theUrl, true);
	req.onreadystatechange = function (aEvt) {
  	if (req.readyState == 4) {
     		if(req.status == 200){
      			detectPattern(req.responseText, theUrl);
		}
	}
	};
	req.send(null);
}

function main()
{
	for (var i = 0; i < scripts.length; i++) {
		httpGet(scripts[i].getAttribute("src"));
	}
}

main();
