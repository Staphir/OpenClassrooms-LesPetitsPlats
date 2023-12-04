"use strict";

/**
* Model of dropdown
*
* @param {string} name - Name of dropdown 
* @param {string} idName - Name use for id of elements
* @param {object} choices - Name choices
* @returns {{ name: string; idName: string; choices: object; getDropdownDOM: () => object; }}
*/
function dropdownTemplate(name, idName, choices) {

    /**
    * Display/hide cross button in search bar
    */
    function toggleCrossButton() {
        document.querySelector(`#${idName}-cross-search-bar`).classList.toggle('invisible');
    }

    function searchTextInChoices(choiceName) {
        let searchText = document.querySelector(`#${idName}-keyword`).value;
        searchText = searchText.toLowerCase();

        return choiceName.toLowerCase().includes(searchText)
    }

    function searchTags() {
        event.preventDefault();
        
        let sortedChoices = Array.from(choices).filter(searchTextInChoices);

        const listChoices = document.querySelectorAll(`.${idName}`);
        listChoices.forEach(choice => {
            if(sortedChoices.includes(choice.textContent)) {
                choice.style.display = 'block';
            } else {
                choice.style.display = 'none';
            }
        });
    }
        
    /**
    * Erase text in search bar
    */
     function eraseSearchInput() {
        document.querySelector(`#${idName}-cross-search-bar`).blur();
        document.querySelector(`#${idName}-keyword`).value = '';
        searchTags();
    }

    /**
    * Open/Close dropdown
    */
    function toggleDropdown() {
        const dropdownList = document.querySelector(`#${idName}-list`);
        const dropdownChevron = document.querySelector(`#${idName}-chevron`);
        
        dropdownList.classList.toggle('scale-y-100');
        dropdownList.classList.toggle('scale-y-0');
        
        dropdownChevron.classList.toggle('rotate-180');
    }

    /**
    * Return DOM that create dropdown
    *
    * @returns {object}
    */
    function getDropdownDOM() {
        const mainDiv = document.createElement('div');
        const mainButton = document.createElement('button');
        const chevronI = document.createElement('i');
        const choicesUl = document.createElement('ul');
        const searchBarLi = document.createElement('li');
        const searchBarForm = document.createElement('form');
        const searchBarInput = document.createElement('input');
        const searchBarCrossI = document.createElement('i');
        const searchBarButton = document.createElement('button');
        const searchBarSearchI = document.createElement('i');
        let choicesList = Array();
        
        mainDiv.className = 'w-48';
        
        mainButton.id = `${idName}-dropdown-btn`;
        mainButton.className = 'rounded-xl bg-white border-none p-4 w-full';
        mainButton.addEventListener('click', toggleDropdown);
        mainButton.textContent = name;
        
        chevronI.id = `${idName}-chevron`;
        chevronI.className = 'fa-solid fa-chevron-down ml-14 transition duration-200';
        
        choicesUl.id = `${idName}-list`;
        choicesUl.className = 'bg-white rounded-b-xl border-none w-[192px] max-h-80 -mt-2 overflow-y-scroll absolute origin-top scale-y-0 transition transform duration-300';
        
        searchBarLi.className = 'px-4 pb-5';
        
        searchBarForm.id = `${idName}-search-bar`;
        searchBarForm.className = 'relative';
        
        searchBarInput.id = `${idName}-keyword`;
        searchBarInput.type = 'text';
        searchBarInput.className = 'w-[9.75rem] py-1 text-grey-light border border-grey-light rounded-sm focus:ring-1 focus:ring-grey-light';
        
        searchBarCrossI.id = `${idName}-cross-search-bar`;
        searchBarCrossI.className = 'fa-solid fa-xmark fa-sm text-grey-light absolute inset-y-[1.15rem] right-6 cursor-pointer invisible';
        
        searchBarButton.id = `${idName}-search-button`;
        searchBarButton.className = 'absolute inset-y-[0.4rem] right-0.5';
        
        searchBarSearchI.id = `${idName}-search-icon`;
        searchBarSearchI.className = 'fa-solid fa-magnifying-glass fa-sm text-grey-light';

        choices.forEach(choice => {
            let newChoiceLi = document.createElement('li');
            newChoiceLi.className = `${idName} px-4 py-1 hover:bg-${idName} truncate cursor-pointer`;
            newChoiceLi.textContent = choice;
            newChoiceLi.addEventListener('click', selectTag);
            choicesList.push(newChoiceLi);
        })
        
        mainButton.appendChild(chevronI);
        
        searchBarButton.appendChild(searchBarSearchI);
        
        searchBarForm.appendChild(searchBarInput);
        searchBarForm.appendChild(searchBarCrossI);
        searchBarForm.appendChild(searchBarButton);
        
        searchBarLi.appendChild(searchBarForm);
        
        choicesUl.appendChild(searchBarLi);

        choicesList.forEach(choice => {
            choicesUl.appendChild(choice);
        })
        
        mainDiv.appendChild(mainButton);
        mainDiv.appendChild(choicesUl);
        
        searchBarInput.addEventListener('focus', toggleCrossButton);
        searchBarInput.addEventListener('blur', toggleCrossButton);
        searchBarInput.addEventListener('input', searchTags);
        searchBarCrossI.addEventListener('mousedown', eraseSearchInput);
        searchBarButton.addEventListener('click', () => event.preventDefault());
        
        return mainDiv;
    }
    
    return {
        name,
        idName,
        choices,
        getDropdownDOM,
    };
}