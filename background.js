const saveExtractedText = (data) => {
    alert("saving text");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/endpoint", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    var result = xhr.responseText;
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
