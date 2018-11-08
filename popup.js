// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function exportTabs(e) {
    for (var i = 0; i < tabObjects.length; i++) {
        tabObjects[i].description = document.getElementById(tabObjects[i].id + "_description").value;
    }
    var desc = document.getElementById("textarea_group_description").value;
    chrome.runtime.sendMessage({ message: "save_text", data: {"description": desc, "tabs": tabObjects}});
}

chrome.runtime.onMessage.addListener(
    (request, sender, senderResponse) => {
        switch (request.message) {
            case 'export_complete': {
                // Relay back success and failure
                var exportButton = document.getElementById("dumpTabs");
                exportButton.style.backgroundColor = "#aaccdd";
                exportButton.textContent = "Exported!";
                setTimeout(function() {
                    window.close();
                }, 750);
                break;
            }
            default:
        }
    }
);

var tabController = {};
var dumpTabs = {};
var tabObjects = [];
var options = {};
var modal = {};
var span = {};


document.addEventListener('DOMContentLoaded', function () {
    tabController = document.getElementById("tabController");
    tabObjects = [];
    var groupDescriptionDiv = document.createElement("div");
    groupDescriptionDiv.setAttribute("id", "div_group_description");
    groupDescriptionDiv.style['background-color'] = '#eeeeee';
    var groupDescription = document.createElement("textarea");
    var groupDescriptionTitle = document.createTextNode("Overall Description");
    groupDescriptionDiv.appendChild(groupDescriptionTitle);
    groupDescriptionDiv.appendChild(groupDescription);
    groupDescription.setAttribute("id", "textarea_group_description");
    tabController.appendChild(groupDescriptionDiv);
    chrome.tabs.query({currentWindow: true}, function(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            var tabData = {
                "id": "div-tab-" + i,
                "title": tabs[i].title,
                "url": tabs[i].url,
                "faviconUrl": tabs[i].faviconUrl,
                "description": ""
            };
            var div = document.createElement("div");
            div.setAttribute("id", tabData.id);
            var tabDataNode = document.createTextNode(tabData.title);
            var description = document.createElement("textarea");
            description.setAttribute("id", tabData.id + "_description");
            div.appendChild(tabDataNode);
            div.appendChild(description);
            tabController.appendChild(div);
            tabObjects.push(tabData);
        }
    });
    dumpTabs = document.getElementById('dumpTabs');
    dumpTabs.addEventListener('click', exportTabs);
    options = document.getElementById('go-to-options');
    options.addEventListener('click', function() {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });
});

