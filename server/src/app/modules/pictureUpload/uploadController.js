'use strict';
const catchAsync = require('../../../utils/catchAsync');
const FileModel = require('./FileModel');
const fs = require('fs');
const cloudinary = require('../../../utils/cloudinary');

const uploadFile = catchAsync(async (req, res) => {
  const localFilePath = req.file.path;

  // 1. Upload to cloudinary
  const cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
    folder: 'uploads', // optional folder on cloudinary
  });

  // 2. Save to DB
  const file = await FileModel.create({
    name: req.file.filename,
    endpoint: cloudinaryResult.public_id,
    url: cloudinaryResult.secure_url,
  });

  // 3. Delete local file
  fs.unlinkSync(localFilePath);

  // 4. Response
  res.status(200).json({
    success: true,
    body: { name: file.name, url: file.url },
  });
});

module.exports = {
  uploadFile,
};

module.exports = {
  uploadFile,
};
