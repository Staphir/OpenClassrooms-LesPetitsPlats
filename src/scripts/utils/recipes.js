"use strict";

const ingredientsSet = new Set();
const appliancesSet = new Set();
const ustensilsSet = new Set();

/**
* Fill the set of ingredients 
*/
function initIngredientsSet() {
    for(let recipe of recipes) {
        for(let ingredientDescription of recipe['ingredients']) {
            ingredientsSet.add(ingredientDescription['ingredient']);
        }
    }
}

/**
* Fill the set of appliances
*/
function initAppliancesSet() {
    for(let recipe of recipes) {
        appliancesSet.add(recipe['appliance']);
    }
}

/**
* Fill the set of ustensils 
*/
function initUstensilsSet() {
    for(let recipe of recipes) {
        for(let ustensil of recipe['ustensils']) {
            ustensilsSet.add(ustensil);
        }
    }
}

/**
* Get recipe with specific id in database
*
* @param {int} id - recipe id
* @returns {object} - recipe object in recipes database
*/
function getRecipeById(id) {
    const recipeObject = recipes.find((recipe) => recipe.id === id);
    
    return recipeObject;
}

/**
* Search if text is in title, ingredients or description
*
* @returns {boolean}
*/
function searchTextInRecipe(recipeModel) {
    let searchText = searchBar.value;
    searchText = searchText.toLowerCase();
    
    if(recipeModel.name.toLowerCase().includes(searchText)) {
        return true;
    }

    for(let ingredientDescription of recipeModel.ingredients) {
        if(ingredientDescription['ingredient'].toLowerCase().includes(searchText)) {
            return true;
        }
    }
    
    if(recipeModel.description.toLowerCase().includes(searchText)) {
        return true;
    }
    
    return false;
}
