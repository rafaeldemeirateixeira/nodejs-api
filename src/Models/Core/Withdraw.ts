import { Model, DataTypes } from 'sequelize';
import { Database } from '../../../database/Database';

export class Withdraw extends Model {
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

Withdraw.init({
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
        type: DataTypes.ENUM('transfer', 'withdraw'),
        allowNull: false,
        defaultValue: 'withdraw'
    },
    txid: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: Database.connection(),
    modelName: 'withdraw',
    timestamps: true,
    underscored: true,
});

export default Withdraw;
