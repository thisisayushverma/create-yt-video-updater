import { google } from "../utils/googleOauth.js";
const authChecker = async (req,res,next)=>{
    try {
        const {access_token} =  req.cookies;
        console.log(req);
        if(access_token === undefined){
            console.log("i come here ");
            res.redirect('/auth')
            return;
        }

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({access_token})
        req.oauth2Client=oauth2Client;
        next();
    } catch (error) {
        
    }
}


export {
    authChecker
}