import React from 'react';
import ReactDOM from 'react-dom';

const myElement = /*#__PURE__*/React.createElement("h1", null, "I Love JSX!");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(myElement);
