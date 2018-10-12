// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {
    alert(e.target.id);
}

function exportTabs(e) {
    alert("Export tabs");
    alert(tabObjects.length);
    alert(tabObjects);
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
          var div = document.createElement("div");
          var para = document.createElement("p");
          var node = document.createTextNode("URL:" + tabs[i].url);
          tabObjects.push({"URL": tabs[i].url});
          para.appendChild(node);
          div.appendChild(para);
          tabController.appendChild(div);
      }
  });
  tabController.addEventListener('click', click);
  dumpTabs = document.getElementById('dumpTabs');
  dumpTabs.addEventListener('click', exportTabs);
});

