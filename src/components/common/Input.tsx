import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, type = 'text', className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error && inputId ? `${inputId}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-[var(--color-muted)]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-faint)]">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={cn(
              'focus-ring h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/[0.03] px-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-faint)] transition-colors',
              'hover:border-white/20 focus:border-[var(--color-violet)]/60',
              Boolean(icon) && 'pl-10',
              isPassword && 'pr-10',
              error && 'border-[var(--color-danger)]/60',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="focus-ring absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md text-[var(--color-faint)] hover:text-[var(--color-muted)]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs text-[var(--color-danger)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
