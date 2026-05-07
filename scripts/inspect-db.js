const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
const envContent = fs.readFileSync(envPath, "utf8");
const uriMatch = envContent.match(/MONGODB_URI="?([^"\n\s]+)"?/);
const MONGODB_URI = uriMatch[1];

async function inspect() {
  await mongoose.connect(MONGODB_URI);
  const collections = await mongoose.connection.db.listCollections().toArray();
  for (const col of collections) {
    const doc = await mongoose.connection.db.collection(col.name).findOne();
    console.log(`Collection: ${col.name}`);
    console.log(JSON.stringify(doc, null, 2));
    console.log("-------------------");
  }
  await mongoose.disconnect();
}
inspect();
