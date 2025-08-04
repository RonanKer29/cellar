const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  placeholder, 
  required = false,
  className = "",
  ...props 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormField;