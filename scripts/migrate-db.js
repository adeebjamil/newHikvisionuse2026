const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Read .env file
const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf8");

function getEnvVar(name) {
  const match = envContent.match(new RegExp(`${name}="?([^"\\n\\r]+)"?`));
  return match ? match[1] : null;
}

const OLD_URI = getEnvVar("OLD_MONGODB_URI");
const NEW_URI = getEnvVar("NEW_MONGODB_URI");

if (!OLD_URI || !NEW_URI) {
  console.error("Missing OLD_MONGODB_URI or NEW_MONGODB_URI in .env");
  process.exit(1);
}

async function migrate() {
  const oldClient = new MongoClient(OLD_URI);
  const newClient = new MongoClient(NEW_URI);

  try {
    console.log("Connecting to both databases...");
    await oldClient.connect();
    await newClient.connect();
    console.log("Connected successfully.");

    const oldDb = oldClient.db();
    const newDb = newClient.db();

    const collections = await oldDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections to migrate.`);

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      
      // Skip system collections
      if (collectionName.startsWith('system.')) continue;

      console.log(`\nMigrating collection: ${collectionName}`);
      
      const oldCollection = oldDb.collection(collectionName);
      const newCollection = newDb.collection(collectionName);

      const documents = await oldCollection.find({}).toArray();
      console.log(`- Found ${documents.length} documents.`);

      if (documents.length > 0) {
        // Clear existing data in new collection
        console.log(`- Clearing existing data in NEW ${collectionName}...`);
        await newCollection.deleteMany({});
        
        // Insert data
        console.log(`- Inserting ${documents.length} documents into NEW ${collectionName}...`);
        const result = await newCollection.insertMany(documents);
        console.log(`- Successfully inserted ${result.insertedCount} documents.`);
      } else {
        console.log(`- Collection is empty, skipping.`);
      }
    }

    console.log("\n🎉 Database migration complete!");
  } catch (error) {
    console.error("❌ Error during migration:", error);
  } finally {
    await oldClient.close();
    await newClient.close();
    console.log("Connections closed.");
  }
}

migrate();
