import { Request , Response } from "express";
import { pool } from "../mysql/connection";
import { GET_USER_BY_ID } from "../mysql/queries";
import { INSERT_USER_STATEMENT } from "../mysql/mutation";
import bcrypt from 'bcrypt'

const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        // Connect to the database
        const connection = await pool.getConnection();
        const result = await connection.query(GET_USER_BY_ID, [id]); 
        console.log("user retrieved", result);
        

        // Return the user data
        return res.status(200).json({ user: result[0] });
        
        
    } catch (error) {
        // Handle errors
        console.log("error occured", error);
        
        return res.status(500).json({ message: "Internal server error", error });
        
    }
};


const createUser = async (req: Request, res: Response) => {
    try {
        
        const  {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(422).json({message:"Missing data"})
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
    
export {getUser, createUser};

