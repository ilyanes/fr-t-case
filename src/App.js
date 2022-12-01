import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./pages/HomeView/HomeView";
import AddContactView from "./pages/AddContactView/AddContactView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AddContactView />}>
          <Route index element={<HomeView />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </div>
  );
}

export default App;
