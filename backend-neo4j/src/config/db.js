const neo4j = require("neo4j-driver");
require("dotenv").config();
const { url, db_username, db_password, database } = process.env;
const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));

const session = driver.session(database);

module.exports = session;
