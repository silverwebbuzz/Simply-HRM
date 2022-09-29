const router = require("express").Router();
const authentiction = require("../controller/auth/authentiction");
const companyManagement = require("../controller/companyManagement/company");
const employeeManagement = require("../controller/employeeManagement/employee");

//  user

router.post("/registation", authentiction.registation);
router.post("/login", authentiction.login);

// company

router.post("/company_registation", companyManagement.company_registation);
router.post("/company_login", companyManagement.company_login);
router.post(
  "/update_company_details/:id",
  companyManagement.update_company_details
);
router.get("/get_all_Company", companyManagement.getAllCompany);
router.get("/company/:id", companyManagement.companyById);
//Employee

router.post("/employee_registation", employeeManagement.employee_registation);
router.post(
  "/update_employee_details/:id",
  employeeManagement.update_employee_details
);
router.delete("/employee_delete/:userID", employeeManagement.employee_delete);
router.get("/get_employee/:id", employeeManagement.get_employee);
module.exports = router;
