import config from "../config/config";
import { Client, ID, Databases, Storage } from "appwrite";

const { appwriteUrl, appwriteProjectId, appwriteBucketId } = config;

export class FileService {
  client = new Client();
  databases;
  bucket;

  /**
   * Creates a new instance of the FileService class.
   * @throws {Error} - If Appwrite configuration is incomplete.
   */
  constructor() {
    if (!appwriteUrl || !appwriteProjectId || !appwriteBucketId) {
      throw new Error(
        "Appwrite configuration is incomplete. Please check the config file."
      );
    }

    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  /**
   * Validates a file against a set of rules.
   * @param {File} file The file to validate.
   * @param {string[]} [allowedTypes=["image/png", "image/jpeg"]] A list of allowed MIME types.
   * @param {number} [maxSize=5 * 1024 * 1024] The maximum allowed file size in bytes.
   * @throws {Error} If the file type is not in the allowed list or if the file size exceeds the maximum limit.
   */
  validateFile(
    file,
    allowedTypes = ["image/png", "image/jpeg"],
    maxSize = 5 * 1024 * 1024
  ) {
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed.`);
    }
    if (file.size > maxSize) {
      throw new Error("File size exceeds the maximum limit of 5MB.");
    }
  }

  /**
   * Uploads a file to the Appwrite storage bucket after validation.
   * @param {File} file - The file to be uploaded.
   * @returns {Promise<Object>} A promise that resolves to the uploaded file object.
   * @throws {Error} If file validation fails or if there is an error during upload.
   */
  async uploadFile(file) {
    try {
      this.validateFile(file); // Validate file before upload
      console.log("Uploading file:", file.name);
      return await this.bucket.createFile(appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      throw error;
    }
  }

  /**
   * Deletes a file from the Appwrite storage bucket.
   * @param {string} fileId The ID of the file to be deleted.
   * @returns {Promise<boolean>} A promise that resolves to true if the file was deleted successfully, false otherwise.
   * @throws {Error} If there is an error during deletion.
   */
  async deleteFile(fileId) {
    try {
      console.log("Deleting file with ID:", fileId);
      await this.bucket.deleteFile(appwriteBucketId, fileId);
      console.log("File deleted successfully:", fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  /**
   * Retrieves a preview of a file from the Appwrite storage bucket.
   * @param {string} fileId The ID of the file for which to retrieve the preview.
   * @returns {Promise<string>} A promise that resolves to the URL of the file preview.
   * @throws {Error} If there is an error during retrieval.
   */
  getFilePreview(fileId) {
    try {
      console.log("Fetching preview for file ID:", fileId);
      return this.bucket.getFilePreview(appwriteBucketId, fileId);
    } catch (error) {
      console.error("Appwrite service :: getFilePreview :: error", error);
      throw new Error("Failed to fetch file preview.");
    }
  }
}

const fileService = new FileService();
export default fileService;
