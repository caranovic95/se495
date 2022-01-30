import { formatPzn } from './crawler.formating';


/**
 * Function that checks if all pzns are null --- can be sign of changed selectors - in that case we will throw an error
 * ARGUMENTS expected : array of products of type KeywordListProducts
 **/

export const allProductsNull = (listProducts: any[]): void => {
    if (
        listProducts.filter((element) => element.pzn === null).length ===
        listProducts.length
    )
        throw 'All pzns are null';
};

export const addZeroToPzn = (arrayOfElements: any[]): any[] => {
    for (let item in arrayOfElements) {
        if (arrayOfElements[item].length === 7) {
            arrayOfElements[item] = 0 + arrayOfElements[item];
        }
    }

    return arrayOfElements;
};
