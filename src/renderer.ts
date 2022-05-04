// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
var lastClickedElement = '';

$(document).on('contextmenu', 'li', function(e) {
    e.preventDefault();
    lastClickedElement = this.id
    window.contextBridgeApi.send('show-context-menu', e.originalEvent);
});

// window.addEventListener('contextmenu', (e) => {
//     e.preventDefault()
//     window.contextBridgeApi.send('show-context-menu', e);
// });

window.contextBridgeApi.receive('context-menu-command', (event, command) => {
    if (command == 'menu-item-1') {
        console.log(this.lastClickedElement);
    }
});