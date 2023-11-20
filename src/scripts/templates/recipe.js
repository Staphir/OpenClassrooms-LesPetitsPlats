"use strict";

/**
* Recipe model
*
* @param {int} id - Recipe id in database
* @returns {{ id: int; name: string; image: string; time: int; description: string; ingredients: object; getRecipeDOM: () => object; }}
*/
function recipeTemplate(id) {
    const {
        name, image, time, description, ingredients
    } = getRecipeById(id);
    
    function getRecipeDOM() {
        const cardArticle = document.createElement('article');
        const img = document.createElement('img');
        const timeDiv = document.createElement('div');
        const textSection = document.createElement('section');
        const title = document.createElement('h3');
        const descriptionSection = document.createElement('section');
        const titleDescription = document.createElement('h4');
        const descriptionP = document.createElement('p');
        const ingredientsSection = document.createElement('section');
        const titleIngredients = document.createElement('h4');
        const ingredientsGridDiv = document.createElement('div');
        
        cardArticle.id = `recipe-${id}-card`;
        cardArticle.className = 'relative flex flex-col max-w-lg rounded-3xl';
        
        img.alt = name;
        img.src = `../assets/recipes_images/${image}`;
        img.className = 'object-cover rounded-t-3xl h-72 w-full';
        
        timeDiv.className = 'absolute right-5 top-5 bg-yellow rounded-2xl px-4 py-1';
        timeDiv.textContent = `${time.toString()}min`;
        
        textSection.className = 'bg-white rounded-b-3xl px-6 pb-12';
        
        title.id = name;
        title.className = 'font-title text-lg mt-7 mb-8';
        title.textContent = name;
        
        descriptionSection.className = 'mb-8';
        
        titleDescription.className = 'text-grey text-xs mb-4';
        titleDescription.textContent = 'RECETTE';
        
        descriptionP.className = 'leading-5';
        descriptionP.textContent = description;
        
        // ingredientsSection
        
        titleIngredients.className = 'text-grey text-xs mb-4';
        titleIngredients.textContent = 'INGRÉDIENTS';
        
        ingredientsGridDiv.className = 'grid grid-cols-2 gap-y-4'
        
        for(let recipeIngredient of ingredients) {
                        let div = document.createElement('div');
            let {ingredient, quantity, unit} = recipeIngredient;
            let ingredientName = document.createElement('h5');
            
            ingredientName.textContent = ingredient;
            div.appendChild(ingredientName);
            
            if(quantity) {
                let quantityP = document.createElement('p');
                quantityP.className = 'text-grey';
                
                if(unit) {
                    quantityP.textContent = `${quantity} ${unit}`;
                } else {
                    quantityP.textContent = quantity;
                }
                
                div.appendChild(quantityP);
            }
            
            ingredientsGridDiv.appendChild(div);
        }
        
        descriptionSection.appendChild(titleDescription);
        descriptionSection.appendChild(descriptionP);
        
        ingredientsSection.appendChild(titleIngredients);
        ingredientsSection.appendChild(ingredientsGridDiv);
        
        textSection.appendChild(title);
        textSection.appendChild(descriptionSection);
        textSection.appendChild(ingredientsSection);
        
        cardArticle.appendChild(img);
        cardArticle.appendChild(timeDiv);
        cardArticle.appendChild(textSection);
        
        return cardArticle;
    }
    
    return {
        id,
        name,
        image,
        time,
        description,
        ingredients,
        getRecipeDOM,
    }
}