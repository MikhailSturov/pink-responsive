"use strict";

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var pageHeader = document.querySelector(".page-header");

navMain.classList.remove('main-nav--nojs');
navMain.classList.add('main-nav--closed');
pageHeader.classList.remove("page-header--nav");

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
    if (pageHeader.classList.contains("page-header--nav")) {
      pageHeader.classList.remove("page-header--nav");
    } else {
      pageHeader.classList.add("page-header--nav");
    };

  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
    pageHeader.classList.remove("page-header--nav");
  }
});

