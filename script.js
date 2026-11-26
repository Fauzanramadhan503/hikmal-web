const menuItems = [
  {
    id: 1,
    nama: "Kopi Susu Gula Aren",
    kategori: "kopi",
    harga: "Rp 22.000",
    emoji: "🥤",
    deskripsi: "Espresso house blend dengan susu segar dan gula aren asli."
  },
  {
    id: 2,
    nama: "V60 Gayo Wine",
    kategori: "kopi",
    harga: "Rp 28.000",
    emoji: "☕",
    deskripsi: "Manual brew dengan karakter fruity dan aftertaste bersih."
  },
  {
    id: 3,
    nama: "Matcha Latte",
    kategori: "non-kopi",
    harga: "Rp 25.000",
    emoji: "🍵",
    deskripsi: "Bubuk matcha pilihan yang creamy, pas disajikan dingin."
  },
  {
    id: 4,
    nama: "Cokelat Hangat",
    kategori: "non-kopi",
    harga: "Rp 23.000",
    emoji: "🍫",
    deskripsi: "Kakao pekat dengan tekstur lembut dan rasa manis seimbang."
  },
  {
    id: 5,
    nama: "Croissant Butter",
    kategori: "makanan",
    harga: "Rp 24.000",
    emoji: "🥐",
    deskripsi: "Lapisan renyah di luar dan lembut di dalam, hangat dipanggang."
  },
  {
    id: 6,
    nama: "Pisang Goreng Keju",
    kategori: "makanan",
    harga: "Rp 19.000",
    emoji: "🍌",
    deskripsi: "Pisang kepok pilihan dengan taburan keju dan susu kental."
  }
];

const menuGrid = document.getElementById("menuGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const reservationForm = document.getElementById("reservationForm");
const reservationResult = document.getElementById("reservationResult");
const tanggalInput = document.getElementById("tanggal");

// Set minimal tanggal reservasi ke hari ini
if (tanggalInput) {
  const today = new Date().toISOString().split("T")[0];
  tanggalInput.min = today;
  tanggalInput.value = today;
}

// Render daftar menu
function renderMenu(category = "all") {
  const filtered =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.kategori === category);

  menuGrid.innerHTML = filtered
    .map(
      (item) => `
      <article class="menu-card">
        <div>
          <div class="menu-emoji">${item.emoji}</div>
          <h3>${item.nama}</h3>
          <p>${item.deskripsi}</p>
        </div>
        <div class="menu-price">${item.harga}</div>
      </article>
    `
    )
    .join("");
}

// Filter kategori menu
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.category);
  });
});

// Toggle menu mobile
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Tutup menu mobile saat link diklik
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("show"));
});

// Handle form reservasi
reservationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  const jumlah = document.getElementById("jumlah").value;
  const catatan = document.getElementById("catatan").value.trim();

  reservationResult.hidden = false;
  reservationResult.innerHTML = `
    <strong>Reservasi Tercatat!</strong><br />
    Terima kasih, <b>${nama}</b>. Meja untuk <b>${jumlah}</b> pada tanggal
    <b>${tanggal}</b> telah kami catat${catatan ? ` (Catatan: <i>${catatan}</i>)` : ""}.
  `;

  reservationForm.reset();
  if (tanggalInput) {
    tanggalInput.value = new Date().toISOString().split("T")[0];
  }
});

// Tampilkan semua menu saat pertama kali dibuka
renderMenu();