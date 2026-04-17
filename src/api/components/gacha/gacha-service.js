const gachaRepository = require('./gacha-repository');

/**
 * Logika utama bermain gacha
 */
async function playGacha(userId, userName) {
  // 1. Cek limit harian (maks 5x)
  const dailyCount = await gachaRepository.countUserDailyGacha(userId);
  if (dailyCount >= 5) {
    const error = new Error('Batas gacha harian tercapai (Maks 5x)');
    error.statusCode = 403;
    throw error;
  }

  // 2. Ambil semua hadiah yang masih ada kuotanya
  const availablePrizes = await gachaRepository.getAvailablePrizes();

  let winStatus = false;
  let prizeWon = null;

  // 3. Logika Gacha (Contoh: Peluang 30% menang jika ada hadiah)
  if (availablePrizes.length > 0 && Math.random() < 0.3) {
    // Ambil 1 hadiah secara acak dari yang tersedia
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    prizeWon = availablePrizes[randomIndex];
    winStatus = true;

    // Update jumlah pemenang di database
    await gachaRepository.updatePrizeWinners(prizeWon.id);
  }

  // 4. Simpan riwayat ke GachaLog
  const logData = {
    userId,
    userName,
    winStatus,
    prizeName: winStatus ? prizeWon.name : 'Zonk',
  };
  await gachaRepository.createGachaLog(logData);

  return logData;
}

/**
 * Mengambil histori user
 */
async function getHistory(userId) {
  return gachaRepository.getUserHistory(userId);
}

/**
 * Mengambil semua hadiah dan sisa kuota
 */
async function getPrizes() {
  return gachaRepository.getAllPrizes();
}

/**
 * Mengambil daftar pemenang dengan nama disamarkan
 */
async function getMaskedWinners() {
  const winners = await gachaRepository.getAllWinners();

  return winners.map((w) => {
    const name = w.userName || 'Anonymous';
    // Samarkan nama (S****ar)
    const masked =
      name.length > 2
        ? `${name[0]}****${name[name.length - 1]}`
        : `${name}****`;

    return {
      userName: masked,
      prizeName: w.prizeName,
      date: w.createdAt,
    };
  });
}

module.exports = {
  playGacha,
  getHistory,
  getPrizes,
  getMaskedWinners,
};
