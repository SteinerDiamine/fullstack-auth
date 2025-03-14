//Redis is in memory(RAM) data that is stored for faster speed to access cache data; firstly before hitting to database our server will ask redis whether it has given data stored or not if not than it will go to databse and query the data when the queried data return then server will ask redis to remember that data for future queries and redis will cache that data..also it provides better optmization for computed data like unread msg 

import { createClient } from "redis"

let redisClient = createClient();

const intializeRedis = async () => {
    try {
        redisClient.on("error",(err) => console.log("Error event occured in redis",err));
        
        await redisClient.connect();
        console.log('Redis connection successful');
    } catch (error) {
        console.log("Error intializing redis", error);
        throw error;
        
    }
}

export {redisClient, intializeRedis};