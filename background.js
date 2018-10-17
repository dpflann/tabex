const saveExtractedText = (data) => {
    chrome.storage.local.get(["slackWebHookUrl", "endpointUrl"], exportTabs(data));
};

const exportTabs = function(data) {
    return function(endpoints) {
        for (var endpoint in endpoints) {
            exportToEndpoint(data, endpoint, endpoints[endpoint]);
        }
    }
}

const exportToEndpoint = (data, endpoint, endpointUrl) => {
    var xhr = new XMLHttpRequest();
    switch (endpoint) {
        case "slackWebHookUrl":
            if (endpointUrl != "") {
                xhr.open("POST", endpointUrl, true);
                data = forSlack(data);
            }
            break;
        case "endpointUrl":
            if (endpointUrl != "") {
                data = forEndpoint(data);
                xhr.open("POST", endpointUrl, true);
            }
            break;
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    var result = xhr.responseText;
}

const forEndpoint = (data) => {
    return data
};

const forSlack = (data) => {
    var slackAttachmentPayload = {
            "text": "Exported Tabs...",
            "attachments": []
        };
    var slackAttachments = [];
    var colorForSubmission = getRandomColorHex();
    for (var i = 0; i < data.length; i++) {
        slackAttachments.push(slackAttachment(colorForSubmission, data[i]));
    }
    slackAttachmentPayload["attachments"] = slackAttachments;
    return slackAttachmentPayload
};

const slackAttachment = (color, tabData) => {
    return {
        "color": color,
        "author_link": "",
        "author_icon": "",
        "title": tabData.title,
        "title_link": tabData.url,
        "text": tabData.description.length > 0 ? "*Description*: " + tabData.description : "",
        "image_url": tabData.faviconUrl,
        "thumb_url": tabData.faviconUrl,
        "footer": "Another TabEx Export",
        "footer_icon": tabData.faviconUrl,
        "ts": Date.now() / 1000
    }
};

const getRandomColorHex = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        switch (request.message) {
            case 'save_text': {
                saveExtractedText(request.data);
                break;
            }
            default:
        }
    }
);
