import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserstore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConfig";

export default function Login() {
  const { login, user, error, setUser, setError } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  useEffect(() => {
    setError(null);
  }, [setError]);

  if (user) {
    navigate("/"); // Redirect jika sudah login
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card xl:w-4/12 bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="card-title">Masuk untuk melanjutkan petualanganmu</p>
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

          {/* Menampilkan error jika ada */}
          {error && <div className="text-red-500 mt-2">{error}</div>}

          {/* Tombol Login dengan Google */}
          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full"
            >
              Login dengan Google
            </button>
          </div>

          {/* Tombol Register */}
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
