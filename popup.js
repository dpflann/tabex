// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {
    alert(e.target.id);
}

function exportTabs(e) {
    alert("Export tabs");
    chrome.runtime.sendMessage({ message: "save_text", data: tabObjects});
}

var tabController = {};
var dumpTabs = {};
var tabObjects = [];

document.addEventListener('DOMContentLoaded', function () {
  tabController = document.getElementById("tabController");
  tabObjects = [];
  chrome.tabs.query({currentWindow: true}, function(tabs) {
      for (let i = 0; i < tabs.length; i++) {
          var tabData = {
              "title": tabs[i].title,
              "url": tabs[i].url,
              "faviconUrl": tabs[i].faviconUrl,
              "description": ""
          };
          var div = document.createElement("div");
          var tabDataNode = document.createTextNode(tabData.title);
          div.appendChild(tabDataNode);
          tabController.appendChild(div);
          tabObjects.push(tabData);
      }
  });
  tabController.addEventListener('click', click);
  dumpTabs = document.getElementById('dumpTabs');
  dumpTabs.addEventListener('click', exportTabs);
});

