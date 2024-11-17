# Terra Quest

Terra Quest adalah platform web interaktif berbasis game untuk meningkatkan kesadaran lingkungan. Pengguna menyelesaikan misi nyata dari NPC (Non-Playable Character) dengan karakteristik unik, mendorong aksi melestarikan alam seperti penanaman pohon dan pengurangan sampah plastik. Terra Quest menggabungkan edukasi dan gamifikasi untuk menciptakan pengalaman yang menyenangkan dan bermanfaat bagi bumi.

## Fitur Utama

- **Login/Register:** _User_ dapat masuk menggunakan _email/password_ atau Google Sign-In.
- **Beranda:** Informasi web dan manfaat misi.
- **Quest:** _User_ dapat mengambil dan menyelesaikan _quest_.
- **Detail Quest:** Rincian misi dan bantuan NPC.
- **Detail NPC:** Deskripsi NPC dan contoh _quest_ yang diberikan.
- **Pencapaian:** Poin, peringkat, dan _quest_ yang telah selesai.

## Tech Stack

- React
- Zustand
- TailwindCSS
- DaisyUI
- Firebase
- Gemini

## Installation

1. **Clone repository:**

```bash
   git clone https://github.com/alipnf/Terra-Quest
   cd Terra-Quest
```

2. **Install dependencies:**

- Pilih salah satu dari perintah berikut, sesuai dengan package manager yang Anda gunakan:

```bash
  npm install
  # or
  pnpm install
  # or
  yarn install
```

3. **Setup Environment Variables:**

- pada file .env, isi dengan konfigurasi gemini dan firebase

```bash
  cp .env.example .env
```

4. **Run development server:**

```bash
  npm dev
  # or
  pnpm dev
  # or
  yarn dev
```

