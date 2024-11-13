import { useRegister } from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handleSubmit,
    handleGoogleRegister,
    showSuccessModal,
    closeSuccessModal,
    error,
  } = useRegister();

  const navigate = useNavigate();
  return (
    <div className="md:min-h-screen p-5 flex items-center justify-center">
      <div className="card xl:w-5/12 bg-base-100 shadow-2xl">
        <div className="card-body">
          <p className="card-title">Daftar ke TerraQuest</p>
          <p>Buat akun untuk memulai petualanganmu</p>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10">
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
