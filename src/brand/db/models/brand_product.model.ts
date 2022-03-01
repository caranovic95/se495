import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Unique,
} from 'sequelize-typescript';
import {BrandDBInterface, BrandProductDBInterface} from "../interfaces/brand.interface";

@Table({
    name: {
        singular: 'brand_product',
        plural: 'brand_products',
    },
    tableName: 'brand_product',
    timestamps: false,
    underscored: true,
})
export class BrandProduct extends Model<Partial<BrandProductDBInterface>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    readonly id: number;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    product_id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    availability: number;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    price: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    description: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    delivery: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    position: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    image: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    crawled_at: Date;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    active: number;


    static loadScopes = async (): Promise<void> => {
        await BrandProduct.addScope('public', {
            attributes: ['title', 'availability', 'price','description','delivery','position','image','crawled_at']
        });
    }
}
