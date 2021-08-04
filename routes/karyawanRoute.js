const router = require("express").Router();
const karyawanCtrl = require("../controllers/karyawanCtrl");
const authAdmin = require("../middlewares/authAdmin");
const auth = require("../middlewares/auth");

router.post("/", auth, authAdmin, karyawanCtrl.createKaryawan);

router.patch("/delete/:id", auth, authAdmin, karyawanCtrl.deleteKaryawan);

router.patch("/update/:id", auth, authAdmin, karyawanCtrl.updateKaryawan);

router.get("/", auth, authAdmin, karyawanCtrl.getAllKaryawan);

module.exports = router;
