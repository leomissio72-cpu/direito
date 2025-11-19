// backend/routes/uploads.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { processId } = req.body;
    
    const newImage = new Image({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      processId: processId,
      clientId: req.clientId // Definido no middleware de autenticação
    });

    await newImage.save();
    res.status(201).json({ message: 'Imagem salva com sucesso!', image: newImage });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar imagem' });
  }
});

module.exports = router;
