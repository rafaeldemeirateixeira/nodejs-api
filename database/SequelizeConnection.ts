import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database';

const db: any = process.env.DB_CONNECTION;

export class SequelizeConnection {
    /**
     * @var Sequelize
     */
    private static instance: Sequelize;

    private constructor() {
        //
    }

    static init() {
        if (!SequelizeConnection.instance) {
            SequelizeConnection.instance = new Sequelize(sequelize[db]);
        }

        return SequelizeConnection.instance;
    }
}
