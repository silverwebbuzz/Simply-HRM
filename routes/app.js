const router = require("express").Router();
const authentiction = require("../controller/auth/authentiction");
const CompanyRegistation = require("../controller/Company_Registration/CompanyRegistration");
const EmployeeRegistation = require("../controller/Employee_registation.js/Employeeregistaion");
//  user
router.post("/registation", authentiction.registation);
router.post("/login", authentiction.login);

// company
router.post("/company_registation", CompanyRegistation.company_registation);
router.post("/company_login", CompanyRegistation.company_login);
router.post(
  "/update_company_details/:id",
  CompanyRegistation.update_company_details
);

router.post("/employee_registation", EmployeeRegistation.employee_registation);
router.post(
  "/update_employee_details/:id",
  EmployeeRegistation.update_employee_details
);
router.delete("/employee_delete/:userID", EmployeeRegistation.employee_delete);
router.get("/get_employee", EmployeeRegistation.get_employee);
module.exports = router;
