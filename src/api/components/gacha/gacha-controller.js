const gachaService = require('./gacha-service');

/**
 * Handler untuk POST /api/gacha/play
 */
async function play(req, res, next) {
  try {
    const { userId, userName } = req.body;

    if (!userId || !userName) {
      return res
        .status(400)
        .json({ message: 'userId dan userName wajib diisi' });
    }

    const result = await gachaService.playGacha(userId, userName);
    return res.status(200).json({
      message: result.winStatus
        ? 'Selamat! Anda menang!'
        : 'Maaf, kali ini Anda Zonk.',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handler untuk GET /api/gacha/history/:userId
 */
async function getHistory(req, res, next) {
  try {
    const { userId } = req.params;
    const history = await gachaService.getHistory(userId);
    return res.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handler untuk GET /api/gacha/prizes
 */
async function getPrizes(req, res, next) {
  try {
    const prizes = await gachaService.getPrizes();
    return res.status(200).json(prizes);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handler untuk GET /api/gacha/winners
 */
async function getWinners(req, res, next) {
  try {
    const winners = await gachaService.getMaskedWinners();
    return res.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  play,
  getHistory,
  getPrizes,
  getWinners,
};
