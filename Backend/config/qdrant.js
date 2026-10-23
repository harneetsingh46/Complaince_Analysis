import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";

dotenv.config();
const qdrantClinet = new QdrantClient({
  url: process.env.QDRANT_ENDPOINT,
  apiKey: process.env.QDRANT_API_KEY,
});

try {
  const connection = await qdrantClinet.getCollections();
  console.log("Vector Database Connected !",connection.collections.length);
} catch (err) {
  console.log(err.message);
}

export default qdrantClinet;
