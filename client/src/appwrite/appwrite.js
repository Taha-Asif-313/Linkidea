import { Client, Storage } from "appwrite";

// Initialize Appwrite client
const client = new Client();

// Configure client
client.setProject("6798ab3200241a38851d");    // Replace with your Appwrite Project ID

// Initialize Storage service
export const storage = new Storage(client);
