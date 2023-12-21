const connection = require("../config/connection");

const {isEmailValid} = require("../helper/validation.helper");

const {createToken} = require("../helper/token.helper")

const registation = async(req,res)=>{
    try{
        const {name,email,password,code} = req.body;
        // console.log(req.file);
        if(name && email && password && req.file.filename){
            if(isEmailValid(email)){
                const image = req.file.filename;
                if(code){
                    const userQuery = 'INSERT INTO users (name, email, password, photo,code) VALUES (?, ?, ?, ?, ?)';
                    connection.query(userQuery, [name, email, password, image,code], (userErr, userResults) => {
                    if (userErr) {
                        console.error('Error creating user:', userErr);
                        return res.status(500).json({
                            status : false,
                            messae : "Internal Server Error",
                        })
                    }   
                    // connection.release();
                    return res.json({ message: 'User signed up successfully', userId: userResults.insertId });
                    });
                }else{
                    const userQuery = 'INSERT INTO users (name, email, password, photo) VALUES (?, ?, ?, ?, ?)';
                    connection.query(userQuery, [name, email, password, image], (userErr, userResults) => {
                    if (userErr) {
                        console.error('Error creating user:', userErr);
                        return res.status(500).json({
                            status : false,
                            messae : "Internal Server Error",
                        })
                    }   
                    // connection.release();
                    return res.json({ message: 'User signed up successfully', userId: userResults.insertId });
                    });
                }
              
            }else{
                return res.status(201).json({
                    status : false,
                    messae : "Invalid email address",
                })
            }
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const login = async(req,res)=>{
    try{
        const { email, password } = req.body;
        if(email && password){
            if(email){
                const loginQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
                connection.query(loginQuery, [email, password], (loginErr, loginResults) => {
                if (loginErr) {
                    console.error('Error logging in:', loginErr);
                    return res.status(500).json({    
                        status : false,
                        messae : "Internal Server Error", });
                }
                if (loginResults.length === 0) {
                    res.status(201).json({ 
                        status : false,
                        messae : "Invalid credentials" });
                    return;
                }
                console.log(loginResults[0].id);
                const user = {
                    userId :loginResults[0].id,
                    code : loginResults[0].code,
                }
               const token =   createToken(user);
                // connection.release();

                return  res.status(200).json({ 
                    status : true,
                    messae : "login successful",
                    token: token });
                });
        }else{
            return res.status(201).json({
                status : false,
                messae : "Invalid email address",
            })
        }
    }else{
        return res.status(400).json({
            status : false,
            messae : "Bad Request",
        })
    }
    }catch(e){
        console.log(e)
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}

const getDetails = async(userId)=>{
    try{
        return new Promise((resolve, reject) => {
        const loginQuery = 'SELECT * FROM users WHERE id =?';
        connection.query(loginQuery, [userId], async(loginErr, loginResults) => {
        if (loginErr) {
            console.error('Error logging in:', loginErr);
            resolve({    
                status : false,
                messae : "Internal Server Error",
                 data : null 
                 })
        }
        // console.log(loginResults)
        if(loginResults.length > 0){
        // console.log(loginResults)
        resolve ({ 
                status : true,
                messae : "login successful",
                data :loginResults[0].id
             })
        }else{
            resolve ({ 
                status : false,
                messae : "not Found",
                  data : null 
             })
         }
        })
    });
     
    }catch(e){
        console.log(e)
        return {
            status : false,
            messae : "Internal Server Error",
            data : null 

        }
    }
}

module.exports = {
    registation,login,
    getDetails
}
