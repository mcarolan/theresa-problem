var browser = browser || chrome;
let enabled = true;

function stateMessage() {
	console.log('sending state message');
  return { 'type': 'state', isEnabled: enabled };
}

function stateChangedMessage() {
	console.log('sending state changed message');
	return { 'type': 'state_changed' };
}

function sendStateChangedMessages(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, stateChangedMessage());
    }
}

function extensionButtonClicked() {
    enabled = !enabled;
    let iconPath = enabled ? 'icons/icon-48.png' : 'icons/icon-48-disabled.png';
    
    if (chrome) {
	browser.browserAction.setIcon({ path: iconPath }, () => {
	    browser.tabs.query({}, sendStateChangedMessages);
        });
    } else {
	browser.browserAction.setIcon({ path: iconPath }).then(() => {
	    browser.tabs.query({}).then(sendStateChangedMessages);
    	});
    }

}

function onReceiveMessage(message, sender, sendResponse) {
  if (message.type == 'state_query') {
    sendResponse(stateMessage());
  }
}

browser.browserAction.onClicked.addListener(extensionButtonClicked);
browser.runtime.onMessage.addListener(onReceiveMessage);

