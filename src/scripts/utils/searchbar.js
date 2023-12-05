"use strict";

const searchButton = document.querySelector('#search-button');
const searchBar = document.querySelector('#search-keyword');
const crossSearchBar = document.querySelector('#cross-search-bar');
const searchIcon = document.querySelector('#search-icon')

/**
 * Change color of search button and icon when mouse over it
 */
function searchButtonColorOver() {
    searchButton.classList.add('bg-yellow')
    searchIcon.classList.add('text-black');
    searchIcon.classList.remove('text-white');
}

/**
 * Change color of search button and icon when mouse leave it
 */
 function searchButtonColorLeave() {
    searchButton.classList.remove('bg-yellow')
    searchIcon.classList.remove('text-black');
    searchIcon.classList.add('text-white');
}

/**
 * Display/hide button erase search text 
 */
function toggleCrossButton() {
    crossSearchBar.classList.toggle('invisible');
}

/**
 * Erase text in search bar
 */
function eraseSearchText() {
    crossSearchBar.blur();
    searchBar.value = '';
    searchRecipes();
}

/**
 * Filter recipes with search bar and tags
 */
function searchRecipes() {
    event.preventDefault();

    let filteredRecipeModels = [];

    if(searchBar.value.length > 2) {
        for(let recipeModel of recipeModels) {
            if(searchTextInRecipe(recipeModel)) {
                filteredRecipeModels.push(recipeModel);
            }
        }
    } else {
        for(let recipeModel of recipeModels) {
            filteredRecipeModels.push(recipeModel);
        }
    }

    filterByTags(filteredRecipeModels)
}

searchButton.addEventListener('mouseover', searchButtonColorOver);
searchButton.addEventListener('mouseleave', searchButtonColorLeave);
searchButton.addEventListener('click', searchRecipes);

searchBar.addEventListener('focus', toggleCrossButton);
searchBar.addEventListener('blur', toggleCrossButton);
searchBar.addEventListener('input', () => {
    if(searchBar.value.length > 2 || searchBar.value.length === 0) { 
        searchRecipes()
    }
});

crossSearchBar.addEventListener('mousedown', eraseSearchText);
