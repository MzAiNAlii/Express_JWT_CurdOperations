import { Request, Response } from "express"

import Users from "../../models/Users"

import bcrypt from 'bcrypt'

import Jwt  from "jsonwebtoken"

const loginController = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    
    const existingUser = await Users.findOne({

      email
      
    });

    console.log(existingUser);

    if (!existingUser) {
      return res.status(403).send("Invalid Credentials");
    }

    const passwordMatched = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatched) {

      return res.status(403).send("Invalid Credentials");

    }

    const accessToken = Jwt.sign({

      id: existingUser._id,
      email: existingUser.email

    }, process.env.ACCESS_SECERT!,

    {

      expiresIn: "1m",
      issuer: "http://localhost:3000",
      subject: existingUser._id.toString(),

    }) 

    const refreshToken = Jwt.sign({

      id: existingUser._id,
      email: existingUser.email,
    },process.env.REFRESH_SECERT!,

    {
      expiresIn : "30d",
      issuer: "http://localhost:3000",
      subject: existingUser._id.toString(),


    })

    const updatedUser = await Users.findByIdAndUpdate(existingUser._id, {
      $set: {
        refreshToken,
      }
    }, { new: true });


    console.log(updatedUser)

    return res.json({

      message: "Login Successful",

      data: {

        user: existingUser,
        token: accessToken,

      }

    });

  } catch (error) {

    console.log(Error);

  }
}

export default loginController;