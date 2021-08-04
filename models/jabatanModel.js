const mongoose = require("mongoose");

const jabatanSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "masukkan nama jabatan!"],
      unique: true,
    },
    kode: {
      type: String,
      require: true,
    },
    is_delete: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jabatan", jabatanSchema);
