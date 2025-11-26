import React from 'react';

const Textarea = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  error = null,
  required = false,
  disabled = false,
  rows = 4,
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`
          form-input form-textarea
          ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `.trim()}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Textarea;
