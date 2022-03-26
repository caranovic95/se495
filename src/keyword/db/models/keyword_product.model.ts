import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Unique,
} from 'sequelize-typescript';
import {KeywordProductDBInterface} from '../interfaces/keyword.interface';

@Table({
    name: {
        singular: 'keyword_product',
        plural: 'keyword_products',
    },
    tableName: 'keyword_product',
    timestamps: false,
    underscored: true,
})
export class KeywordProduct extends Model<Partial<KeywordProductDBInterface>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    readonly id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    keyword_id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    product_name: string;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    price: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    product_desc: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    brand: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    quantity: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    availability: string;

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
        await KeywordProduct.addScope('public', {
            attributes: ['keyword_id', 'product_name', 'price', 'product_desc', 'brand', 'quantity', 'availability', 'position', 'image', 'crawled_at', 'active']
        });
    }
}
