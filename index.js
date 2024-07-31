const allURL = 'https://ihatov08.github.io/kimetsu_api/api/all.json';
const hashiraURL = 'https://ihatov08.github.io/kimetsu_api/api/hashira.json';
const oniURL = 'https://ihatov08.github.io/kimetsu_api/api/oni.json';
const jsKimetsuList = document.getElementById('js-kimetsu-list');
const kisatsutaiURL =
  'https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json';
async function fetchAPI(apiUrl) {
  await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        console.error('エラーレスポンス', response);
      } else {
        response.json().then((characters) => {
          console.log(characters);
          characters.map((character) => {
            console.log(character);
            const characterInfo = document.createElement('li');
            const name = document.createElement('p');
            name.textContent = character.name;
            const category = document.createElement('p');
            category.textContent = character.category;
            const image = document.createElement('img');
            image.setAttribute(
              'src',
              `https://ihatov08.github.io${character.image}`
            );
            characterInfo.appendChild(name);
            characterInfo.appendChild(category);
            characterInfo.appendChild(image);
            jsKimetsuList.appendChild(characterInfo);
          });
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}

const all = fetchAPI(allURL);
// const hashira = fetchAPI(hashiraURL);
// const oni = fetchAPI(oniURL);
// const kisatsutai = fetchAPI(kisatsutaiURL);

// jsonを表示する
// 切り替えボタン（ラジオボタン）設置
// ボタンを押すごとに各API取得をトリガー
// HTML書き換え
// ローディング画面
