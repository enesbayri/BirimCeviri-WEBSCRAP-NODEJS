const router=require("express").Router();
const birimCevirController=require("../controllers/birimCevirController");

router.get('/',birimCevirController.anaSayfaKarsila);
router.post('/',birimCevirController.birimCevir);

router.get('/harfler',birimCevirController.harfleriAl);




module.exports=router;