import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

const db: any = process.env.DB_CONNECTION;

export class Database {
    /**
     * @var Sequelize
     */
    private static instance: Sequelize;

    private constructor() {
        //
    }

    static connection() {
        if (!this.instance) {
            this.instance = new Sequelize(sequelize[db]);
        }

        return this.instance;
    }
}
