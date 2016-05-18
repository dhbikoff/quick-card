function save_options() {
  chrome.storage.sync.set({
    url: document.getElementById('url').value
  }, function() {
    var savedStatus = document.getElementById('saveStatus');
    savedStatus.textContent = "\u2714";
  });
}

function restore_options() {
  chrome.storage.sync.get({
    url: ''
  }, function(items) {
    var url = document.getElementById('url');
    
    if (items.url) {
      url.value = items.url;
    } else {
      url.setAttribute('placeholder', 'https://jira.yourcompany.com');  
    }
  });
}

function urlInputListener() {
  document.getElementById('url').onkeyup = function (event) {
    if (event.keyCode === 13) {
      save_options();
    }
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', urlInputListener);

document.getElementById('save').addEventListener('click', save_options);
