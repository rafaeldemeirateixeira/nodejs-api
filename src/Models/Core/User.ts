import { Wallet } from './Wallet';
import bcrypt from 'bcryptjs';
import { Model, DataTypes, BelongsTo, HasOne } from 'sequelize';
import { SequelizeConnection } from './../../../database/SequelizeConnection';

export class User extends Model {
    /**
     * Array<string>
     */
    hidden: Array<string> = ['password', 'created_at', 'updated_at'];

    /**
     * @var string
     */
    id!: number;

    /**
     * @var string
     */
    password!: string;

    /**
     * @var string
     */
    email!: string;

    /**
     * @var string
     */
    tax_number!: string;

    /**
     * @var string
     */
    account!: string;

    /**
     * @var Wallet
     */
    wallet!: Wallet;

    /**
     * @var string
     */
    name!: string;

    /**
     * Remove protected attributes
     *
     * @return object
     */
    toJSON(): object {
        let attributes = Object.assign({}, this.get())
        for (let a of this.hidden) {
            delete attributes[a]
        }
        return attributes
    }
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account: {
        type: DataTypes.ENUM('personal', 'company'),
        allowNull: false,
        defaultValue: 'personal'
    },
    tax_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: SequelizeConnection.init(),
    timestamps: true,
    underscored: true,
    name: {
        singular: 'user',
        plural: 'users',
    },
    hooks: {
        beforeSave: (user) => {
            user.password = bcrypt.hashSync(user.password, 8);
        }
    },
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

User.hasOne(Wallet, { foreignKey: 'user_id', as: 'wallet' });

export default User;
