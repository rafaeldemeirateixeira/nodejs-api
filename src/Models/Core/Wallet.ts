import { Model, DataTypes } from 'sequelize';
import * as math from 'mathjs';
import { Database } from '../../../database/Database';

export class Wallet extends Model {
    /**
     * @var number
     */
    user_id!: number;

    /**
     * @var number
     */
    amount!: number;

    /**
     * @return number
     */
    getBalance(): number {
        return this.amount;
    }

    /**
     * Increment value in amount field
     * @param amount
     */
    addBalance(amount: number): void {
        this.amount = math.sum(this.amount, amount);
    }

    /**
     * Decrement value in amount field
     * @param amount
     */
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
    sequelize: Database.connection(),
    name: {
        singular: 'wallet',
        plural: 'wallets',
    },
    timestamps: true,
    underscored: true
});

export default Wallet;
