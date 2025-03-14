import app from './app';
import { config } from 'dotenv';
import { connectToDatabase } from './mysql/connection';


config();

const init  = async () => {
    //init mysql 
    try {
        await connectToDatabase();
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