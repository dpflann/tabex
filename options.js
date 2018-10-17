'use strict';
// Saves options to chrome.storage
function save_options() {
    var slackWebHookUrl = document.getElementById("slackWebHookUrl").value;
    var endpointUrl = document.getElementById("endpointUrl").value;
    chrome.storage.local.set({
        "slackWebHookUrl": slackWebHookUrl,
        "endpointUrl": endpointUrl
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.local.get({
        "slackWebHookUrl": "<SLACK_NOT_SET>",
        "endpointUrl": "<ENDPOINT_NOT_SET>"
    }, function(items) {
        document.getElementById('slackWebHookUrl').value = items.slackWebHookUrl;
        document.getElementById('endpointUrl').value = items.endpointUrl;
    });
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save').addEventListener('click', save_options);
    restore_options()});
