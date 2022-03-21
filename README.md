### Beautiful Tabs

Beautitab is a simple Chrome extension that displays a beautiful image from Unsplash every time you open a new tab.

## Setup
Clone this repository to your filesystem:
`git clone https://github.com/Ecksdee03/beautitabs-chrome-extension`

`cd` into the project folder and open it in your text editor.

Replace `YOUR_ACCESS_KEY` with the API access key you can get for free from [Unsplash](https://unsplash.com/oauth/applications), under new applications.

You may use your own icon and add it in the icons folder, saving the icons as their sizes - e.g. 16.png, 128.png, etc.

## Publishing your Chrome Extension
Follow the steps detailed in this guide to publish your extension to the Chrome web store. A Google account is required

## Tips for debugging
Chrome extensions use the same debugging workflow as regular web pages, but they have some unique properties you need to be aware of. 

To debug your background script, head to the chrome extensions page at chrome://extensions and ensure Developer mode is enabled. 

Next, find your extension and click background page under inspect views. This will open a DevTools window for debugging purposes. Be sure to reload the extension first!