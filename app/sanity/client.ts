import { createClient } from "next-sanity";

// Sanity Project ID from .env
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;

export const client = createClient({
  projectId: projectId,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});