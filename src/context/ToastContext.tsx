import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = 'toast-' + Math.random().toString(36).slice(2, 9);
    const newToast: ToastMessage = { id, type, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Notification Container */}
      <div 
        aria-live="polite" 
        className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => {
          let borderClass = 'border-[#0B1F3A]/20';
          let icon = <Info className="w-5 h-5 text-[#0B1F3A] shrink-0" />;
          let bgClass = 'bg-white';

          if (toast.type === 'success') {
            borderClass = 'border-[#198754]/30';
            icon = <CheckCircle2 className="w-5 h-5 text-[#198754] shrink-0" />;
          } else if (toast.type === 'error') {
            borderClass = 'border-[#C62828]/30';
            icon = <AlertCircle className="w-5 h-5 text-[#C62828] shrink-0" />;
          } else if (toast.type === 'warning') {
            borderClass = 'border-[#D4A72C]/40';
            icon = <AlertTriangle className="w-5 h-5 text-[#D4A72C] shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${borderClass} ${bgClass} shadow-lg shadow-black/5 text-[#172033] transition-all transform animate-in slide-in-from-top-2 duration-200`}
            >
              {icon}
              <div className="flex-1 text-sm font-medium leading-snug">
                {toast.message}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-[#64748B] hover:text-[#172033] transition-colors p-0.5 rounded"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
