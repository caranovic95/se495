import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Default,
} from 'sequelize-typescript';
import {KeywordDBInterface} from '../interfaces/keyword.interface';

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


    static loadScopes = async (): Promise<void> => {
        await Keyword.addScope('public', {
            attributes: ['keyword']
        });
    }
}
