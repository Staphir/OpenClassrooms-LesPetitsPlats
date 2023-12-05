"use strict";


/**
 * Check if value is in array
 *
 * @param {Array} array
 * @param {*} value
 * @returns {boolean}
 */
function includes(array, value) {
    for(let arrayValue of array) {
        if(arrayValue === value) {
            return true;
        }
    }
    return false;
}