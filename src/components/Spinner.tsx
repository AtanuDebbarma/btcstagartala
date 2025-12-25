interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
  loading?: boolean;
}

export const Spinner = ({
  size = 35,
  color = '#900090',
  className = '',
  loading = true,
}: SpinnerProps) => {
  if (!loading) return null;

  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent ${color} transparent`,
      }}
      role="status"
      aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Alias for compatibility
export const ClipLoader = Spinner;
