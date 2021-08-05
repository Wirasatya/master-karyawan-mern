const Karyawan = require("../models/karyawanModel");

const karyawanCtrl = {
  createKaryawan: async (req, res) => {
    try {
      const { nama, nip, tanggal_lahir, jabatan, jenis_kelamin } = req.body;
      if (!nama || !nip || !jabatan)
        return res
          .status(400)
          .json({ msg: "nama, nip dan jabatan tidak boleh kosong" });

      const checkNip = await Karyawan.findOne({ nip });
      if (checkNip) return res.status(400).json({ msg: "NIP sudah ada" });

      const karyawanBaru = new Karyawan({
        nama,
        nip,
        tanggal_lahir,
        jabatan,
        jenis_kelamin,
      });
      await karyawanBaru.save();

      res.status(200).json({
        msg: "karyawan baru berhasil ditambahkan",
        karyawan: karyawanBaru._doc,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getKaryawan: async (req, res) => {
    try {
      const karyawan = await Karyawan.findOne({ _id: req.params.id });
      res.status(200).json({ karyawan });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateKaryawan: async (req, res) => {
    try {
      const { nama, nip, tanggal_lahir, jabatan, jenis_kelamin } = req.body;

      if (!nama)
        return res.status(400).json({ msg: "nama tidak boleh kosong" });

      if (!nip) return res.status(400).json({ msg: "nip tidak boleh kosong" });

      if (!jabatan)
        return res.status(400).json({ msg: "jabatan tidak boleh kosong" });

      await Karyawan.findOneAndUpdate(
        { _id: req.params.id },
        {
          nama,
          nip,
          tanggal_lahir,
          jabatan,
          jenis_kelamin,
        }
      );

      res.status(200).json({ msg: "update karyawan berhasil" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteKaryawan: async (req, res) => {
    try {
      await Karyawan.findByIdAndUpdate({ _id: req.body.id }, { is_delete: 1 });
      res.status(200).json({ msg: "karyawan berhasil di hapus" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllKaryawan: async (req, res) => {
    try {
      const karyawan = await Karyawan.find({ is_delete: 0 });
      res.status(200).json({ karyawan });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = karyawanCtrl;
