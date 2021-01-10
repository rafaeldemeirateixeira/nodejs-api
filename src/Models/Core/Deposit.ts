import { Model, DataTypes } from 'sequelize';
import { Database } from '../../../database/Database';

export class Deposit extends Model {
    /**
     * @var number
     */
    id!: number;

    /**
    * @var number
    */
    user_id!: number;

    /**
    * @var number
    */
    amount!: number;

    /**
    * @var number
    */
    fee!: number;

    /**
    * @var number
    */
    type!: string;

    /**
    * @var number
    */
    txid!: string;
}

Deposit.init({
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(24, 8),
        allowNull: false
    },
    fee: {
        type: DataTypes.DECIMAL(24, 8),
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('transfer', 'deposit'),
        allowNull: false,
        defaultValue: 'deposit'
    },
    txid: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: Database.connection(),
    modelName: 'deposit',
    timestamps: true,
    underscored: true,
});

export default Deposit;
