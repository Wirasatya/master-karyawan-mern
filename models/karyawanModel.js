const mongoose = require("mongoose");

const karyawanSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, "masukkan nama karyawan"],
    },
    nip: {
      type: String,
      required: [true, "masukkan NIP"],
      trim: true,
      unique: true,
    },
    tanggal_lahir: {
      type: Date,
      default: Date.now,
    },
    jenis_kelamin: {
      type: Number,
      default: 1, //1=pria 2=wanita
    },
    jabatan: {
      type: mongoose.Types.ObjectId,
      ref: "Jabatan",
    },
    is_delete: {
      type: Number,
      default: 0, //0=false 1=true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Karyawan", karyawanSchema);
