import User from "../../../Models/Core/User";

export interface UserServiceInterface {
    /**
     * Register a new user in database
     *
     * @param data User
     * @return Promise<User>
     */
    store(data: User['_creationAttributes']): Promise<User>
}
