module.exports = (mongoose) => {
  const gachaLogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    prize: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  });

  return mongoose.model('GachaLog', gachaLogSchema);
};
