import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { useUserContext } from "../../Context/UserContext";

const UserRegister = () => {
  const { userRegister } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await userRegister(name, email, password);
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-slate-100 to-zinc-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] px-8 py-10"
        >
     <div className="mb-8 text-center">
  <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
    Create your TaskNova account
  </h1>
  <p className="text-sm text-zinc-500 mt-1">
    Start managing your tasks in one place.
  </p>
</div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Full name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-zinc-400 text-sm" />
              <input
                type="text"
                name="name"
                required
                className="w-full h-11 rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-zinc-400 text-sm" />
              <input
                type="email"
                name="email"
                required
                className="w-full h-11 rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition"
                placeholder="you@example.com"
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
                className="w-full h-11 rounded-lg border border-zinc-300 bg-white pl-10 pr-3 text-sm text-zinc-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:scale-[0.98] transition"
          >
            Create account
          </button>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
