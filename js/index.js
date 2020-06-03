const $ = (el) => {
  return document.querySelector(el);
};

const $$ = (el) => {
  return document.querySelectorAll(el);
};

//Create servises list

const servises = [
  { title: "Ручное бронирование", amount: 11 },
  { title: "Пакетные туры", amount: 3 },
  { title: "Отели", amount: 1 },
];

const servicesList = $(".profile__services-list");

const servisesItem = servises.map((item) => {
  return `<div class="item">
    <div class="item-title">${item.title}</div>
    <div class="item-progress" data-progress=${item.amount}></div>
    <div class="item-amount">${item.amount}</div>
  </div>`;
});

servicesList.innerHTML = servisesItem.join("");

// All servises
const servisesAllAmount = $(".all-amount");
const allAmount = servises.reduce((acc, item) => acc + item.amount, 0);
servisesAllAmount.innerHTML = allAmount;

//Progress

const progressItem = $$(".item-progress");
[...progressItem].map((item) => {
  let procent = ((item.dataset.progress / allAmount) * 100).toFixed(0);
  if (procent < 50) {
    item.classList.add("item-progress--blue");
  } else {
    item.classList.add("item-progress--green");
  }
  item.style.width = `${procent}%`;
});

//Submit form

const submit = $(".reviews__sumbit");
const text = $(".reviews__field");
const list = $(".reviews__list");
const commentNumbers = $(".comment-amount span");

const userName = "Антон Яновский";
let date = new Date();
const month = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь	",
];

let nowDate = `${date.getDate()} ${
  month[date.getMonth()]
} ${date.getFullYear()}`;

const generateReviews = (comment) => {
  let html = `
  <div class="reviews__block">
    <div class="header">
      <div class="header__name">${userName}</div>
      <div class="header__date">${nowDate}</div>
    </div>
    <div class="reviews__body">
      ${comment}
    </div>
  </div>
  `;
  list.innerHTML += html;
};

const addComment = () => {
  if (text.value.trim().length > 0) {
    generateReviews(text.value);
  }
  commentNumbers.innerHTML = +commentNumbers.innerHTML + 1;
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  addComment();
});

text.addEventListener("keydown", function (e) {
  if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
    addComment();
  }
});
