import config from "../config/config";
import { Client, Account, ID } from "appwrite";

const { appwriteUrl, appwriteProjectId } = config;

export class AuthService {
  client = new Client();
  account;

  constructor() {
    if (!appwriteUrl || !appwriteProjectId) {
      throw new Error("Appwrite URL or Project ID is missing from config.");
    }
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.account = new Account(this.client);
  }

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

  async login({ email, password }) {
    try {
      console.log(`Logging in with ${email}`);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error:", error);
      return null;
    }
  }

  async logout() {
    try {
      console.log("Logging out...");
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout :: error:", error);
    }
  }

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
