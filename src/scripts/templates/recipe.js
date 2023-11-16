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
