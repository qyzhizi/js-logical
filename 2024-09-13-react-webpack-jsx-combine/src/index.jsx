import React from 'react';
import ReactDOM from 'react-dom/client';
import png from "../public/file.png";
import jpg from "../public/file.jpg";
import svg from "../public/file.svg";

// Create an array of image objects
const images = [
  { title: "PNG Image", src: png },
  { title: "JPG Image", src: jpg },
  { title: "SVG Image", src: svg },
  { title: "SVG Image2", src: svg }
];

// ImageGallery Component
function ImageGallery() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* 新添加的 div */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1>欢迎来到我的图片画廊</h1>
        <p>这里展示了一些我最喜欢的图片。</p>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        {images.map((image, index) => (
          <div key={index} style={{ textAlign: "center", margin: "10px" }}>
            <h2>{image.title}</h2>
            <img src={image.src} width="150" alt={image.title} />
          </div>
        ))}
      </div>
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
