import "./Modal.css";

function Modal({ children, openModal, closeModal }) {
  if (!openModal) return null;

  return <div> {children}</div>;
}

export default Modal;

// const Modal = ({
//   children,
//   className = "",
//   onClick,
//   variant = "add-employee",
//   ...props
// }) => {
//   const classNames = ["modal", `modal--${variant}`, className]
//     .filter(Boolean)
//     .join(" ");

//     if (!openModal) return null;

//   return (
//     <div className={classNames} {...props} onClick={onClick}>
//       {children}
//     </div>
//   );
// };