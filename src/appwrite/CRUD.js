import config from "../config/config";
import { Client, Databases, Query } from "appwrite";

const {
  appwriteUrl,
  appwriteProjectId,
  appwriteDatabaseId,
  appwriteCollectionId,
} = config;

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    if (
      !appwriteUrl ||
      !appwriteProjectId ||
      !appwriteDatabaseId ||
      !appwriteCollectionId
    ) {
      throw new Error(
        "Appwrite configuration is incomplete. Please check the config file."
      );
    }

    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  handleError(method, error) {
    console.error(`Appwrite service :: ${method} :: error`, error);
    throw error;
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      console.log(`Creating post with slug: ${slug}`);
      const isUnique = await this.isSlugUnique(slug);
      if (!isUnique) throw new Error("Slug must be unique.");

      return await this.databases.createDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      this.handleError("createPost", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      console.log(`Updating post with slug: ${slug}`);
      return await this.databases.updateDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      this.handleError("updatePost", error);
    }
  }

  async deletePost(slug) {
    try {
      console.log(`Deleting post with slug: ${slug}`);
      await this.databases.deleteDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      this.handleError("deletePost", error);
    }
  }

  async getPost(slug) {
    try {
      console.log(`Fetching post with slug: ${slug}`);
      return await this.databases.getDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );
    } catch (error) {
      this.handleError("getPost", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      console.log("Fetching posts with queries:", queries);
      return await this.databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionId,
        queries
      );
    } catch (error) {
      this.handleError("getPosts", error);
    }
  }

  async isSlugUnique(slug) {
    try {
      const response = await this.databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionId,
        [Query.equal("$id", slug)]
      );
      return response.total === 0;
    } catch (error) {
      this.handleError("isSlugUnique", error);
    }
  }
}

const service = new Service();
export default service;
