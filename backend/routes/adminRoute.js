const express = require('express');
const User = require('../models/User');
const {isLoggedIn,admin} = require('../middleware/authMiddleWare');
const router = express.Router();



// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @access Private/Admin

router.get("/",isLoggedIn,admin, async (req, res) => {
    try {
        const users =await User.find({});
        res.status(201).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});

// @route POST /api/admin/users
// @desc Add new user (Admin only)
// @access Private/Admin

router.post("/",isLoggedIn,admin, async (req, res) => {
    const {name,email,password,role}=req.body;
    try {
        let user =await User.findOne({email});
        if(user) return res.status(400).json({ message: "User already exists" });

        user=new User({name,email,password,role:role || "customer"});
        await user.save();
        res.status(201).json({message:"User created successfully",user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});

// @route PUT /api/admin/users/:id
// @desc Update user (Admin only)- Name,email,role
// @access Private/Admin

router.put("/:id",isLoggedIn,admin, async (req, res) => {
    try {
        const {name,email,role}=req.body;
        let user =await User.findById(req.params.id);
        if(!user) return res.status(400).json({ message: "User doesn't exists" });

        if(user){
            user.name=name || user.name;
            user.email=email || user.email;
            user.role=role || user.role;
        }
        
        let updatedUser = await user.save();
        res.json({message:"User updated successfully",updatedUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});

// @route DELETE /api/admin/users/:id
// @desc Delete user (Admin only)
// @access Private/Admin

router.delete("/:id",isLoggedIn,admin, async (req, res) => {
    try {
        let user =await User.findById(req.params.id); 

        if(user){
            await user.deleteOne();
            res.json({message:"User deleted successfully",user});
        }else{
            res.status(400).json({ message: "User not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});

module.exports=router;