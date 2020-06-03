"use strict";

var $ = function $(el) {
  return document.querySelector(el);
};

var $$ = function $$(el) {
  return document.querySelectorAll(el);
};

//Create servises list

var servises = [{ title: "Ручное бронирование", amount: 11 }, { title: "Пакетные туры", amount: 3 }, { title: "Отели", amount: 1 }];

var servicesList = $(".profile__services-list");

var servisesItem = servises.map(function (item) {
  return "<div class=\"item\">\n    <div class=\"item-title\">" + item.title + "</div>\n    <div class=\"item-progress\" data-progress=" + item.amount + "></div>\n    <div class=\"item-amount\">" + item.amount + "</div>\n  </div>";
});

servicesList.innerHTML = servisesItem.join("");

// All servises
var servisesAllAmount = $(".all-amount");
var allAmount = servises.reduce(function (acc, item) {
  return acc + item.amount;
}, 0);
servisesAllAmount.innerHTML = allAmount;

//Progress

var progressItem = $$(".item-progress");
Array.prototype.slice.call(progressItem).map(function (item) {
  var procent = (item.dataset.progress / allAmount * 100).toFixed(0);
  if (procent < 50) {
    item.classList.add("item-progress--blue");
  } else {
    item.classList.add("item-progress--green");
  }
  item.style.width = procent + "%";
});

//Submit form

var submit = $(".reviews__sumbit");
var text = $(".reviews__field");
var list = $(".reviews__list");
var commentNumbers = $(".comment-amount span");

var userName = "Антон Яновский";
var date = new Date();
var month = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь	"];

var nowDate = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();

var generateReviews = function generateReviews(comment) {
  var html = "\n  <div class=\"reviews__block\">\n    <div class=\"header\">\n      <div class=\"header__name\">" + userName + "</div>\n      <div class=\"header__date\">" + nowDate + "</div>\n    </div>\n    <div class=\"reviews__body\">\n      " + comment + "\n    </div>\n  </div>\n  ";
  list.innerHTML += html;
};

var addComment = function addComment() {
  if (text.value.trim().length > 0) {
    generateReviews(text.value);
  }

  commentNumbers.innerHTML = +commentNumbers.innerHTML + 1;
};

submit.addEventListener("click", function (e) {
  e.preventDefault();
  addComment();
  text.value = "";
});

text.addEventListener("keydown", function (e) {
  if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
    addComment();
    text.value = "";
  }
});