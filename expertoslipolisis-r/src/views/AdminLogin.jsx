import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/admin-panel");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="admin-login-page">
      <header className="admin-login-header">
        <div className="admin-login-header-container">
          <div className="admin-login-logo">
            <img
              src="/logolipolisislaser.png"
              alt="Logo"
              className="admin-login-logo-img"
            />
            <h1>expertoslipolisis</h1>
          </div>
        </div>
      </header>

      <section className="admin-login-hero">
        <div className="admin-login-box">
          <h2>Panel Administrativo</h2>
          <p>Acceso exclusivo para personal autorizado</p>

          <form onSubmit={handleSubmit}>
            <div className="admin-login-form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="admin@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="admin-login-form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            {error && <p className="admin-login-error">{error}</p>}
          </form>
        </div>
      </section>

      <footer className="admin-login-footer">
        <p>&copy; 2025 Expertos en Lipólisis. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
