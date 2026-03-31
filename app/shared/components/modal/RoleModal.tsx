import { useState, useCallback } from "react";
import styles from "./RoleModal.module.css";
import Container from "~/shared/components/container/Container";
import CustomButton, { type CustomButtonProps } from "~/shared/components/customButton/CustomButton";
import { useAppStore } from "~/shared/stores/useAppStore";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string }) => Promise<void>;
  initialData?: { name: string };
  isLoading?: boolean;
}

export default function RoleModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false,
}: RoleModalProps) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [error, setError] = useState<string | null>(null);
  const { showNotification, hideNotification } = useAppStore(
    (state) => state.notification && {
      showNotification: state.showNotification,
      hideNotification: state.hideNotification
    }
  ) ?? { showNotification: () => {}, hideNotification: () => {} };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSave({ name });
      hideNotification();
      showNotification({
        message: "Role saved successfully",
        type: "success",
        duration: 3000
      });
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      showNotification({
        message: `Error: ${message}`,
        type: "error",
        duration: 5000
      });
    }
  }, [name, onSave, showNotification, hideNotification, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.backdrop} fixed inset-0 z-50 flex items-center justify-center bg-black/50`}>
      <div className={`${styles.modal} bg-white rounded-lg w-full max-w-md p-6`}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{initialData ? "Edit Role" : "New Role"}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : ""}`}
              placeholder="Enter role name"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50`}
            >
              {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}