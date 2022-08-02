import '../scss/style.scss';
import {Select} from'./select/select';


new Select();








/*
let searchInput = document.querySelector("input");
let listMenu = document.querySelector(".listMenu");
let wrapper = document.querySelector(".wrapper");
let cardList = {
  Name: [],
  Owner: [],
  Stars: []
}

function clearListMenu (childs) {
  while (childs[0]) childs[0].remove();
}

const debounce = (fn, debounceTime) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout (() => {
      fn.apply(this, args);
    }, debounceTime)
  }
}

function getResults (url) {
  if (!searchInput.value) return;
  fetch(url)
    .then (responce => responce.json())
    .then (responce => {
      clearListMenu(listMenu.children);
      for (let i = 0; i<5; i++) {
        if (responce.items[i]) {
          cardList.Name[i] = responce.items[i].name;
          cardList.Owner[i] = responce.items[i].owner.login;
          cardList.Stars[i] = responce.items[i].stargazers_count;
          let li = document.createElement('li');
          li.innerText = responce.items[i].name;
          li.id = i;
          listMenu.appendChild(li);
        }
      }
    })
    .catch (error => console.log(`Во время выполнения запроса возникла ошибка: ${error}`))
}

const debouncedFn = debounce(getResults, 1000);

searchInput.addEventListener("input", () => {
  const url = `https://api.github.com/search/repositories?q=${searchInput.value}`
  debouncedFn(url)
  if (!searchInput.value.length) {
    clearListMenu(listMenu.children);
  }
})

listMenu.addEventListener("click", (event) => {
  clearListMenu(listMenu.children);
  searchInput.value = "";
  let cardListKeys = Object.keys(cardList);
  let div = document.createElement('div');
  div.classList.add('card')
  if (event.target.id) {
    wrapper.appendChild(div);
  }

  let ul = document.createElement('ul');
  div.appendChild(ul);

  cardListKeys.forEach ((el) =>{
    let li = document.createElement('li');
    li.innerText = `${el}: ${cardList[el][event.target.id]}`;
    ul.appendChild(li);
  })

  let image = document.createElement('img')
  image.src  = 'images/crossing.svg'
  div.appendChild(image);

  image.addEventListener("click", (event) => {
    image.parentElement.remove();
  })
})
*/











