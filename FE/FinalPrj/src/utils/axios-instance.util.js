import axios from "axios";
import {BASE_URL} from "./api-path.util.js";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});


instance.interceptors.request.use(
    (config)=>{ 
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.response.status===401){
            console.log("Unauthorized");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }   
        return Promise.reject(error);
    }
);

export default instance;
