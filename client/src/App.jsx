import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { LanguageProvider } from "./Components/Language/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes />
      </Router>
    </LanguageProvider>
  );
}

export default App;
