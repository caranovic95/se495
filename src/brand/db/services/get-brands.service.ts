import Logger from '../../../common/helpers/logger';
import {Brand} from "../models/brand.model";

const logger = Logger.get('GET-ALL-BRANDS');

const getBrands = async ()=> {
    try {
        const brands = await Brand.findAll({raw : true ,
            nest: true , // <--- The issue of raw true, will be solved by this
            include: [{
                all: true
            }],
        })
        return brands;
    } catch (e) {
        throw new Error(e.message);
    }
};

export default getBrands;