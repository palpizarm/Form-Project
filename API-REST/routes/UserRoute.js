const express = require('express');
const router = express.Router();
const User = require('../models/User');
module.exports = router;


//insert user
router.post('/', async (req, res) =>{

    const validacion = await User.count({user:req.body.user});

    if (validacion==0){
        const user = new User({
            user: req.body.user,
            password: req.body.password,
            typeUser: req.body.typeUser
        });
        try{
            const savedUser = await user.save();
            res.json({
                errorCode: 0,
                errorMsg: "",
                data : {
                    "mensaje": "Usuario agregado"
                }
            });
        }
        catch(error){
            res.json({
                errorCode: -1,
                errorMsg: "MongoDB ERROR",
                data : error
            });
    
        }
    }else{
        res.json({
            errorCode: -1,
            errorMsg: "El nombre de Usuario ingresado ya existe",
            data : validacion
        });
    } 
});




//login de usuarios
router.post('/login',async (req,res) => {

    try{
        const user = await User.findOne({$and:[{user:req.body.user},{password:req.body.password}]})
        if (user){
            res.json({
                errorCode: 0,
                errorMsg: "",
                data : {
                    "id": user._id,
                    "user":user.user,
                    "pass": user.password,
                    "type": user.typeUser,
                    "forms":user.forms
                }
            });
        }
        else{
            res.json({
                errorCode: -1,
                errorMsg: "Usuario no encontrado",
                data : user
            });
        }
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "MongoDB ERROR",
            data : error
        });
    }
    
});



//get normal => retorna todos los usuarios existentes
router.get('/',async (req,res) => {
    try{
        const user = await User.find();
        res.json({
            errorCode: 0,
            errorMsg: "",
            data : {
                "usuarios":user      
            }
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "MongoDB ERROR",
            data : error
        });
    }
    
});


//delete => borrar un usuario por ID
router.delete('/:userId',async (req,res) => {
    try{
        const removeUser = await User.remove({_id: req.params.userId});
        const removeForm = await Form.deleteMany({sender: req.body.user});
        const removeApproval = await Approval.deleteMany({sender: req.body.user});
 
        res.json({
            errorCode: 0,
            errorMsg: "",
            data : {
                "mensaje": "Usuario Eliminado"
            }
        });

    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "MongoDB ERROR",
            data : error
        });
    }
    
});
