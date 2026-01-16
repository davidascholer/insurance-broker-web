import type { ModalState } from "../types";

interface ConfirmModalProps {
  modalState: ModalState;
  onClose: () => void;
  onInputChange?: (value: string) => void;
}

export const ConfirmModal = ({
  modalState,
  onClose,
  onInputChange,
}: ConfirmModalProps) => {
  if (!modalState.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-(--primary-teal-dark) sansita-bold">
            {modalState.title}
          </h2>
          {modalState.message && (
            <p className="text-sm text-gray-600 mt-2">{modalState.message}</p>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {modalState.type === "prompt" && (
            <input
              type="text"
              value={modalState.inputValue}
              onChange={(e) => onInputChange?.(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  modalState.onConfirm(modalState.inputValue);
                  onClose();
                } else if (e.key === "Escape") {
                  modalState.onCancel();
                  onClose();
                }
              }}
              autoFocus
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--primary-teal)"
              placeholder="Enter URL..."
            />
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => {
              modalState.onCancel();
              onClose();
            }}
            className="px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              modalState.onConfirm(modalState.inputValue);
              onClose();
            }}
            className="px-6 py-2 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
          >
            {modalState.type === "confirm" ? "Delete" : "OK"}
          </button>
        </div>
      </div>
    </div>
  );
};
