import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { InternalComponentItem } from "../utils/internal-types";

interface EditModalProps {
  editingComponent: InternalComponentItem;
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
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Separate className from other props
  const regularProps = Object.entries(editingComponent.props).filter(
    ([key]) => {
      // Hide children field for SectionContainer
      if (
        editingComponent.type === "SectionContainer" &&
        key === "children"
      ) {
        return false;
      }
      // Filter out className for Advanced section
      if (key === "className") {
        return false;
      }
      return true;
    }
  );

  const advancedProps = Object.entries(editingComponent.props).filter(
    ([key]) => key === "className"
  );

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
            {/* Regular Props */}
            {regularProps.map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                {renderPropEditor(key, value)}
              </div>
            ))}

            {/* Advanced Section */}
            {advancedProps.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="flex items-center gap-2 text-sm font-semibold text-(--primary-teal-dark) hover:text-(--primary-teal) transition-colors"
                >
                  {advancedOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  Advanced
                </button>
                
                {advancedOpen && (
                  <div className="mt-4 space-y-4">
                    {advancedProps.map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        {renderPropEditor(key, value)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
