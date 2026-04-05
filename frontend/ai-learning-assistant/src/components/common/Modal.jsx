import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      
      {/* FULL SCREEN OVERLAY */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* CENTER MODAL */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 z-10">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold mb-4">{title}</h2>

          <div className="max-h-[70vh] overflow-y-auto">
            {children}
          </div>

        </div>
      </div>
    </div>,
    document.body 
  );
};

export default Modal;