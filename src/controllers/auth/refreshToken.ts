import { Request, Response } from "express";

import Users from "../../models/Users";

import  Jwt from "jsonwebtoken";

const refreshController = async (req : Request, res : Response ) => {

    const refreshToken = req.headers.authorization?.split(" ")[1];
    
    const decodedClaims : any = Jwt.verify(refreshToken!, process.env.REFRESH_SECERT!)

    console.log(decodedClaims)

    const user = await Users.findById(decodedClaims.id)

    try {

        if(!user){

             return res.status(404).json({

                message : "User id does not find"
             })

        }

        if (user.refreshToken != refreshToken) {
            return res.status(403).json({
              message: "invalid refresh token"
            });
          }

        const accessToken = Jwt.sign({

            id : user._id,
            email : user.email

        },process.env.ACCESS_SECERT!,

        {
            expiresIn : "1m",
            issuer : "http://localhost:3000",
            subject: user._id.toString(),

        })

        return res.json({
            message: "Access Token regenerated successfully",
            data: accessToken

    })
}catch (error) {
    return res.status(500).json(error)
        
    }

}

export default refreshController
