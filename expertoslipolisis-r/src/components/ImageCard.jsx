import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage } from "../redux/slices/imageSlice";
import "./ImageCard.css";

export default function ImagesCard({ card, onDelete }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [description, setDescription] = useState(card.description || "");
  const isAdmin = user?.roles?.includes("ADMIN");

  useEffect(() => {
    setDescription(card.description || "");
  }, [card.description]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Seguro que desea eliminar esta tarjeta?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteImage(card.id)).unwrap();
      alert("Tarjeta eliminada correctamente 🗑️");
    } catch (err) {
      console.error("❌ Error al eliminar tarjeta:", err);
      alert("Error al eliminar tarjeta");
    }
  };

  return (
    <div className="image-card">
      <div className="before-after-image">
        {/* Imagen Antes */}
        <div className="image-placeholder-image before-image">
          {card.beforeUrl ? (
            <div className="image-wrapper">
              <img src={card.beforeUrl} alt="Antes" />
            </div>
          ) : (
            <div className="image-placeholder-text">Antes</div>
          )}
        </div>

        {/* Imagen Después */}
        <div className="image-placeholder-image after-image">
          {card.afterUrl ? (
            <div className="image-wrapper">
              <img src={card.afterUrl} alt="Después" />
            </div>
          ) : (
            <div className="image-placeholder-text">Después</div>
          )}
        </div>
      </div>

      {/* Descripción - SOLO LECTURA */}
      <div className="desc-row">
        <div className="description-text">{description}</div>
      </div>

      {/* Solo botón Eliminar */}
      <div className="card-actions">
        {isAdmin && (
          <button className="btn-delete-image" onClick={handleDelete}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
