import { Model, DataTypes } from 'sequelize';
import { SequelizeConnection } from '../../../database/SequelizeConnection';

export class Withdraw extends Model {
    id!: number;
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
    sequelize: SequelizeConnection.init(),
    modelName: 'withdraw',
    timestamps: true,
    underscored: true,
});

export default Withdraw;
