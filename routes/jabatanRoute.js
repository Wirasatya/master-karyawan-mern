const router = require("express").Router();
const jabatanCtrl = require("../controllers/jabatanCtrl");
const authAdmin = require("../middlewares/authAdmin");
const auth = require("../middlewares/auth");

router.post("/", auth, authAdmin, jabatanCtrl.createJabatan);

router.put("/delete/", auth, authAdmin, jabatanCtrl.deleteJabatan);

router.patch("/update/:id", auth, authAdmin, jabatanCtrl.updateJabatan);

router.get("/", auth, authAdmin, jabatanCtrl.getAllJabatan);

module.exports = router;
