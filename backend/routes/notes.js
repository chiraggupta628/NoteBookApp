const express = require('express')
const router = express.Router();

router.get('/',(req,res) => {
    var a = {A : "A", B : "B"};
    res.json(a);
})

module.exports = router