import "./Modal.css";

function Modal({ children, openModal, closeModal }) {
  if (!openModal) return null;

  return <div> {children}</div>;
}

export default Modal;
