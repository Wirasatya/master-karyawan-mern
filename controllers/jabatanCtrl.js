const Jabatan = require("../models/jabatanModel");

const jabatanCtrl = {
  createJabatan: async (req, res) => {
    try {
      const { nama, kode } = req.body;
      if (!nama || !kode)
        return res
          .status(400)
          .json({ msg: "nama atau kode tidak boleh kosong" });

      const checkJabatan = await Jabatan.findOne({ nama });
      if (checkJabatan)
        return res.status(400).json({ msg: "nama Jabatan sudah ada" });

      const jabatanBaru = new Jabatan({
        nama,
        kode,
      });
      await jabatanBaru.save();

      res.status(200).json({
        msg: "jabatan baru berhasil ditambahkan",
        jabatan: jabatanBaru._doc,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteJabatan: async (req, res) => {
    try {
      await Jabatan.findByIdAndUpdate({ _id: req.params.id }, { is_delete: 1 });
      res.status(200).json({ msg: "jabatan berhasil di hapus" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateJabatan: async (req, res) => {
    try {
      const { nama, kode } = req.body;
      if (!nama)
        return res.status(400).json({ msg: "nama jabatan tidak boleh kosong" });

      if (!kode)
        return res.status(400).json({ msg: "kode jabatan tidak boleh kosong" });

      await Jabatan.findOneAndUpdate(
        { _id: req.params.id },
        {
          nama,
          kode,
        }
      );

      res.status(200).json({ msg: "update jabatan berhasil" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllJabatan: async (req, res) => {
    try {
      const jabatan = await Jabatan.find({ is_delete: 0 });
      res.status(200).json({ jabatan });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = jabatanCtrl;
