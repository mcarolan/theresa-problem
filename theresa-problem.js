function rewrite(content) {
	var rewritten = content.replace(/there is a/ig, "Theresa");
	rewritten = rewritten.replace(/\bmay\b/g, "May");
	rewritten = rewritten.replace(/\bthere is\b/g, "Theresa");
	rewritten = rewritten.replace(/\bbrexit\b/g, "breakfast");
	rewritten = rewritten.replace(/\bBrexit\b/g, "Breakfast");
	rewritten = rewritten.replace(/\bBrexiter\b/ig, "Breakfaster");
	rewritten = rewritten.replace(/\bBrexiteer\b/ig, "Breakfasteer");
	rewritten = rewritten.replace(/\bBrextremist\b/ig, "Breakfastremeist");
	rewritten = rewritten.replace(/\bBrextremists\b/ig, "Breakfastremeists");
	return rewritten;
}

function runForTag(tag) {
	var elements = document.getElementsByTagName(tag);
	for (i in elements) {
		var e = elements[i]
		if (e && e.innerHTML)
			e.innerHTML = rewrite(e.innerHTML);
	}
}

function links() {
	var elements = document.getElementsByTagName("a");
	for (i in elements) {
		var e = elements[i]
		if (e && e.children && e.children.length == 0 && e.innerText)
			e.innerText = rewrite(e.innerText);
	}
}

function run() {
	runForTag('h1');
	runForTag('h2');
	runForTag('h3');
	runForTag('p');
	runForTag('span');
	runForTag('a');
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
