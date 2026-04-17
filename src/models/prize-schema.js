module.exports = (mongoose) => {
  const prizeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    maxQuota: { type: Number, required: true },
    currentWinners: { type: Number, default: 0 },
  });

  return mongoose.model('Prize', prizeSchema);
};
