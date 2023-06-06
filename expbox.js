

document.getElementById('expbox-on').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var message = { type: "expbox", data: { type: "summary" } };
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
});

document.getElementById('expbox-off').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var message = { type: "expbox", data: { type: "remove_summary" } };
        chrome.tabs.sendMessage(tabs[0].id, message);

    });
});
