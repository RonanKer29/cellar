const ErrorState = ({ 
  message, 
  error, 
  onRetry, 
  className = "" 
}) => {
  return (
    <div className={`text-center py-10 text-red-600 ${className}`}>
      <div className="space-y-3">
        <p className="text-lg">❌ {message}</p>
        {error && (
          <pre className="text-sm bg-red-50 p-3 rounded-lg text-left max-w-md mx-auto overflow-auto">
            {error}
          </pre>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;