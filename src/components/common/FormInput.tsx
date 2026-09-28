import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  icon,
  isPassword,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || 'input-' + Math.random().toString(36).slice(2, 8);

  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={inputId} className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
          {label}
        </label>
      </div>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-[#64748B] pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          type={effectiveType}
          className={`w-full ${
            icon ? 'pl-10' : 'pl-3.5'
          } ${isPassword ? 'pr-10' : 'pr-3.5'} py-2.5 bg-white border ${
            error ? 'border-[#C62828] focus:border-[#C62828] focus:ring-[#C62828]/20' : 'border-[#0B1F3A]/20 focus:border-[#D4A72C] focus:ring-[#D4A72C]/20'
          } rounded-lg text-sm text-[#172033] placeholder:text-[#64748B]/60 focus:outline-none focus:ring-2 transition-all shadow-xs ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 p-1 text-[#64748B] hover:text-[#0B1F3A] transition-colors rounded"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-[#C62828] font-medium flex items-center gap-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-[#64748B]">{helperText}</p>
      ) : null}
    </div>
  );
};
