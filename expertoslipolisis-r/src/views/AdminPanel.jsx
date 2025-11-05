import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchImages, deleteImage } from "../redux/slices/imageSlice";
import ImagesCard from "../components/ImageCard";
import { logout } from "../redux/slices/authSlice";
import "./AdminPanel.css";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading } = useSelector(
    (state) => state.images || { list: [], loading: false }
  );
  const roles = useSelector((state) => state.auth.user?.roles || []);
  const isAdmin = roles.includes("ADMIN");

  const [localCards, setLocalCards] = useState([]);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleAddCard = () => {
    if (!isAdmin) {
      alert("⚠️ No tienes permisos para crear imágenes.");
      return;
    }
    const newCard = {
      id: `temp-${Date.now()}`,
      beforeUrl: null,
      afterUrl: null,
      description: "",
    };
    setLocalCards((prev) => [...prev, newCard]);
  };

  const handleDeleteCard = (id) => {
    if (!isAdmin) {
      alert("⚠️ No tienes permisos para eliminar imágenes.");
      return;
    }
    dispatch(deleteImage(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin-login");
  };

  return (
    <div className="adminpanel-page">
      {/* 🔹 Botón fijo de cerrar sesión */}
      <button className="logout-fixed-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>

      <header className="adminpanel-header">
        <div className="adminpanel-container">
          <div className="adminpanel-logo">
            <img
              src="/logolipolisislaser.png"
              alt="Logo"
              className="adminpanel-logo-img"
            />
            <h1>Panel del Administrador</h1>
          </div>
        </div>
      </header>

      <section className="adminpanel-gestion">
        <div className="adminpanel-topbar">
          <h2>Gestión de Imágenes</h2>
          <button
            className="adminpanel-add-btn"
            onClick={handleAddCard}
            disabled={!isAdmin}
          >
            + Agregar tarjeta
          </button>
        </div>

        <div className="adminpanel-cards-grid">
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              {list.map((card) => (
                <ImagesCard
                  key={card.id}
                  card={card}
                  onDelete={() => handleDeleteCard(card.id)}
                  isAdmin={isAdmin}
                />
              ))}
              {localCards.map((card) => (
                <ImagesCard key={card.id} card={card} isAdmin={isAdmin} />
              ))}
            </>
          )}
        </div>
      </section>

      <footer className="adminpanel-footer">
        <div className="footer-bottom">
          <p>
            &copy; 2024 Expertos en Lipólisis. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
