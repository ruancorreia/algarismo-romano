import React from "react";
import ReactDOM from "react-dom/client"; // Para React 18 e superior
import App from "./App";
import "./App.css"; // Importando o arquivo de estilos

// Seleciona o elemento root no HTML
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza o componente App dentro do root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
