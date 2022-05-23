// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

let lastClickedElement = '';

$(document).on('contextmenu', 'li', function(e) {
    e.preventDefault();
    lastClickedElement = this.id;
    window.contextBridgeApi.send('show-context-menu', e.originalEvent);
});

window.contextBridgeApi.receive('context-menu-command', (event, command) => {
    if (command == 'menu-item-1') {
        console.log(lastClickedElement);
        const text = $('#' + lastClickedElement + ' span').text();
        const renameHtml = `<input type="text" id="input${lastClickedElement}" value="${text}" required minlength="1" maxlength="20" size="10">`;
        $('#' + lastClickedElement + ' span').replaceWith(renameHtml);
    }
});

$(document).on('click', (event) => {
    let inputElement = $('#input' + lastClickedElement);
    if (!inputElement[0].contains(event.target)) {
        inputElement.replaceWith(`<span>${inputElement.val()}</span>`);
    }
});