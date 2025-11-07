import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchImages, deleteImage } from "../redux/slices/imageSlice";
import ImagesCard from "../components/ImageCard";
import { logout } from "../redux/slices/authSlice";
import "./AdminPanel.css";

import NewImageDrawer from "../components/NewImageDrawer";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);

  const list = useSelector((state) => state.images?.list);
  const loading = useSelector((state) => state.images?.loading);
  const roles = useSelector((state) => state.auth.user?.roles || []);
  const isAdmin = roles.includes("ADMIN");

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin-login");
  };

  const handleAddCard = () => {
    if (!isAdmin) {
      alert("Solo los administradores pueden agregar imágenes.");
    } else {
      setShowDrawer(true);
    }
  };

  const handleDeleteCard = (id) => {
    dispatch(deleteImage(id));
  };

  return (
    <>
      <div className="adminpanel-page">
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
            <h2>Galeria de Imágenes</h2>
            <button
              className="adminpanel-add-btn"
              onClick={handleAddCard}
              disabled={!isAdmin}
            >
              + Agregar Tarjeta
            </button>
          </div>

          <div className="adminpanel-cards-grid">
            {loading ? (
              <p>Cargando...</p>
            ) : (
              list.map((card) => (
                <ImagesCard
                  key={card.id}
                  card={card}
                  onDelete={() => handleDeleteCard(card.id)}
                />
              ))
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
        {showDrawer && <NewImageDrawer onClose={() => setShowDrawer(false)} />}
      </div>
    </>
  );
}
