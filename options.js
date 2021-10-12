function save_options() {
    var url = document.getElementById('baseurl').value;
    chrome.storage.sync.set({
            baseUrl: url
        }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
            status.textContent = '';
            }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
            baseUrl: 'https://github.com/EpicGames/UnrealEngine/blob/release'
        }, function(items) {
            document.getElementById('baseurl').value = items.baseUrl;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
