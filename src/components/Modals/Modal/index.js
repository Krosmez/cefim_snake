import "./style.css";

const Modal = ({ children, modalHeader  }) => {

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h1>{modalHeader && modalHeader}</h1>
        </div>
        <div className="modal-background"></div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
