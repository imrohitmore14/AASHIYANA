import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <App />
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossOrigin="anonymous"
/>
  </React.StrictMode>
  
);
