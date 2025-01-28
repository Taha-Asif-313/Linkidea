import { Client, Storage } from "appwrite";

// Initialize Appwrite client
const client = new Client();

// Configure client
client.setProject("6798ab3200241a38851d").setEndpoint("https://cloud.appwrite.io/v1");    // Replace with your Appwrite Project ID
console.log(client);

// Initialize Storage service
export const storage = new Storage(client);
