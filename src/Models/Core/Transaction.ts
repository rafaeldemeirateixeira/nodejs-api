import { Model, DataTypes } from 'sequelize';
import { Database } from '../../../database/Database';
import { TransactionType } from '../../Enums/TypeTransaction';

export class Transaction extends Model {
    /**
     * @var Array<string>
     */
    private hidden: Array<string> = ['created_at', 'updated_at']

    /**
     * @var number
     */
    id!: number;

    /**
     * @var number
     */
    deposit_id!: number;

    /**
     * @var number
     */
    withdraw_id!: number;

    /**
     * @var number
     */
    amount!: number;

    /**
     * @var number
     */
    type!: string;

    /**
     * @var number
     */
    txid!: string;

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

Transaction.init({
    deposit_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    withdraw_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(24, 8),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(TransactionType.DEPOSIT, TransactionType.WITHDRAW, TransactionType.TRANSFER),
        allowNull: false,
        defaultValue: TransactionType.DEPOSIT
    },
    txid: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: Database.connection(),
    modelName: 'transaction',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Transaction;
