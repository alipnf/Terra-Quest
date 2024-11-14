import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleGoogleLogin,
    error,
  } = useLogin();

  const navigate = useNavigate();

  return (
    <div className="md:min-h-screen flex items-center p-5 justify-center">
      <div className="card xl:w-4/12 bg-base-100 shadow-2xl">
        <div className="card-body">
          <p className="card-title">Selamat datang di TerraQuest</p>
          <p>Masuk untuk melanjutkan petualanganmu</p>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Masuk
            </button>
          </form>

          {error && <div className="text-red-500 mt-2">{error}</div>}

          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
            >
              Login dengan Google
            </button>
          </div>

          <div className="mt-4 text-center">
            <p>
              Belum punya akun?{" "}
              <a
                className="cursor-pointer text-blue-500"
                onClick={() => navigate("/register")}
              >
                Daftar
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
