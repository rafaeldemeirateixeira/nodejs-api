export interface AuthServiceInterface {
    /**
     * Authenticate user
     *
     * @param data object
     * @return object
     */
    authenticate(data: any): object

    /**
     * 
     * @param email string
     * @param password string
     * @returns Promise<Object>
     */
    password(email: string, password: string): Promise<Object>
}
