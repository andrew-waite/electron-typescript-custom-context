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
    const folderElementId = '#' + lastClickedElement + ' span';
    
    if (command == 'rename') {
        console.log(folderElementId);

        //Add contenteditable to the span and focus the elemtn
        $(folderElementId).attr('contenteditable', 'true');
        $(folderElementId).trigger('focus');

        //When user presses enter accept the input and stop editing the element
        $(folderElementId).on('keydown', function (event: JQuery.Event) {
            if (event.key == 'Enter') {
                event.preventDefault();
                $(folderElementId).removeAttr("contenteditable");
                //Remove the event listener so we dont get duplicates when a person renames the element again
                $(folderElementId).off('keydown');
            }
        });

        //When user clicks away from the element (i.e content editing done)
        $(folderElementId).one('blur', function() {
            console.log("Finished editing");
            $(folderElementId).removeAttr("contenteditable");
        });
    }
});