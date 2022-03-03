import {
    Model,
    Table,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Column,
    DataType, Unique,
} from 'sequelize-typescript';
import {UserDBInterface} from "../interfaces/user.interface";

@Table({
    name: {
        singular: 'user',
        plural: 'users',
    },
    tableName: 'user',
    timestamps: false,
    underscored: true,
})
export class User extends Model<Partial<UserDBInterface>> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    readonly id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    first_name: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    last_name: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @AllowNull(true)
    @Column(DataType.DATE)
    created_at: Date;



    static loadScopes = async (): Promise<void> => {
        await User.addScope('public', {
            attributes: ['first_name', 'last_name', 'email', 'created_at']
        });
    }
}
