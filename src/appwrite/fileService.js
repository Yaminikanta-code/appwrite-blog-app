import config from "../config/config";
import { Client, ID, Databases, Storage } from "appwrite";

const { appwriteUrl, appwriteProjectId, appwriteBucketId } = config;

export class FileService {
  client = new Client();
  databases;
  bucket;

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
