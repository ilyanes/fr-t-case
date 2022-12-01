import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ children, handleClick }) {
  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      handleClick();
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      handleClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.content}>{children}</div>
    </div>,
    modalRoot
  );
}
