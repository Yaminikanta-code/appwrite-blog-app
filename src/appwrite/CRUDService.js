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

  /**
   * The constructor for the Service class.
   *
   * Checks if the required Appwrite configuration values are present.
   * If any of the values are missing, it throws an error.
   * Otherwise, it sets the Appwrite endpoint and project, and
   * creates a new instance of the Databases service.
   */
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

  /**
   * A helper function to handle errors thrown by Appwrite services.
   *
   * It logs the error to the console with a prefix that includes the name of the
   * service method that threw the error. It also re-throws the error.
   *
   * @param {string} method - The name of the service method that threw the error.
   * @param {Error} error - The error that was thrown.
   */
  handleError(method, error) {
    console.error(`Appwrite service :: ${method} :: error`, error);
    throw error;
  }

  /**
   * Creates a new post document in the Appwrite database.
   *
   * Validates that the provided slug is unique before creating the document.
   * If the slug is not unique, an error is thrown.
   *
   * @param {Object} post - The post details.
   * @param {string} post.title - The title of the post.
   * @param {string} post.slug - The unique slug identifier for the post.
   * @param {string} post.content - The content of the post.
   * @param {string} post.featuredImage - The URL of the featured image for the post.
   * @param {string} post.status - The status of the post (e.g., 'draft', 'published').
   * @param {string} post.userId - The ID of the user creating the post.
   *
   * @returns {Promise<Object>} The created post document.
   * @throws Will throw an error if the slug is not unique or if the document creation fails.
   */
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      //console.log(`Creating post with slug: ${slug}`);
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

  /**
   * Updates an existing post document in the Appwrite database.
   *
   * @param {string} slug - The unique slug identifier for the post.
   * @param {Object} post - The post details.
   * @param {string} post.title - The new title of the post.
   * @param {string} post.content - The new content of the post.
   * @param {string} post.featuredImage - The new URL of the featured image for the post.
   * @param {string} post.status - The new status of the post (e.g., 'draft', 'published').
   *
   * @returns {Promise<Object>} The updated post document.
   * @throws Will throw an error if the update fails.
   */
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      //console.log(`Updating post with slug: ${slug}`);
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

  /**
   * Deletes a post document in the Appwrite database.
   *
   * @param {string} slug - The unique slug identifier for the post.
   *
   * @returns {Promise<boolean>} Whether the deletion was successful.
   * @throws Will throw an error if the deletion fails.
   */
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

  /**
   * Retrieves a post document from the Appwrite database.
   *
   * @param {string} slug - The unique slug identifier for the post.
   *
   * @returns {Promise<Object>} The fetched post document.
   * @throws Will throw an error if the document fetch fails.
   */
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

  /**
   * Retrieves a list of post documents from the Appwrite database
   * filtered by the given queries.
   *
   * @param {Array<Query>} queries - The queries to filter the documents with.
   *
   * @returns {Promise<Pagination<Document>>} The list of fetched post documents.
   * @throws Will throw an error if the document fetch fails.
   */
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

  /**
   * Checks if the given slug is unique in the Appwrite database.
   *
   * @param {string} slug - The slug to check.
   *
   * @returns {Promise<boolean>} Whether the slug is unique.
   * @throws Will throw an error if the check fails.
   */
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
