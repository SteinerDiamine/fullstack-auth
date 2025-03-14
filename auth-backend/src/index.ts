import app from './app';
import { config } from 'dotenv';
import { connectToDatabase } from './mysql/connection';
import { intializeRedis } from './redis/connection';


config();

const init  = async () => {
    //init mysql 
    try {
        await connectToDatabase();
        await intializeRedis();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT,  ()=> {
            console.log(`Server running on port,`, PORT);
        }
        );
         
    } catch (error) {
        console.log("App intialization error");
        process.exit(1);
        
        
    }
}

init();