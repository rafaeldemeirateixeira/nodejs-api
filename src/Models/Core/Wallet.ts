import { Model, DataTypes } from 'sequelize';
import * as math from 'mathjs';
import { SequelizeConnection } from '../../../database/SequelizeConnection';

export class Wallet extends Model {
    amount!: number;

    getBalance(): number {
        return this.amount;
    }

    addBalance(amount: number): void {
        this.amount = math.sum(this.amount, amount);
    }

    removeBalance(amount: number): void {
        this.amount = Number(math.subtract(this.amount, amount));
    }
}

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
    name: {
        singular: 'wallet',
        plural: 'wallets',
    },
    timestamps: true,
    underscored: true
});

export default Wallet;
