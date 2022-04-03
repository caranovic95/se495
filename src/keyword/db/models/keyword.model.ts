import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Default, HasMany,
} from 'sequelize-typescript';
import {KeywordDBInterface} from '../interfaces/keyword.interface';
import {Product} from "../../../product/db/models/product.model";
import {KeywordProduct} from "./keyword_product.model";


@Table({
    name: {
        singular: 'keyword',
        plural: 'keywords',
    },
    tableName: 'keyword',
    timestamps: false,
    underscored: true,
})
export class Keyword extends Model<Partial<KeywordDBInterface>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    readonly id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    keyword: string;

    @AllowNull(true)
    @Default(null)
    @Column(DataType.DATE)
    created_at: Date;

    @HasMany(() => KeywordProduct)
    keyword_product: KeywordProduct[];

    static loadScopes = async (): Promise<void> => {
        await Keyword.addScope('public', {
            attributes: ['keyword']
        });
    }
}
