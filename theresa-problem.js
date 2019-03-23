function rewrite(content) {
	var rewritten = content.replace(/there is a/ig, "Theresa");
	rewritten = rewritten.replace(/\bmay\b/g, "May");
	rewritten = rewritten.replace(/\bthere is\b/g, "Theresa");
	rewritten = rewritten.replace(/\bbrexit\b/g, "breakfast");
	rewritten = rewritten.replace(/\bBrexit\b/g, "Breakfast");
	return rewritten;
}

function runForTag(tag) {
	var elements = document.getElementsByTagName(tag);
	for (i in elements) {
		var e = elements[i]
		if (e && e.innerText)
			e.innerText = rewrite(e.innerText);
	}
}

function run() {
	runForTag('h1');
	runForTag('h2');
	runForTag('h3');
	runForTag('p');
}

function handle(message) {
	if (message.type == 'state' && message.isEnabled) {
		if (document.readyState === "complete")
			run();
		else
			window.addEventListener("load", run, false);
	} else if (message.type == 'state_changed') {
		window.location.reload();	
	}
}

if (chrome) {
	chrome.runtime.onMessage.addListener(handle);
	chrome.runtime.sendMessage({ 'type': 'state_query' }, {}, handle);
}
else {
	browser.runtime.onMessage.addListener(handle);
	browser.runtime.sendMessage({ 'type': 'state_query' }).then(handle);
}
