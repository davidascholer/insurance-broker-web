import { X } from "lucide-react";
import type { ComponentItem } from "../types";

interface EditModalProps {
  editingComponent: ComponentItem;
  onCancel: () => void;
  onSave: () => void;
  renderPropEditor: (key: string, value: unknown) => React.ReactNode;
}

export const EditModal = ({
  editingComponent,
  onCancel,
  onSave,
  renderPropEditor,
}: EditModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-(--primary-teal-dark) sansita-bold">
              Edit {editingComponent.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Update the properties below
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {Object.entries(editingComponent.props).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {renderPropEditor(key, value)}
                <p className="text-xs text-gray-500 mt-1">
                  Type: {Array.isArray(value) ? "array" : typeof value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
