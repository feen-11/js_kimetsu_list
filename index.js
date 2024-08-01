const apiDomain = 'https://ihatov08.github.io/kimetsu_api/api/';
const apiUrlList = {
  all: `${apiDomain}all.json`,
  hashira: `${apiDomain}hashira.json`,
  oni: `${apiDomain}oni.json`,
  kisatsutai: `${apiDomain}kisatsutai.json`,
};

const radioButtons = document.querySelectorAll('input');
const jsKimetsuList = document.getElementById('js-kimetsu-list');
const loading = document.getElementById('loading');

async function getKimetsuInfo(apiUrl) {
  showLoading(loading);
  clearItem(jsKimetsuList);
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        console.error('エラーレスポンス', response);
      } else {
        response.json().then((characters) => {
          characters.map((character) => {
            createItem(character);
          });
        });
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      hideLoading(loading);
    });
}

function clearItem(target) {
  while (target.firstChild) {
    target.removeChild(target.firstChild);
  }
}

function showLoading(target) {
  target.style.display = 'flex';
}

function hideLoading(target) {
  target.style.display = 'none';
}

function createItem(data) {
  const characterInfo = document.createElement('li');

  const name = document.createElement('h2');
  name.textContent = data.name;

  const category = document.createElement('p');
  category.textContent = data.category;

  const image = document.createElement('img');
  image.setAttribute('src', `https://ihatov08.github.io${data.image}`);

  characterInfo.appendChild(name);
  characterInfo.appendChild(category);
  characterInfo.appendChild(image);
  jsKimetsuList.appendChild(characterInfo);
}

getKimetsuInfo(apiUrlList.all);

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('click', () => {
    const url = apiUrlList[radioButton.value];
    getKimetsuInfo(url);
  });
});
