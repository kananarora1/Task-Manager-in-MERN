const {axiosInstance} = require('./index')

//Register new User

export const RegisterUser = async (value) => {
    try{
        const response = await axiosInstance.post("/api/users/register", value);
        console.log('Register Response:', response); 
        return response.data;

    }catch(error){
        console.log(error);
    }
}


// login user

export const LoginUser = async (value) =>{
    try {
        const values = {
            email: value.email,
            password: value.password
        }
        const response = await axiosInstance.post("/api/users/login", values);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// get current user from the frontend
export const GetCurrentUser = async () =>{
    try {
        const response = await axiosInstance.get('api/users/currentUser');
        return response.data
    } catch (error) {
       console.log(error)
    }
}






