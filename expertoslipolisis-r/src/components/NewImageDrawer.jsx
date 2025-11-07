import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage, fetchImages } from "../redux/slices/imageSlice";
import "./NewImageDrawer.css";

export default function NewImageDrawer({ onClose }) {
  const dispatch = useDispatch();
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (type === "before") {
        setBefore(file);
        setBeforePreview(event.target.result);
      } else {
        setAfter(file);
        setAfterPreview(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChangeImage = (type) => {
    if (type === "before") {
      setBefore(null);
      setBeforePreview(null);
    } else {
      setAfter(null);
      setAfterPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!before || !after) {
      alert("⚠️ Debes subir ambas imágenes (Antes y Después).");
      return;
    }
    if (description.trim().length < 15) {
      alert("⚠️ La descripción debe tener al menos 15 caracteres.");
      return;
    }

    try {
      await dispatch(
        uploadImage({ before, after, description: description.trim() })
      ).unwrap();

      alert("Imagen cargada correctamente ✅ ");

      setTimeout(() => {
        dispatch(fetchImages());
      }, 500);

      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Error al subir la imagen");
    }
  };

  return (
    <div className="drawer-overlay">
      <div className="drawer-panel">
        <div className="drawer-header">
          <h4>Crear Nueva Tarjeta</h4>
          <button className="drawer-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="drawer-body">
          {/* Imagen de Antes */}
          <div className="drawer-section">
            <span className="drawer-image-label before">Imagen de Antes</span>
            <label className="drawer-file-input-wrapper">
              {beforePreview ? (
                <div className="drawer-image-preview">
                  <img src={beforePreview} alt="Vista previa antes" />
                  <span className="drawer-image-preview-text">
                    Imagen seleccionada
                  </span>
                  <button
                    type="button"
                    className="drawer-change-image-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangeImage("before");
                    }}
                  >
                    Cambiar imagen
                  </button>
                </div>
              ) : (
                <>
                  <div className="drawer-file-input-text">
                    Arrastra y suelta o haz clic para subir
                  </div>
                  <div className="drawer-file-input-button">
                    Seleccionar Archivo
                  </div>
                  <input
                    type="file"
                    className="drawer-file-input"
                    onChange={(e) => handleFileChange(e, "before")}
                    accept="image/*"
                  />
                </>
              )}
            </label>
          </div>

          {/* Imagen de Después */}
          <div className="drawer-section">
            <span className="drawer-image-label after">Imagen de Después</span>
            <label className="drawer-file-input-wrapper">
              {afterPreview ? (
                <div className="drawer-image-preview">
                  <img src={afterPreview} alt="Vista previa después" />
                  <span className="drawer-image-preview-text">
                    Imagen seleccionada
                  </span>
                  <button
                    type="button"
                    className="drawer-change-image-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangeImage("after");
                    }}
                  >
                    Cambiar imagen
                  </button>
                </div>
              ) : (
                <>
                  <div className="drawer-file-input-text">
                    Arrastra y suelta o haz clic para subir
                  </div>
                  <div className="drawer-file-input-button">
                    Seleccionar Archivo
                  </div>
                  <input
                    type="file"
                    className="drawer-file-input"
                    onChange={(e) => handleFileChange(e, "after")}
                    accept="image/*"
                  />
                </>
              )}
            </label>
          </div>

          {/* Descripción */}
          <div className="drawer-section">
            <h4 className="drawer-section-title">Descripción</h4>
            <div className="drawer-desc-container">
              <input
                type="text"
                className="drawer-desc-input"
                placeholder="Descripción (máx. 100 caracteres)"
                maxLength={100}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="drawer-char-count">{description.length}/100</div>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            Guardar Tarjeta
          </button>
        </div>
      </div>
    </div>
  );
}
