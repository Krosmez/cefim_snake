import "./style.css";

import { useGlobalContext } from "../../../context/GlobalContext";

const Modal = ({ children, modalHeader }) => {
  const { dispatch } = useGlobalContext();

  const handleClose = () => {
    dispatch({
      type: "HANDLE_MODAL",
      payload: null,
    });
  };

  return (
    <div className="modal-overlay">
      <div className={`modal`}>
        <div className="modal-header">
          {modalHeader && modalHeader}
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={handleClose}
          >
            x
          </button>
        </div>
        <div className="modal-background" onClick={handleClose}></div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};
export default Modal;
