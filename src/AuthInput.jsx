export default function AuthInput({ label, type = "text", value, onChange, name }) {
  const id = name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
