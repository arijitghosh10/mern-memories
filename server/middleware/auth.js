import jwt  from "jsonwebtoken";
 
const auth = async(req,res,next) => {
    try {
        const token  = req.headers.authorization.split(" ")[1];
        const isCustomToken = token.length < 500;
        let decodedInfo;
        if(token && isCustomToken){
            decodedInfo = jwt.verify(token, '@rijit');
            req.userId = decodedInfo?.id;
        }else{
            decodedInfo  =jwt.decode(token);
            req.userId = decodedInfo?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;