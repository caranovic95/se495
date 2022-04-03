import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    ForeignKey,
    BelongsTo,
    DataType, Unique,
} from 'sequelize-typescript';
import {ProductDBInterface} from '../interfaces/product.interface';
import {Category} from "../../../category/db/models/category.model";

@Table({
    name: {
        singular: 'product',
        plural: 'products',
    },
    tableName: 'product',
    timestamps: false,
    underscored: true,
})
export class Product extends Model<Partial<ProductDBInterface>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    readonly id: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    @ForeignKey(() => Category)
    category_id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    product_id: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    price: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    brand: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    quantity: number;

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

    @BelongsTo(() => Category)
    category: Category


    static loadScopes = async (): Promise<void> => {
        await Product.addScope('public', {
            attributes: ['category_id', 'product_id', 'title', 'price', 'brand', 'quantity', 'position', 'image', 'crawled_at', 'active', 'category']
        });
    }
}
