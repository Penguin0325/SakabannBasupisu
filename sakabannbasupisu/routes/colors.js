const express = require("express");
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("colors/add");
});

router.post('/', async function(req, res, next) {
    prisma.words.create({
        data:{
            word: req.body.word
        }
    })
    .then(()=> {
        res.redirect('/sakabann');
    });
});

module.exports = router;