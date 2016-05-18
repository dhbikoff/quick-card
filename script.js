var url;
chrome.storage.sync.get('url', function(items) {
  url = items.url;
});

document.addEventListener('DOMContentLoaded', inputListener);

function inputListener() {
  document.getElementById('card').onkeyup = function (event) {
    if (event.keyCode === 13) {
      getCard();
    }
  };
}

function getCard() {
  var cardElem, card, builtUrl;

  cardElem = document.getElementById('card');
  card = cardElem.value;

  if (!card) {
    return;
  }

  card = card.replace(' ', '-');

  if (!url) {
    missingUrl();
    return;
  }

  builtUrl = buildUrl(url, card);

  chrome.tabs.create({
    url: builtUrl
  });
}

function buildUrl(url, card) {
  var cardUrl;

  if (url.endsWith('/')) {
    url = url.substring(0, url.length-1);
  }

  cardUrl = url + '/browse/' + card.toUpperCase();

  if (url.startsWith('http')) {
    return cardUrl;
  } else {
    return 'https://' + cardUrl;
  }
}

function missingUrl() {
  document.getElementById('status').className = '';
  document.getElementById('message').textContent = 'Please add your Jira url in the options menu';
}


