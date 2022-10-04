const router = require("express").Router();
const authentiction = require("../controller/auth/authentiction");
const companyManagement = require("../controller/companyManagement/company");
const employeeManagement = require("../controller/employeeManagement/employee");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//  user

router.post("/registation", upload.none(), authentiction.registation);
router.post("/login", upload.none(), authentiction.login);

// company

router.post(
  "/company_registation",
  upload.none(),
  companyManagement.company_registation
);
router.post("/company_login", upload.none(), companyManagement.company_login);
router.post(
  "/update_company_details/:id",
  upload.none(),
  companyManagement.update_company_details
);
router.get("/get_all_Company", upload.none(), companyManagement.getAllCompany);
router.get("/company/:id", upload.none(), companyManagement.companyById);
router.post("/add_holiday", upload.none(), companyManagement.add_holiday);

//Employee

router.post(
  "/employee_registation",
  upload.none(),
  employeeManagement.employee_registation
);
router.post(
  "/employee_login",
  upload.none(),
  employeeManagement.employee_login
);
router.post(
  "/update_employee_details/:id",
  upload.none(),
  employeeManagement.update_employee_details
);
router.delete(
  "/employee_delete/:userID",
  upload.none(),
  employeeManagement.employee_delete
);
router.get("/get_employee/:id", upload.none(), employeeManagement.get_employee);
router.get("/get_holiday/:id", upload.none(), employeeManagement.get_holiday);
module.exports = router;
