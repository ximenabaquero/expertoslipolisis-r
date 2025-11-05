import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import AdminLogin from "./views/AdminLogin";
import AdminPanel from "./views/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Login administrador */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Panel administrador */}
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
