import bcrypt from 'bcryptjs';
import { Model, DataTypes } from 'sequelize';
import { SequelizeConnection } from './../../../database/SequelizeConnection';

const PROTECTED_ATTRIBUTES = ['password', 'created_at', 'updated_at']

export class User extends Model {
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
     * @var string
     */
    name!: string;

    toJSON(): object {
        let attributes = Object.assign({}, this.get())
        for (let a of PROTECTED_ATTRIBUTES) {
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
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
}, {
    sequelize: SequelizeConnection.init(),
    modelName: 'user',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    hooks: {
        beforeSave: (user) => {
            user.password = bcrypt.hashSync(user.password, 8);
        }
    }
});

export default User;
