//defined connection pool to connect to mysql database so there is less delay in databse response multiple connection are open and running so whenever a request comes it can be served by any of the connection

import { createPool ,Pool} from "mysql2/promise";
import { CREATE_TABLE_USERS } from "./tables";

let pool:Pool;
const connectToDatabase = async () => {
    try {
        pool = createPool({
            port: +process!.env!.MYSQL_PORT!,
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            });

            await pool.getConnection();
            console.log("Connected to mysql database");
            await pool.execute(CREATE_TABLE_USERS);
            console.log("Table users created");
            
            
            
    } catch (error) {
        console.log("Error connecting database",error);
        throw error;
        
    }
}


export {connectToDatabase, pool};


