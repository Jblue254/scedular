export default function RoleSelect({ role, setRole }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="border rounded-lg p-2 w-full"
      >
        <option value="">Select role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
    </div>
  );
}
