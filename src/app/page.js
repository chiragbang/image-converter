// pages/index.js
"use client"
import React, { useState } from 'react';
import "./Page.css"

const ImageConverter = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [convertedImage, setConvertedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const convertImage = () => {
    if (!selectedImage) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);

    reader.onload = () => {
      const convertedImage = reader.result.replace(/^data:image\/[a-z]+;base64,/, '');
      setConvertedImage(convertedImage);
    };

    reader.onerror = (error) => {
      console.error('Error converting image:', error);
    };
  };

  const downloadImage = () => {
    if (!convertedImage) return;

    const link = document.createElement('a');
    link.href = `data:image/${selectedFormat};base64,${convertedImage}`;
    link.download = `converted_image.${selectedFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>Image Extension Converter</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div className="select-container">
        <label>Choose format:</label>
        <select value={selectedFormat} onChange={handleFormatChange}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="gif">GIF</option>
          {/* Add more supported formats here */}
        </select>
      </div>
      <button onClick={convertImage}>Convert Image</button>
      {convertedImage && (
        <div className="image-container">
          <h2>Converted Image:</h2>
          <img src={`data:image/${selectedFormat};base64,${convertedImage}`} alt="Converted" />
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
