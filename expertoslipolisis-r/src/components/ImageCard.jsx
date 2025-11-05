import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, deleteImage } from "../redux/slices/imageSlice";
import "./ImageCard.css";

export default function ImagesCard({ card }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [beforeUrl, setBeforeUrl] = useState(card.beforeUrl || null);
  const [afterUrl, setAfterUrl] = useState(card.afterUrl || null);
  const [description, setDescription] = useState(card.description || "");

  const isAdmin = user?.role === "ADMIN";

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "before") {
      setBefore(file);
      const reader = new FileReader();
      reader.onload = (ev) => setBeforeUrl(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setAfter(file);
      const reader = new FileReader();
      reader.onload = (ev) => setAfterUrl(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type) => {
    if (type === "before") {
      setBefore(null);
      setBeforeUrl(null);
    } else {
      setAfter(null);
      setAfterUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!isAdmin) {
      alert("⚠️ Solo un administrador puede subir imágenes.");
      return;
    }

    if (!before && !beforeUrl) {
      alert("⚠️ Debes subir la imagen 'Antes'.");
      return;
    }
    if (!after && !afterUrl) {
      alert("⚠️ Debes subir la imagen 'Después'.");
      return;
    }
    if (!description.trim()) {
      alert("⚠️ Ingresa una descripción.");
      return;
    }

    try {
      await dispatch(
        uploadImage({
          before: before,
          after: after,
          description: description.trim(),
        })
      ).unwrap();

      alert("✅ Imagen guardada correctamente");
    } catch (err) {
      console.error("❌ Error al subir imagen:", err);
      alert(`Error al subir la imagen.\n(${err.message || err})`);
    }
  };

  const handleDelete = async () => {
    if (!isAdmin) {
      alert("⚠️ Solo un administrador puede eliminar imágenes.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar esta tarjeta?"
    );
    if (!confirmDelete) return;

    try {
      if (card.id) {
        await dispatch(deleteImage(card.id)).unwrap();
        alert("🗑️ Tarjeta eliminada correctamente");
      }
    } catch (err) {
      console.error("❌ Error al eliminar tarjeta:", err);
      alert("Error al eliminar tarjeta.");
    }
  };

  return (
    <div className="image-card">
      <div className="before-after-image">
        {/* Imagen Antes */}
        <div className="image-placeholder-image before-image">
          {beforeUrl ? (
            <div className="image-wrapper">
              <img src={beforeUrl} alt="Antes" />
              <button
                className="remove-image"
                onClick={() => handleRemoveImage("before")}
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="upload-label">
              <span>Subir Imagen</span>
              <input
                type="file"
                className="file-input"
                onChange={(e) => handleFileChange(e, "before")}
              />
            </label>
          )}
        </div>

        {/* Imagen Después */}
        <div className="image-placeholder-image after-image">
          {afterUrl ? (
            <div className="image-wrapper">
              <img src={afterUrl} alt="Después" />
              <button
                className="remove-image"
                onClick={() => handleRemoveImage("after")}
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="upload-label">
              <span>Subir Imagen</span>
              <input
                type="file"
                className="file-input"
                onChange={(e) => handleFileChange(e, "after")}
              />
            </label>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div className="desc-row">
        <input
          type="text"
          placeholder="Descripción..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Botones */}
      <div className="card-actions">
        <button className="btn-upload-image" onClick={handleUpload}>
          Subir Imágenes
        </button>
        <button className="btn-delete-image" onClick={handleDelete}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}
