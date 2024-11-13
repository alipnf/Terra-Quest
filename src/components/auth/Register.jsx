import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserstore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConfig";

export default function Register() {
  const { register, error, setUser, setError } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password, name, () => {
      if (!error) {
        setShowSuccessModal(true);
      }
    });
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error("Error registering with Google:", error);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login"); // Arahkan ke halaman login setelah menutup modal
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000); // Error hilang setelah 5 detik
      return () => clearTimeout(timer);
    }
  }, [error, setError]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card xl:w-5/12  bg-base-100 shadow-xl">
        <div className="card-body">
          <p className="card-title">Daftar ke TerraQuest</p>
          <p> Buat akun untuk memulai petualanganmu </p>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full gap-4">
              <div className="form-control">
                <label htmlFor="name" className="label">
                  Username
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Daftar
            </button>
          </form>

          {error && <div className="text-red-500 mt-2">{error}</div>}

          <div className="mt-4">
            <button
              onClick={handleGoogleRegister}
              className="btn btn-outline w-full"
            >
              Daftar dengan Google
            </button>
          </div>

          <div className="mt-4 text-center">
            <p>
              Sudah punya akun?{" "}
              <a
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Registrasi Berhasil!
            </h2>
            <p className="mb-4">
              Akun Anda telah dibuat. Silakan login untuk melanjutkan.
            </p>
            <button
              onClick={closeSuccessModal}
              className="btn btn-primary mt-2"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
