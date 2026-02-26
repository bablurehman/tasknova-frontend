import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAdminContext } from "../../Context/AdminContext";

const AdminLogin = () => {
  const { adminLogin } = useAdminContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await adminLogin(email, password);
      toast.success("Admin signed in successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-slate-100 to-indigo-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] px-8 py-10"
        >
       <div className="mb-8 text-center">
  <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
    TaskNova Admin
  </h1>
  <p className="text-sm text-zinc-500 mt-1">
    Manage users and tasks.
  </p>
</div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-zinc-400 text-sm" />
              <input
                type="email"
                name="email"
                required
                className="w-full h-11 rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-zinc-400 text-sm" />
              <input
                type="password"
                name="password"
                required
                className="w-full h-11 rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-[0.98] transition"
          >
            Sign in as Admin
          </button>

          <p className="text-center text-xs text-zinc-400 mt-6">
            Restricted access • Authorized personnel only
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
