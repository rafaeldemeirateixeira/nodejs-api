import { Model, DataTypes } from 'sequelize';
import { SequelizeConnection } from '../../../database/SequelizeConnection';

export class Wallet extends Model { }

Wallet.init({
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(24, 8),
        allowNull: false
    }
}, {
    sequelize: SequelizeConnection.init(),
    modelName: 'wallet',
    timestamps: true,
});

export default Wallet;
