import * as path from 'path';
import { encode } from 'html-entities';
import moment from 'moment';

export const formatPzn = (pzn: string): string => {
    return pzn ? pzn.trim().padStart(8, '0') : null;
};

export const formatUrl = (url: string): string => {
    const regUrl = /^(http(s)?:\/\/)/gm;
    if (url.indexOf('/') === 0) url = url.substr(1);
    return url.match(regUrl) ? url :  url;
};
export const removeSpecialCharacter = (text: string) => {
    let reg = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    const matchRegex = text.match(reg);
    if (matchRegex !== null && matchRegex.length) {
        for (let item of matchRegex) {
            if (text.includes(item)) {
                text = text.replace(item, '');
            }
        }
    }
    return text;
};

export const formatPrice = (price: string): string => {
    return price.replace(/[^0-9\,\.]/gi, '').replace('.', '');
};


/**
 * Function that is extracting length of elements from result of page.$eval functions
 * **/
export const getElementsLength = (element) => {
    return element.length;
};

/**
 * Function that is extracting textContent from result of page.$eval functions
 * **/
export const getTextContent = (element) => {
    return element.textContent;
};

/**
 * Function that is extracting attribute content from result of page.$eval functions
 * **/
export const getContent = (element) => {
    return element.getAttribute('content');
};
export const mapDataProductId = (element) => {
    return element.map((option) => option.getAttribute('data-product-id'));
}
export const mapDataName = (element) => {
    return element.map((option) => option.getAttribute('data-name'));
}
export const mapDataPrice= (element) => {
    return element.map((option) => option.getAttribute('data-price'));
}

export const mapDataBrand = (element) => {
    return element.map((option) => option.getAttribute('data-brand'));
}

export const mapDataQuantity = (element) => {
    return element.map((option) => option.getAttribute('data-quantity'));
}

export const mapDataPosition = (element) => {
    return element.map((option) => option.getAttribute('data-position'));
}

export const mapImgSrc = (element) => {
    return element.map((option) => option.src);
};

export const mapHrefs = (element) => {
    return element.map((option) => option.href);
}


