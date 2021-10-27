//Imports.
const express = require('express');
const router = express.Router();
const User = require('../models/User');
module.exports = router;


/*
Method: GET.
Description: Returns all existing users.
Request URL: http://localhost:3000/users/
*/
router.get('/', async (req, res) => {

    try{
        const user = await User.find();
        res.json({
            code: 0,
            msg: "",
            data: user
        });

    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB ERROR",
            data: error
        });

    }
    
});


/*
Method: POST.
Description: Register a new user.
Request URL: http://localhost:3000/users/
*/
router.post('/', async (req, res) =>{

    const validacion = await User.count({user: req.body.user});

    //Validates that the username does not exist.
    if (validacion == 0){

        const user = new User({
            user: req.body.user,
            password: req.body.password,
            typeUser: req.body.typeUser
        });

        try{
            const savedUser = await user.save();
            res.json({
                code: 0,
                msg: "Usuario creado con éxito.",
                data: savedUser
            });

        }
        catch(error){
            res.json({
                code: -1,
                msg: "MongoDB ERROR",
                data: error
            });
    
        }

    }else{
        res.json({
            code: -1,
            msg: "El nombre de usuario ingresado ya existe.",
            data : ""
        });

    }

});


/*
Method: POST.
Description: User login in the system.
Request URL: http://localhost:3000/users/login
*/
router.post('/login', async (req, res) => {

    try{
        const user = await User.findOne({$and: [{user: req.body.user}, {password: req.body.password}]})

        //Validates that the user does exist.
        if (user){

            res.json({
                code: 0,
                errorMsg: "",
                data: {
                    "id": user._id,
                    "user": user.user,
                    "pass": user.password,
                    "type": user.typeUser,
                    "forms": user.forms
                }
            });

        }
        else{
            res.json({
                code: -1,
                errorMsg: "El usuario no existe.",
                data: ""
            });
        }

    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB ERROR",
            data: error
        });
    }
    
});


/*
Method: DELETE.
Description: Delete a user by their id.
Request URL: http://localhost:3000/users/:userId
*/
router.delete('/:userId', async (req, res) => {

    try{
        const removeUser = await User.remove({_id: req.params.userId});
        const formCount = Form.count({sender:req.body.user})
        if (formCount != 0) {
            const removeForm = await Form.deleteMany({sender: req.body.user});
            const removeApproval = await Approval.deleteMany({sender: req.body.user});
        }
        
 
        res.json({
            code: 0,
            msg: "Usuario eliminado con éxito.",
            data : ""
        });

    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "MongoDB ERROR",
            data: error
        });
    }
    
});