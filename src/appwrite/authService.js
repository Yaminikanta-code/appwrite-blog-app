import config from "../config/config";
import { Client, Account, ID } from "appwrite";

const { appwriteUrl, appwriteProjectId } = config;

export class AuthService {
  client = new Client();
  account;

  /**
   * Creates a new instance of the AuthService, setting up the Appwrite Client with
   * the given endpoint and project ID.
   *
   * @throws {Error} if either the Appwrite URL or Project ID is missing from the
   *                 config.
   */
  constructor() {
    if (!appwriteUrl || !appwriteProjectId) {
      throw new Error("Appwrite URL or Project ID is missing from config.");
    }
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.account = new Account(this.client);
  }

  /**
   * Creates a new user account with the given email, password, and name.
   * Upon successful account creation, the user is automatically logged in.
   *
   * @param {Object} userDetails - Object containing user details.
   * @param {string} userDetails.email - The email address of the user.
   * @param {string} userDetails.password - The password for the account.
   * @param {string} userDetails.name - The name of the user.
   *
   * @returns {Promise<Object|null>} - The login response object if successful, or null if account creation fails.
   *
   * @throws {Error} - If there is an error during account creation or login.
   */
  async createAccount({ email, password, name }) {
    try {
      console.log(`Creating account for ${email}`);
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        console.log("Account created successfully, logging in...");
        const loginResponse = await this.login({ email, password });
        return loginResponse;
      } else {
        console.log("Account creation failed");
        return null;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  /**
   * Logs in a user with the provided email and password.
   *
   * @param {Object} userDetails - Object containing user credentials.
   * @param {string} userDetails.email - The email address of the user.
   * @param {string} userDetails.password - The password for the account.
   *
   * @returns {Promise<Object>} - The session object if login is successful.
   *
   * @throws {Error} - If there is an error during the login process.
   */
  async login({ email, password }) {
    try {
      console.log(`Logging in with ${email}`);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  /**
   * Retrieves the currently logged-in user's account details.
   *
   * @returns {Promise<Object|null>} - The user account object if retrieval is successful, or null if an error occurs.
   *
   * @throws {Error} - If there is an error retrieving the user account details.
   */
  async getCurrentUser() {
    try {
      console.log("Retrieving current user...");
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error:", error);
      return null;
    }
  }

  /**
   * Logs out the current user.
   *
   * @returns {Promise<void>}
   *
   * @throws {Error} - If there is an error during the logout process.
   */
  async logout() {
    try {
      console.log("Logging out...");
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout :: error:", error);
    }
  }

  /**
   * Logs in a user using the specified OAuth provider.
   *
   * @param {string} provider - The OAuth provider to use for login.
   *
   * @returns {Promise<Object>} - The session object if login is successful.
   *
   * @throws {Error} - If there is an error during the OAuth login process.
   */
  async logInWithOAuth(provider) {
    try {
      const response = await this.account.createOAuth2Session(provider);
      console.log(`Logged in with ${provider}:`, response);
      return response;
    } catch (error) {
      console.error(`Error during OAuth login with ${provider}:`, error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
