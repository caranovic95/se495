import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Unique,
} from 'sequelize-typescript';
import {BrandDBInterface} from "../interfaces/brand.interface";

@Table({
    name: {
        singular: 'brand',
        plural: 'brands',
    },
    tableName: 'brand',
    timestamps: false,
    underscored: true,
})
export class Brand extends Model<Partial<BrandDBInterface>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    readonly id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    brand_name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    brand_url: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    created_at: Date;


    static loadScopes = async (): Promise<void> => {
        await Brand.addScope('public', {
            attributes: ['brand_name','brand_url','created_at']
        });
    }
}
