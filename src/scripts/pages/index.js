"use strict";

/**
 * Transform set to dictionnary with each key is index
 *
 * @param {Set} set
 * @returns {object} dict
 */
function setToDict(set) {
    const dict = {};
    let index = 0;

    for(let item of set) {
        dict[index] = item;
        index += 1;
    }

    return dict;
}

/**
 * Init dropdowns of search tags
 */
function initDropdowns() {
    const ingredientChoices = setToDict(ingredientsSet);
    const applianceChoices = setToDict(appliancesSet);
    const ustensilChoices = setToDict(ustensilsSet);    

    const dropdownIngredientsModel = dropdownTemplate('Ingrédient', 'ingredient', ingredientChoices);
    const dropdownAppliancesModel = dropdownTemplate('Appareils', 'appliance', applianceChoices);
    const dropdownUstensilsModel = dropdownTemplate('Ustensiles', 'ustensil', ustensilChoices);

    const dropdownsSpan = document.querySelector('#dropdowns-search');

    dropdownsSpan.appendChild(dropdownIngredientsModel.getDropdownDOM());
    dropdownsSpan.appendChild(dropdownAppliancesModel.getDropdownDOM());
    dropdownsSpan.appendChild(dropdownUstensilsModel.getDropdownDOM());
}

/**
 * Index main function
 */
function init() {
    initIngredientsSet();
    initAppliancesSet();
    initUstensilsSet();

    initDropdowns();
}

init();
