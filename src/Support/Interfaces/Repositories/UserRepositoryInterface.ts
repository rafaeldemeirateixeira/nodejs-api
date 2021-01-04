import User from "../../../Models/Core/User";

export interface UserRepositoryInterface {
    /**
     * Register a new user
     *
     * @param object data
     * @return Promise<User>
     */
    create(data: object): Promise<User>

    /**
     * @param string email
     * @return boolean
     */
    isEmailUnique(email: string): Promise<boolean>

    /**
     * @param string taxNumber
     * @return boolean
     */
    isTaxNumberUnique(taxNumber: string): Promise<boolean>

    /**
     * @param string email
     * @return Promise<User>
     */
    getUserByEmail(email: string): Promise<User>
}
