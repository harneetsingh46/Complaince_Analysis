import { generateEmbedding } from "../Backend/utils/embendings"

const test = async () => {
    try {
        console.log("Testing local embedding model...");

        const vector = await generateEmbedding(
            "This is a test document for compliance analysis."
        );

        console.log("Embedding generated successfully!");
        console.log("Vector dimensions:", vector.length);
        console.log("First five values:", vector.slice(0, 5));

    } catch (error) {
        console.error("Test failed:", error);
    }
};

test();