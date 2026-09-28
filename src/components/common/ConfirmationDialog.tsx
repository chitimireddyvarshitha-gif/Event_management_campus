import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            isDestructive ? 'bg-[#C62828]/10 text-[#C62828]' : 'bg-[#D4A72C]/15 text-[#D4A72C]'
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>
        <p className="text-sm text-[#172033] font-medium leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-[#0B1F3A]/20 text-xs font-bold text-[#0B1F3A] hover:bg-[#0B1F3A]/5 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
              isDestructive
                ? 'bg-[#C62828] text-white hover:bg-[#a82020]'
                : 'bg-[#0B1F3A] text-white hover:bg-[#071426]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
