const LoadingState = ({ message = "Chargement...", className = "" }) => {
  return (
    <div className={`text-center py-10 text-gray-600 ${className}`}>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default LoadingState;