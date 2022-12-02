import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./pages/HomeView/HomeView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
