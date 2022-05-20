const { Router } = require('express');
const Note = require('../models/note');

const router = Router();

router.get('/', (req, res, next) =>{
   const authors = Note.authorList();
   res.json(authors);
});

router.get('/:author/notes', (req, res, next) =>{
    try{
        const notes = Note.findByAuthor(req.params.author);
    res.json(notes);
    }catch(e){
        next(e);
    }
    
    
});

module.exports = router;