import { Model, DataTypes } from 'sequelize';
import { SequelizeConnection } from '../../../database/SequelizeConnection';

export class Withdraw extends Model { }

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
    }
}, {
    sequelize: SequelizeConnection.init(),
    modelName: 'withdraw',
    timestamps: true,
});

export default Withdraw;
