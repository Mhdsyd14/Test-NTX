function calculateTax(pendapatan, usia, tanggungan) {
  // Validasi pendapatan
  if (typeof pendapatan !== "number" || pendapatan < 0) {
    return "Pendapatan tidak valid";
  }

  // Validasi usia
  if (typeof usia !== "number" || usia < 0) {
    return "Usia tidak valid";
  }

  // Validasi tanggungan
  if (typeof tanggungan !== "number" || tanggungan < 0) {
    return "Tanggungan tidak valid";
  }

  // Aturan: Jika usia kurang dari 18 tahun
  if (usia < 18) {
    return "Tidak memenuhi syarat untuk pajak";
  }

  // Hitung pajak dasar
  let pajakDasar = 0;
  if (pendapatan <= 10000) {
    // dikali 10 % dari pendapatan
    pajakDasar = 0.1 * pendapatan;
  } else if (pendapatan <= 50000) {
    // dikali 20 % dari pendapatan
    pajakDasar = 0.2 * pendapatan;
  } else {
    // dikali 30 % dari pendapatan
    pajakDasar = 0.3 * pendapatan;
  }

  // Terapkan pengurangan pajak untuk tanggungan
  let pengurangan = tanggungan * 500;
  pajakDasar -= pengurangan;

  // Terapkan diskon untuk lansia jika di atas umur 65 tahun
  if (usia >= 65) {
    pajakDasar *= 0.8;
  }

  // Pastikan pajak minimum adalah $0
  pajakDasar = Math.max(pajakDasar, 0);

  return pajakDasar;
}

console.log(calculateTax(70000, 19, 5));
console.log(calculateTax(-90, 19, 5));
console.log(calculateTax(200000, 0, 5));
console.log(calculateTax(200000, 19, -8));

// Untuk mengetes function tersebut menggunakan dengan node js
