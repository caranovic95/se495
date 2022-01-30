import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Unique,
} from 'sequelize-typescript';
import { CategoryDBInterface } from '../interfaces/category.interface';

@Table({
    name: {
        singular: 'category',
        plural: 'categories',
    },
    tableName: 'category',
    timestamps: false,
    underscored: true,
})
export class Category extends Model<Partial<CategoryDBInterface>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    readonly id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    shop_name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    category_url: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    screenshot: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    crawled_at: Date;

    @AllowNull(true)
    @Unique(true)
    @Column(DataType.STRING)
    sub_category: string;



    static loadScopes = async (): Promise<void> => {
        await Category.addScope('public', {
            attributes: [ 'shop_name', 'category_url','screenshot','crawled_at','subcategories' ]
        });
    }
}
