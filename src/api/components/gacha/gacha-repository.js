const db = require('../../../models');

const { GachaLog } = db;
const { Prize } = db;

/**
 * Menghitung jumlah gacha user hari ini
 */
async function countUserDailyGacha(userId) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  return GachaLog.countDocuments({
    userId,
    createdAt: { $gte: startOfDay },
  });
}

/**
 * Mengambil hadiah yang masih memiliki kuota
 */
async function getAvailablePrizes() {
  return Prize.find({ $expr: { $lt: ['$winners', '$quota'] } });
}

/**
 * Update jumlah pemenang pada hadiah tertentu
 */
async function updatePrizeWinners(prizeId) {
  return Prize.updateOne({ _id: prizeId }, { $inc: { winners: 1 } });
}

/**
 * Menyimpan log gacha baru
 */
async function createGachaLog(data) {
  return GachaLog.create(data);
}

/**
 * MENGFIX ERROR: getUserHistory
 */
async function getUserHistory(userId) {
  return GachaLog.find({ userId }).sort({ createdAt: -1 });
}

/**
 * MENGFIX ERROR: getAllPrizes
 */
async function getAllPrizes() {
  return Prize.find({});
}

/**
 * MENGFIX ERROR: getAllWinners
 */
async function getAllWinners() {
  return GachaLog.find({ winStatus: true }).sort({ createdAt: -1 });
}

module.exports = {
  countUserDailyGacha,
  getAvailablePrizes,
  updatePrizeWinners,
  createGachaLog,
  getUserHistory,
  getAllPrizes,
  getAllWinners,
};
