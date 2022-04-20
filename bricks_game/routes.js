const express = require('express');
const router = express.Router();
const ctrl = require('./canvas');

router.get('/', (req, res) => {
    // let setRow = req.body.row;
    // let setCol = req.body.col;
    // console.log(setRow, setCol);
    res.render('index');
});

// router.post('/start', (req, res) => {
//     let setRow = req.body.row;
//     let setCol = req.body.col;
//     console.log(setRow, setCol);
// });
router.post('/start', ctrl)
module.exports = router;