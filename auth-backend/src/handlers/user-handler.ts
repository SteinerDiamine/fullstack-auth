import { Request , Response } from "express";
import { pool } from "../mysql/connection";
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from "../mysql/queries";
import { INSERT_USER_STATEMENT } from "../mysql/mutation";
import bcrypt from 'bcrypt'


const getUserBy = async (by: "email" | "id", value: string ) => {
    try {
        const connection = await pool.getConnection();
        const result = await connection.query(by === 'email'?GET_USER_BY_EMAIL : GET_USER_BY_ID, [value]);

        
        //@ts-ignore
        const user = result[0][0];
        console.log("user retrieved", result);
        return user;;
        
    } catch (error) {
        console.log("Error while getting user", error);
        throw error;
        
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const user = await getUserBy("id", id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
          // Return the user data
        return res.status(200).json({ user});
      
    } catch (error) {
        // Handle errors
        console.log("error occured", error);
        
        return res.status(500).json({ message: "Internal server error", error });
        
    }
};


const registerUser = async (req: Request, res: Response) => {
    try {
        
        const  {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(422).json({message:"Missing data"})
        } 

        const user = await getUserBy("email", email);
        if(user){
            return res.status(409).json({message:`User already exists with id: ${user.id}`})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        

        // Connect to the database
        const connection = await pool.getConnection();
        const result = await connection.query(INSERT_USER_STATEMENT, [name, email, hashedPassword]); 
        console.log("user inserted", result[0]);
        

        // Return the user data
        return res.status(200).json({ user: result });
        
        
    } catch (error) {
        // Handle errors
        console.log("error occured", error);
        
        return res.status(500).json({ message: "Internal server error", error });
        
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        
        const  { email, password} = req.body;

        if(!email || !password){
            return res.status(422).json({message:"Missing data"})
        } 

        const hashedPassword = await bcrypt.hash(password, 10);
        
        

        const user = await getUserBy("email", email);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
     

        const isPasswordCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswordCorrect){
            return res.status(401).json({message: "Invalid password"})
        }

        //set token details
        

        // Return the user data
        return res.status(200).json({ user });
        
        
    } catch (error) {
        // Handle errors
        console.log("error occured", error);
        
        return res.status(500).json({ message: "Internal server error", error });
        
    }
};
    
export {getUser, registerUser, loginUser};

