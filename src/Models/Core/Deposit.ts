import { Model, DataTypes } from 'sequelize';
import { SequelizeConnection } from '../../../database/SequelizeConnection';

export class Deposit extends Model { }

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
    }
}, {
    sequelize: SequelizeConnection.init(),
    modelName: 'deposit',
    timestamps: true,
});

export default Deposit;
