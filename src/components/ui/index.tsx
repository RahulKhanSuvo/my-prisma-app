import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <div className="grid gap-2">
      {label && (
        <label
          htmlFor={props.id}
          className="text-sm font-semibold uppercase tracking-wider text-zinc-500"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className={`block w-full rounded-xl border-0 bg-white px-4 py-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 dark:ring-zinc-800 dark:focus:ring-zinc-50 sm:text-sm ${className}`}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}

export const Button = ({ loading, children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-bold text-zinc-50 transition-all hover:bg-zinc-700 hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 ${className}`}
    >
      {loading ? 'Processing...' : children}
    </button>
  )
}
