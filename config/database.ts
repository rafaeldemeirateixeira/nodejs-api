export const knex: any = {
    mysql: {
        client: 'mysql',
        version: process.env.DB_VERSION,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            charset: 'utf8mb4'
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeders'
        }
    },
    'sqlite3': {
        client: 'sqlite3',
        connection: {
            filename: ''
        }
    },
    'postgress': {
        client: 'pg',
        version: '',
        connection: {
            host: '',
            user: '',
            password: '',
            database: ''
        }
    }
};

export const sequelize: any = {
    mysql: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: String(process.env.DB_SHOW_SQL) == "true",
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
        },
    }
};
