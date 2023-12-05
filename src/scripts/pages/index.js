"use strict";


let recipeModels = [];

/**
 * Init dropdowns of search tags
 */
function initDropdowns() {

    const dropdownIngredientsModel = dropdownTemplate('Ingrédient', 'ingredient', ingredientsSet);
    const dropdownAppliancesModel = dropdownTemplate('Appareils', 'appliance', appliancesSet);
    const dropdownUstensilsModel = dropdownTemplate('Ustensiles', 'ustensil', ustensilsSet);

    const dropdownsSpan = document.querySelector('#dropdowns-search');

    dropdownsSpan.appendChild(dropdownIngredientsModel.getDropdownDOM());
    dropdownsSpan.appendChild(dropdownAppliancesModel.getDropdownDOM());
    dropdownsSpan.appendChild(dropdownUstensilsModel.getDropdownDOM());
}

function updateNumberRecipes(numberRecipes) {
    const nbRecipesP = document.querySelector('#nb-recipes');
    nbRecipesP.textContent = `${numberRecipes} recettes`;
}

/**
 * Init x recipes in the gallery of recipes cards
 */
function initRecipes() {
    const recipesSection = document.querySelector('#gallery-recipes');

    for(let i = 1; i < recipes.length; i++) {
        const recipeModel = recipeTemplate(i);
        recipeModels.push(recipeModel);
        const recipeCardDOM = recipeModel.getRecipeDOM();

        recipesSection.appendChild(recipeCardDOM);
    }

    updateNumberRecipes(recipeModels.length);
}

/**
 * Update recipe section with new sorted list of recipes
 *
 * @param {array} filteredRecipeModels - list of recipe model sorted
 */
function updateRecipes(filteredRecipeModels) {
    const recipesSection = document.querySelector('#gallery-recipes');

    recipesSection.innerHTML = '';

    if(filteredRecipeModels.length === 0) {
        const searchText = searchBar.value;

        recipesSection.textContent = `Aucune recette ne contient ' ${searchText} ' vous pouvez cherchez ' tarte aux pommes ', ' poisson ', etc.`;
    } else {
        for(let recipeModel of filteredRecipeModels) {
            const recipeCardDOM = recipeModel.getRecipeDOM();
            recipesSection.appendChild(recipeCardDOM);
        }
    }

    updateNumberRecipes(filteredRecipeModels.length);
}

/**
 * Index main function
 */
function init() {
    initIngredientsSet();
    initAppliancesSet();
    initUstensilsSet();

    initDropdowns();

    initRecipes();
}

init();
