import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";

dotenv.config();
const qdrantClinet = new QdrantClient({
  url: process.env.QDRANT_ENDPOINT,
  apiKey: process.env.QDRANT_API_KEY,
});

const initFrameworkCollection = async () => {
  const collectionName = "frameworks";
  try {
    const res = await qdrantClinet.getCollections();
    const exists = res.collections.some((c)=>c.name === collectionName);
    if(!exists){
      await qdrantClinet.createCollection(collectionName,{
        vectors:{
          size:384,
          distance:"Cosine"
        }
      })
      await qdrantClinet.createPayloadIndex(collectionName,{
        field_name: "frameworkID",
        field_schema: "keyword"
      })
      console.log(`Quadrant collection ${collectionName} created Successfully !`)
    }else{
      console.log(`${collectionName} collection has already exists`)
    }
  } catch (error) {
    console.log("Error via vector db",error)
  }
};
try {
  const connection = await qdrantClinet.getCollections();
  console.log("Vector Database Connected !", connection.collections.length);
  initFrameworkCollection()
} catch (err) {
  console.log(err.message);
}

export default qdrantClinet;
