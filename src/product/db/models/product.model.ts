import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Unique,
} from 'sequelize-typescript';
import {ProductDBInterface} from '../interfaces/product.interface';

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




    static loadScopes = async (): Promise<void> => {
        await Product.addScope('public', {
            attributes: [ 'product_id', 'title','price','brand','quantity','position','image','crawled_at' ]
        });
    }
}
