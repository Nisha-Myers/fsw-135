const express = require('express');
const router = express.Router();
const Articles = require('../models/articles');



//GET ALL Articles
router.get('/', (req, res) => {
    Articles.find()
    .then(article => res.json(article))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

//GET specific Article by ID
router.get('/:id', (req, res) =>{
    Articles.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json(`Error: ${err}`))
});


//POST New Articles
router.post('/add', (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname
    })

    newArticle.save()
    .then(() =>res.json("The new article posted successfully."))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

//PUT or Update Articles
router.put('/update/:id', (req, res) => {
    Articles.findById(req.params.id)
    .then(article => {
        article.title = req.body.title;
        article.article = req.body.article;
        article.authorname = req.body.authorname;

        article
        .save()
        .then(() => res.json("Article UPDATED successfully!"))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
});

//DELETE an Article
router.delete('/delete/:id', (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json("Article DELETED successfully!"))
    .catch(err => res.status(400).json(`Error: ${err}`))
});



module.exports = router;