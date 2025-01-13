import React from "react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  textarea = false,
  error,
  setErrors,
}) => {
  const handleChange = (e) => {
    onChange(e);
    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [label.toLowerCase().replace(/ /g, "")]: "",
      }));
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={handleChange}
          className={`w-full border p-2 rounded-lg ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className={`w-full border p-2 rounded-lg ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          required={required}
        />
      )}
      {error && <p className="absolute text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
