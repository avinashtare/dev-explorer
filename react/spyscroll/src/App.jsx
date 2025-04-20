import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import OnThisPage from "./OnThisPage";
import Home from "./Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="doc-page">
      <Home />
      <OnThisPage />
    </div>
  );
}

export default App;
