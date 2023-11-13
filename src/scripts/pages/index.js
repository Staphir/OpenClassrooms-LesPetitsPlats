"use strict";

const searchButton = document.querySelector('#search-button');
const searchBar = document.querySelector('#search-keyWord');
const crossSearchBar = document.querySelector('#cross-search-bar');
const searchIcon = document.querySelector('#search-icon')

/**
 * Change color of search button and icon when mouse over it
 */
function searchButtonColorOver() {
    searchButton.classList.add('bg-yellow')
    searchIcon.classList.add('text-black');
}

/**
 * Change color of search button and icon when mouse leave it
 */
 function searchButtonColorLeave() {
    searchButton.classList.remove('bg-yellow')
    searchIcon.classList.remove('text-black');
}

/**
 * Display button erase search text 
 */
function displayCrossButton() {
    crossSearchBar.classList.remove('invisible');
    crossSearchBar.classList.add('visible');
}

/**
 * Hide button erase search text 
 */
function hideCrossutton() {
    crossSearchBar.classList.remove('visible');
    crossSearchBar.classList.add('invisible');
}

/**
 * Erase text in search bar
 */
function eraseSearchText() {
    crossSearchBar.blur();
    searchBar.value = '';
}

searchButton.addEventListener('mouseover', searchButtonColorOver);
searchButton.addEventListener('mouseleave', searchButtonColorLeave);
searchBar.addEventListener('focus', displayCrossButton);
searchBar.addEventListener('blur', hideCrossutton);
crossSearchBar.addEventListener('mousedown', eraseSearchText);
