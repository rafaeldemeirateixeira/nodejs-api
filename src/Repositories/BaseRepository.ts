import { injectable } from "inversify";
import * as Sequelize from "sequelize";
import { ModelStatic } from "sequelize";

@injectable()
export abstract class BaseRepository<T extends Sequelize.Model<T> & K, K> {
    /**
     * @var { new(): T } & typeof Sequelize.Model
     */
    protected model!: { new(): T } & typeof Sequelize.Model;

    /**
     * Set model type
     *
     * @param model { new(): T } & typeof Sequelize.Model
     * @returns void
     */
    boot(model: { new(): T } & typeof Sequelize.Model): void {
        this.model = model
    }

    /**
    * Search for a single instance by its primary key. This applies LIMIT 1, so the listener will
    * always be called with a single instance.
    *
    * @param id number
    * @returns Promise<K | null>
    */
    async findByPk(id: number): Promise<K | null> {
        return this.model.findByPk<T>(id);
    }

    /**
     * Search for a single instance. Returns the first instance found, or null if none can be found.
     *
     * @param attributes { where: Sequelize.WhereOptions<T>, include?: string[] }
     * @param options? Sequelize.FindOptions<T['_attributes']>
     * @returns Promise<K | null>
     */
    async findOne(
        attributes: { where: Sequelize.WhereOptions<T>, include?: string[] },
        options?: Sequelize.FindOptions<T['_attributes']>
    ): Promise<K | null> {
        return this.model.findOne<T>({ ...options, ...attributes });
    }

    /**
     * Builds a new model instance and calls save on it.
     *
     * @param attributes T
     * @param options Sequelize.FindOrCreateOptions<T['_attributes'], T['_creationAttributes']>
     * @returns Promise<K>
     */
    async create(
        attributes: T['_creationAttributes'],
        options?: Sequelize.FindOrCreateOptions<T['_attributes'], T['_creationAttributes']>
    ): Promise<K> {
        return this.model.create<T>(attributes, options);
    }

    /**
     * Update multiple instances that match the where options. The promise returns an array with one or two
     * elements. The first element is always the number of affected rows, while the second element is the actual
     * affected rows (only supported in postgres and mssql with `options.returning` true.)
     *
     * @param attributes Partial<T>
     * @param options Sequelize.UpdateOptions<T>
     * @returns Promise<[number, T[]]>
     */
    public async update(
        attributes: Partial<T>,
        options: Sequelize.UpdateOptions<T>
    ): Promise<[number, T[]]> {
        return this.model.update<T>(attributes, options);
    }
}
