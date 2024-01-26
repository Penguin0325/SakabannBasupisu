// router/sakaban.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
      const words = await prisma.words.findMany();
      
      // ランダムなインデックスを生成
      const randomIndex = Math.floor(Math.random() * words.length);
      
      // ランダムに選ばれた単語を取得
      const randomWord = words[randomIndex];

      // res.localsからcolorValueを取得
      const colorValue = res.locals.colorValue;

      res.render('sakaban', { randomWord, colorValue  });
    } catch (error) {
      console.error('Error fetching words:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;




// const express = require('express');
// const { PrismaClient } = require('@prisma/client');

// const router = express.Router();
// const prisma = new PrismaClient();

// // '/sakaban'エンドポイントでwordsモデルのデータを取得
// router.get('/', async (req, res) => {
//   try {
//     const words = await prisma.words.findMany();
//     // res.json(words);
//     res.render("public/index.html", words);
//   } catch (error) {
//     console.error('Error fetching words:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;

