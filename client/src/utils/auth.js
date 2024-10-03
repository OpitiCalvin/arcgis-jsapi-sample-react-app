import Axios from "axios"
import IdentityManager from "@arcgis/core/identity/IdentityManager";

let tokenExpiration = null;
let lastGoodToken = null;

const appTokenURI = import.meta.env.VITE_APP_TOKEN_URI;

export const requestApplicationToken = () => {
    return new Promise(function (resolve, reject) {
        // if we still have a good token use it
        if(tokenExpiration != null && Date.now() < tokenExpiration){
            resolve(lastGoodToken);
            return;
        }

        // Send request to our authentication endpoint
        let session_id = 1234; // @TODO the same server should assign a session id to each session request
        Axios.post(appTokenURI,{
            nonce: session_id
        }).then(function(response){
            const responseData = response.data;
            if (typeof responseData.error != "undefined") {
                // Errors come back with status 200 so we need to swizzle the real error code from the response body
                const error = new Error(responseData.error.message)
                error.code = responseData.error.code
                reject(error)
            } else {
                // remember the token and when it expires
                lastGoodToken = responseData
                tokenExpiration = new Date(Date.now() + (responseData.expires_in * 1000));
                IdentityManager.registerToken({
                    expires: responseData.expires_in,
                    server: responseData.appTokenBaseURL,
                    ssl: true,
                    token: responseData.access_token,
                    userId: responseData.arcgisUserId
                });
                resolve(lastGoodToken);
            }
        }).catch(function(error){
            reject(error);
        });
    });
};