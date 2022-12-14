const express = require("express")
const commentRouter = express.Router()
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken")




// get all comments 
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
});


// get comments by user Id
commentRouter.get("/user", (req, res, next) => {
    Comment.find({ user: req.user._id }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
});


// add new comment
commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedComment)
    })
});


//delete comment
commentRouter.delete("/:commentID", (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentID, user: req.user._id},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send("you deleted a comment")
        }
    )
});


//update comment
commentRouter.put("/:commentID", (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentID, user: req.user._id },
        req.body,
        {new: true},
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
});




module.exports = commentRouter