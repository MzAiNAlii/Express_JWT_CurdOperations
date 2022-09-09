import { Request, Response } from "express"

import bcrypt from 'bcrypt';

import Users from "../../models/Users";

const signupController = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {

    const hashedPass = await bcrypt.hash(password, 8);

    const newUser = await Users.create({

      email,

      password: hashedPass

    });

    return res.json({

      message: "User created successfully",

      data: newUser

    });

    
  } catch (error) {

    console.log("Error");

  }  
}

export default signupController;