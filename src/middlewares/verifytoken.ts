import {  Request, Response, NextFunction} from "express";


import Jwt  from "jsonwebtoken";

    const verifyToken =  async(req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.headers.authorization?.split(" ")[1]

    try {

        const decodedClaims : any = Jwt.verify(accessToken!,process.env.ACCESS_SECERT!)
        
        console.log(decodedClaims);


        return next()

       
    }  catch (error) {
       
        return res.status(500).json(error)  
    }

}
export default verifyToken
