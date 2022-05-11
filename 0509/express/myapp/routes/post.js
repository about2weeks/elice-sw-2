const express = require('express');
const BookSchema = require('../models/book');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('post');
})

router.post('/',(req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const date = req.body.date;
    
   // res.json({name: name, phone:phone, date:date});
    next();
});

// '/' -> expost/addbook
router.post('/addbook', (req, res) => {
    const bookname = req.body.bookname;
    const auther = req.body.auther;
    const price = req.body.price;
    const date = req.body.date;

    let bookData = new BookSchema({
        bookname: bookname,
        auther: auther,
        price: price,
        publish: date
    });

    bookData.save();
    res.redirect('/expost');
});

router.get('/bookinfo/:id', (req, res) => {
    const authorname = req.params.id;

    // Movie.find({ year: { $gte: 1980, $lte: 1989 } }, function(err, arr) {});
    BookSchema.find({ auther: authorname }, (err, result) => {
        if (result) {
            return res.json(result);
        } else {
            return res.send('등록된 작가가 없습니다.');
        }
    });

});



module.exports = router;

