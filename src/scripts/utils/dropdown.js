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
 * Filter recipe by tags
 *
 * @param {Array} filteredRecipeModels - recipe models filtered by searchbar text
 */
function filterByTags(filteredRecipeModels) {
    let sortedIngredients = new Set();
    let sortedAppliances = new Set();
    let sortedUstensils = new Set ();

    let newFilteredRecipeModels = []

    // const ingredientFilterTags = document.querySelector('#ingredient-tags').childNodes;
    const ingredientFilterTags = document.querySelectorAll('.ingredient-tag');
    let ingredientFilterTagsNames = [];
    // const applianceFilterTags = document.querySelector('#appliance-tags').childNodes;
    const applianceFilterTags = document.querySelectorAll('.appliance-tag');
    let applianceFilterTagsNames = [];
    // const ustensilFilterTags = document.querySelector('#ustensil-tags').childNodes;
    const ustensilFilterTags = document.querySelectorAll('.ustensil-tag');
    let ustensilFilterTagsNames = [];

    ingredientFilterTags.forEach(ingredientFilterTag => {
        ingredientFilterTagsNames.push(ingredientFilterTag.textContent);
    });

    applianceFilterTags.forEach(applianceFilterTag => {
        applianceFilterTagsNames.push(applianceFilterTag.textContent);
    });

    ustensilFilterTags.forEach(ustensilFilterTag => {
        ustensilFilterTagsNames.push(ustensilFilterTag.textContent);
    });

    filteredRecipeModels.forEach(recipeModel => {
        let ingredientsNames = [];

        recipeModel.ingredients.forEach(ingredientDescr => {
            let {ingredient} = ingredientDescr;
            ingredientsNames.push(ingredient);
        })

        if(ingredientFilterTagsNames.every(ingredientName => ingredientsNames.includes(ingredientName))) {

            if(ustensilFilterTagsNames.every(ustensil => recipeModel.ustensils.includes(ustensil))) {

                if(applianceFilterTagsNames.every(appliance => recipeModel.appliance.includes(appliance))) {
                    ingredientsNames.forEach(ingredientName => {
                        sortedIngredients.add(ingredientName);
                    })

                    recipeModel.ustensils.forEach(ustensil => {
                        sortedUstensils.add(ustensil);
                    })
                    sortedAppliances.add(recipeModel.appliance);

                    newFilteredRecipeModels.push(recipeModel);
                }
            }
        }
    });

    updateDropDowns(sortedIngredients, sortedAppliances, sortedUstensils);
    updateRecipes(newFilteredRecipeModels);
}