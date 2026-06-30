function InputForm({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full pl-5 border px-3 py-2 rounded ${className}`}
    />
  );
}

export default InputForm;