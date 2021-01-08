import { Auth } from '../../../../@types/services';
export interface AuthServiceInterface {
    /**
     * Authenticate user
     *
     * @param data
     * @return object
     */
    authenticate(data: Auth): object

    /**
     * Authenticate user by password.
     *
     * @param email
     * @param password
     * @returns Promise<Object>
     */
    password(email: string, password: string): Promise<Object>
}
