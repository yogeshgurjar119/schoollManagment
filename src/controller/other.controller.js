const { error } = require("console");
const connection = require("../config/connection");

const {isEmailValid} = require("../helper/validation.helper");



const addSchool = async(req,res)=>{
    try{
        const userId = req.userId;
        const {name} = req.body;
        // console.log(req);
        if(userId && name  && req.file.filename){
                const image = req.file.filename;
                
                const userQuery = 'INSERT INTO schools (name, photo) VALUES (?, ?)';
                connection.query(userQuery, [name, image], (userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                const  parentCode  = "REFP" + userResults.insertId + Date.now();
                const  teacherCode  = "REFT" + userResults.insertId + Date.now();
                    // Insert teacher role
                    const AdminRoleQuery = 'INSERT INTO user_school_roles (user_id, school_id, role,uniquId) VALUES (?, ?, ?,?)';
                    connection.query(AdminRoleQuery, [userId, userResults.insertId, 'admin',userId], (teacherRoleErr) => {
                        if (teacherRoleErr) {
                            console.log(teacherRoleErr)
                            return res.status(500).json({
                                status : false,
                                messae : "Internal Server Error",
                            })
                        }

                   // Insert parent role
                   const parentRoleQuery = 'INSERT INTO user_school_roles (user_id, school_id, role,uniquId) VALUES (?, ?, ?,?)';
                    connection.query(parentRoleQuery, [userId, userResults.insertId, 'parent',parentCode], (parentRoleErr) => {
                    if (parentRoleErr) {
                        return res.status(500).json({
                            status : false,
                            messae : "Internal Server Error",
                        });
                    }
                
                    // Insert teacher role
                    const teacherRoleQuery = 'INSERT INTO user_school_roles (user_id, school_id, role,uniquId) VALUES (?, ?, ?,?)';
                    connection.query(teacherRoleQuery, [userId, userResults.insertId, 'teacher',teacherCode], (teacherRoleErr) => {
                        if (teacherRoleErr) {
                            return res.status(500).json({
                                status : false,
                                messae : "Internal Server Error",
                            })
                        }
                
                  return res.json({ message: 'school created successfully', schoolId: userResults.insertId });
                });
            });
        });
    });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const getSchool = async(req,res)=>{
    try{
        const userId = req.userId;
        const code = req.code;
        if(userId){
            const query = `SELECT * FROM user_school_roles where  uniquId = ?`;
                connection.query(query,[code],(result, userResult) => {
                    if (result) {
                        console.error('Error logging in:', result);
                        return res.status(500).json({    
                            status : false,
                            messae : "Internal Server Error", });
                    }
                    // console.log(userResult)
                    if(userResult.length > 0){
                            const loginQuery = 'SELECT * FROM schools Where id =?'
                            connection.query(loginQuery, [userResult[0].id], (erro, schoolResopnse) => {
                            if (erro) {
                                console.error('Error logging in:', erro);
                                return res.status(500).json({    
                                    status : false,
                                    messae : "Internal Server Error", });
                            }
                            console.log(schoolResopnse);
                            return  res.status(200).json({ 
                                status : true,
                                messae : "login successful",
                                token: schoolResopnse 
                            });
                         });
                    }else{
                        return res.status(200).json({
                            status : success,
                            messae : "No Data found",
                            data : null
                        })
                    }
            });

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


const addClass = async(req,res)=>{
    try{
        const userId = req.userId;
        const {name,schoolId} = req.body;
        // console.log(req);
        if(userId && name  && schoolId){
                const userQuery = 'INSERT INTO class (name, school_id) VALUES (?, ?)';
                connection.query(userQuery, [name, schoolId], (userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                  return res.json({ message: 'class created successfully', schoolId: userResults.insertId });
                });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const getClass = async(req,res)=>{
    try{
        const userId = req.userId;
        const {schoolId} = req.body;
        // console.log(req);
        if(userId  && schoolId){
                const userQuery = 'Select * from class where school_id = ?';
                connection.query(userQuery, [schoolId], (userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                  return res.json({ message: 'fetch successfully', schoolId: userResults});
                });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const addStudent = async(req,res)=>{
    try{
        const userId = req.userId;
        const {name} = req.body;
        // console.log(req);
        if(userId && name  && req.file.filename){
                const image = req.file.filename;
                
                const userQuery = 'INSERT INTO student (name, photo) VALUES (?, ?)';
                connection.query(userQuery, [name, image], (userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                  return res.json({ message: 'student created successfully', schoolId: userResults.insertId });
                });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const getStudent = async(req,res)=>{
    try{
        const userId = req.userId;
        if(userId){
                const userQuery = 'Select * from  student';
                connection.query(userQuery, (userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                  return res.json({ message: 'student fetch successfully', data: userResults });
                });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const assignClass = async(req,res)=>{
    try{
        const userId = req.userId;
        const {classId,studentId} = req.body;
        if(userId && classId && studentId){
                const userQuery = 'INSERT INTO class_students (class_id, student_id) VALUES (?, ?)';
                connection.query(userQuery,[classId,studentId], (userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                  return res.json({ message: 'assign  student successfully', data: userResults.insertId });
                });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const getAllClassStudent = async(req,res)=>{
    try{
        const userId = req.userId;
        if(userId){
                const userQuery = 'SELECT s.* FROM student s JOIN class_students cs ON s.id = cs.student_id Group By s.id';
                connection.query(userQuery, (userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                  return res.json({ message: 'student fetch successfully', data: userResults });
                });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


const getClassmates = async(req,res)=>{
    try{
        const {studentId} = req.body;
        const userId = req.userId;
        if(userId && studentId){
                const userQuery = 'SELECT s.* FROM student s JOIN class_students cs ON s.id = cs.student_id WHERE cs.class_id IN (SELECT class_id FROM class_students WHERE student_id = ?) AND s.id != ?';
                connection.query(userQuery,[studentId, studentId],(userErr, userResults) => {
                if (userErr) {
                    console.error('Error creating user:', userErr);
                    return res.status(500).json({
                        status : false,
                        messae : "Internal Server Error",
                    })
                }  
                  return res.json({ message: 'student fetch successfully', data: userResults });
                });
        }else{
            return res.status(400).json({
                status : false,
                messae : "Bad Request",
            })
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            status : false,
            messae : "Internal Server Error",
        })
    }
}


module.exports = {
    addSchool,
    getSchool,
    addClass,
    getClass,
    addStudent,
    getStudent,
    assignClass,
    getAllClassStudent,
    getClassmates
}
