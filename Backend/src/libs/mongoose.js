const mongoose = require("mongoose");
const {
  dbHost,
  dbPort,
  dbName,
  dbNameCloud,
  dbUsername,
  dbPassword,
} = require("../config/config");

const DB_URICLOUD = `mongodb+srv://${dbUsername}:${dbPassword}@${dbNameCloud}.pkkyfqz.mongodb.net/`;
const DB_URI = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const DB_URIPRUEBA=`mongodb+srv://jeankyt06:CloudSena@cloud.2qnbc5r.mongodb.net/?retryWrites=true&w=majority&appName=Cloud`
const connect = () => {
  try {
    mongoose.connect(DB_URIPRUEBA,{
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    })
    console.log("DB CONNECT!!!!!");
  } catch (error) {
    console.log(`Error en la conexion: ${error}`);
  }
};

module.exports = connect;
