import { CreateOptions } from 'sequelize/types';
import User from "../../../Models/Core/User";

export interface UserRepositoryInterface {
    /**
     * Register a new user
     *
     * @param object data
     * @return Promise<User>
     */
    createUser(data: object, options?: CreateOptions<User>): Promise<User>

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

    /**
     * @param taxNumber string 
     * @returns Promise<User>
     */
    getUserByTaxNumber(taxNumber: string): Promise<User>

    /**
     * @param userId number
     * @param token strign
     * @param options CreateOptions<any>
     * @return Promise<boolean>
     */
    registerToken(userId: number, token: string, options?: CreateOptions<any>): Promise<boolean>
}
