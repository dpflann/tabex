# tabex

## Introduction
tabex is a Chrome extension for extracting data (e.g. URLs) from the tabs in the current, active window.
tabex can be configured to send this data to an endpoint for processing.

## Architecture and Design
tabex uses Chrome's popup browser action to take up real-estate on the toolbar
to create an interface that displays information about the tabs in the current,
active window. It uses the `activeTab` and `tabs` permissions
to access tab data. Tab data is used in the view created via `popup.html`; each tab is listed in
its own div in the view. `popup.html` uses `popup.js` to dynamically add the tab data
to `popup.html` and to add event listeners to the view for interaction with the tab
data and the `Export Tabs` button. `Export Tabs` uses Chrome's runtime messaging to
send the tab data to be used in `background.js`. `background.js` is a background script
that listens for runtime messages, and it will send the tab data as JSON over an
asynchronous HTTP POST to the configured endpoint or endpoints.

### Views
#### Popup
The popup view presents the each tab in a div, displaying the tab's title at the top
followed by a textarea for providing a description or notes about the tab's content.

#### Options
The options view presents two fields for setting the URLs for endpoint(s) to which the tab data will be sent.

For example:
- The is a field for a generic endpoint that is expects the request format specified below.
- The is a field for a Slack webhook URL endpoint to which tab data is sent using Slack's concept of message attachments.


### Request Format
The format of the request is:

```
{
    "description": "<description for the group of exported tabs">,
    "tabs": [
        {
            "title": "<title>", // obtained from the tab
            "url": "<url>", // obtained from the tab
            "faviconUrl": "<faviconUrl>", // obtained from the tab
            "description": "<description>" // user input
        }
        ...
    ]
}
```

### References
1. https://developer.chrome.com/extensions/tabs#type-Tab

### Supporting Additional Endpoints
tabex can be configured to send tab datat to different endpoints, such as Slack.
Currently, the Slack support allows posting of each tab as an "attachment".
See this Slack documenation for more information: https://api.slack.com/docs/message-attachments

Each tab's data is sent as an attachment.


# Installation
Currently, as this project is in active development, the main way to install and to use the extension is load the unpacked extension into Chrome.
The following Google documentation provides steps to add this developmental-stage extension to your instance of Chrome:

1. https://developer.chrome.com/extensions/getstarted

The gist is:
1. Clone this repo to wherever you would like.
2. Open Chrome to its extensions views: `chrome://extensions`.
3. Toggle `Develope Mode` to `On`.
4. Select `Load Unpacked`
5. Locate the repo for this project, and select it.
6. The extension should now be loaded and usable: verify by looking for the absence of errors, a "card" for the "TabEx" extension, and the presence of the TabEx icon in the Chrome toolbar.
7. Click the `Details` link in the `chrome://extensions` view then scroll down to select "Extension options" or click the TabEx icon then select `Options` to configure your endpoints.

