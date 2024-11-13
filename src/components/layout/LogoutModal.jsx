export default function LogoutModal({ isOpen, closeModal, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">
          Konfirmasi Logout
        </h2>
        <p className="mt-2 text-gray-600">Apakah Anda yakin ingin logout?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={closeModal} className="btn btn-outline btn-sm">
            Batal
          </button>
          <button onClick={onLogout} className="btn btn-primary btn-sm">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
