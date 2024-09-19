import React from 'react';
import ReactDOM from 'react-dom/client';
import png from "../public/file.png";
import jpg from "../public/file.jpg";
import svg from "../public/file.svg";

// Create an array of image objects
const images = [
  { title: "PNG Image", src: png },
  { title: "JPG Image", src: jpg },
  { title: "SVG Image", src: svg }
];

// ImageGallery Component
function ImageGallery() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {images.map((image, index) => (
        <div key={index} style={{ textAlign: "center", margin: "10px" }}>
          <h2>{image.title}</h2>
          <img src={image.src} width="150" alt={image.title} />
        </div>
      ))}
    </div>
  );
}

// Main App Component
function App() {
  return (
    <React.StrictMode>
      <h1>I Love JSX!</h1>
      <ImageGallery />
    </React.StrictMode>
  );
}

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);