const router = require("express").Router();
const karyawanCtrl = require("../controllers/karyawanCtrl");
const authAdmin = require("../middlewares/authAdmin");
const auth = require("../middlewares/auth");

router.post("/", auth, authAdmin, karyawanCtrl.createKaryawan);

router.get("/", auth, authAdmin, karyawanCtrl.getAllKaryawan);

router.get("/:id", auth, authAdmin, karyawanCtrl.getKaryawan);

router.patch("/delete/", auth, authAdmin, karyawanCtrl.deleteKaryawan);

router.patch("/update/:id", auth, authAdmin, karyawanCtrl.updateKaryawan);

module.exports = router;
