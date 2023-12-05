"use strict";


/**
 * Remove select tag sort
 */
function unselectTag() {
    let category = "";
    if(this.parentElement.classList.contains('ingredient-tag')) {
        category = 'ingredient';
    } else if(this.parentElement.classList.contains('appliance-tag')) {
        category = 'appliance';
    } else {
        category = 'ustensil';
    }

    const tagDivId = this.parentElement.textContent.replace(/[\s()']/g, '');
    const tagDiv = document.querySelector(`#${tagDivId}`);
    const choicesUl = document.querySelector(`#${category}-list`)

    const tagLi = document.createElement('li');

    tagLi.className = `${category} px-4 py-1 hover:bg-${category} truncate cursor-pointer`;
    tagLi.textContent = this.parentElement.textContent;
    tagLi.addEventListener('click', selectTag);

    choicesUl.appendChild(tagLi);

    tagDiv.remove();

    searchRecipes();
}

/**
* Add tag sort and remove it to dropdown
*/
function selectTag() {
    let category = "";
    if(this.classList.contains('ingredient')) {
        category = 'ingredient';
    } else if(this.classList.contains('appliance')) {
        category = 'appliance';
    } else {
        category = 'ustensil';
    }

    const tagsDiv = document.querySelector(`#selected-tags`);

    const tagDiv = document.createElement('div');
    const crossI = document.createElement('i');

    tagDiv.id = this.textContent.replace(/[\s()']/g, '');
    tagDiv.className = `${category}-tag bg-${category} rounded-xl border-none p-4`;
    tagDiv.textContent = this.textContent;

    crossI.className = 'fa-solid fa-xmark fa-lg text-black ml-14 cursor-pointer';
    crossI.addEventListener('mousedown', unselectTag);

    tagDiv.appendChild(crossI);
    tagsDiv.appendChild(tagDiv);

    searchRecipes();
}

function updateDropDowns(sortedIngredients, sortedAppliances, sortedUstensils) {
    const dropdownIngredientsModel = dropdownTemplate('Ingrédient', 'ingredient', sortedIngredients);
    const dropdownAppliancesModel = dropdownTemplate('Appareils', 'appliance', sortedAppliances);
    const dropdownUstensilsModel = dropdownTemplate('Ustensiles', 'ustensil', sortedUstensils);

    const dropdownsSpan = document.querySelector('#dropdowns-search');

    dropdownsSpan.innerHTML = '';

    dropdownsSpan.appendChild(dropdownIngredientsModel.getDropdownDOM());
    dropdownsSpan.appendChild(dropdownAppliancesModel.getDropdownDOM());
    dropdownsSpan.appendChild(dropdownUstensilsModel.getDropdownDOM());
}

/**
 * Check if tags are in filter tags
 *
 * @param {Array} filterTagsNames
 * @param {Array} tagsArray
 * @returns {boolean}
 */
function tagsinFilterTags(filterTagsNames, tagsArray) {
    for(let filterTag of filterTagsNames) {
        if(!includes(tagsArray, filterTag)) {
            return false;
        }
    }
    return true;
}

/**
 * Filter recipe by tags
 *
 * @param {Array} filteredRecipeModels - recipe models filtered by searchbar text
 */
function filterByTags(filteredRecipeModels) {
    let sortedIngredients = new Set();
    let sortedAppliances = new Set();
    let sortedUstensils = new Set ();

    let newFilteredRecipeModels = []

    const ingredientFilterTags = document.querySelectorAll('.ingredient-tag');
    let ingredientFilterTagsNames = [];

    const applianceFilterTags = document.querySelectorAll('.appliance-tag');
    let applianceFilterTagsNames = [];

    const ustensilFilterTags = document.querySelectorAll('.ustensil-tag');
    let ustensilFilterTagsNames = [];

    for(let ingredientFilterTag of ingredientFilterTags) {
        ingredientFilterTagsNames.push(ingredientFilterTag.textContent);
    }

    for(let applianceFilterTag of applianceFilterTags) {
        applianceFilterTagsNames.push(applianceFilterTag.textContent);
    }

    for(let ustensilFilterTag of ustensilFilterTags) {
        ustensilFilterTagsNames.push(ustensilFilterTag.textContent);
    }

    for(let recipeModel of filteredRecipeModels) {
        let ingredientsNames = [];

        for(let ingredientDescr of recipeModel.ingredients) {
            let {ingredient} = ingredientDescr;
            ingredientsNames.push(ingredient);
        }

        if(tagsinFilterTags(ingredientFilterTagsNames, ingredientsNames)) {
        
            if(tagsinFilterTags(ustensilFilterTagsNames, recipeModel.ustensils)) {

                if(tagsinFilterTags(applianceFilterTagsNames, [recipeModel.appliance])) {

                    for(let ingredientName of ingredientsNames) {
                        sortedIngredients.add(ingredientName);
                    }

                    for(let ustensil of recipeModel.ustensils) {
                        sortedUstensils.add(ustensil);
                    }

                    sortedAppliances.add(recipeModel.appliance);

                    newFilteredRecipeModels.push(recipeModel);
                }
            }
        }
    }

    updateDropDowns(sortedIngredients, sortedAppliances, sortedUstensils);
    updateRecipes(newFilteredRecipeModels);
}
