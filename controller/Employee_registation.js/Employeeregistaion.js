const Employee = require("../../model/employee");
const express = require("express");
const response = require("../../helper/middlewere");
const { userType } = require("../../helper/enum/userType");
const company = require("../../model/company");

//Employee registation
module.exports.employee_registation = async (req, res) => {
  console.log("hi");
  try {
    const data = await Employee.findOne({
      email_address: req.body.email_address,
    });
    console.log(data);
    if (data) {
      res.send(response.common("User alrady exist", false, undefined, 300));
    } else {
      const user = new Employee({
        first_Name: req.body.first_Name,
        last_name: req.body.last_name,
        middle_Name: req.body.middle_Name,
        date_of_birth: req.body.date_of_birth,
        email_address: req.body.email_address,
        mobile_number: req.body.mobile_number,
        alternate_number: req.body.alternate_number,
        father_number: req.body.father_number,
        mother_number: req.body.mother_number,
        current_address: req.body.current_address,
        permanent_address: req.body.permanent_address,
        designation: req.body.designation,
        date_of_joining: req.body.date_of_joining,
        pancard: req.body.pancard,
        ID_number: req.body.ID_number,
        bank_name: req.body.bank_name,
        bank_account: req.body.bank_account,
        number_bank: req.body.number_bank,
        IFSC_code: req.body.IFSC_code,
        upload_Document: req.body.upload_Document,
        employee_image: req.body.employee_image,
        user_id: req.body.user_id,
        user_type: userType.EMPLOYEES,
      });
      const newUser = user.save();
      if (newUser) {
        res.send(response.common("Registation Successfully ", true, user, 200));
      } else {
        res.send(response.common("Registation Failed", true, undefined, 400));
      }
    }
  } catch (err) {
    res.send(response.common(err, false, 600));
  }
};

//Employee update

module.exports.update_employee_details = async (req, res) => {
  try {
    const id = req.params.id;
    const email = await Employee.findById(id);
    console.log(email);
    if (email) {
      const updateDetails = await Employee.findByIdAndUpdate(
        id,
        {
          first_Name: req.body.first_Name,
          last_name: req.body.last_name,
          middle_Name: req.body.middle_Name,
          date_of_birth: req.body.date_of_birth,
          mobile_number: req.body.mobile_number,
          alternate_number: req.body.alternate_number,
          father_number: req.body.father_number,
          mother_number: req.body.mother_number,
          current_address: req.body.current_address,
          permanent_address: req.body.permanent_address,
          designation: req.body.designation,
          date_of_joining: req.body.date_of_joining,
          pancard: req.body.pancard,
          ID_number: req.body.ID_number,
          bank_name: req.body.bank_name,
          bank_account: req.body.bank_account,
          number_bank: req.body.number_bank,
          IFSC_code: req.body.IFSC_code,
          upload_Document: req.body.upload_Document,
          employee_image: req.body.employee_image,
        },
        {
          new: true,
        }
      );
      if (updateDetails) {
        res.send(
          response.common("user updated successfully", true, updateDetails, 200)
        );
      } else {
        res.send(response.common("user Not updated", false, undefined, 300));
      }
    } else {
      res.send(response.common("User Not Found", false, undefined, 600));
    }
  } catch (err) {
    res.send(response.common(err, false, undefined, 500));
  }
};

// Employee Delete

module.exports.employee_delete = async (req, res) => {
  try {
    const userID = req.params.userID;
    const EmployeeID = await Employee.findById(userID);
    console.log(EmployeeID);
    if (EmployeeID) {
      const delet = await Employee.findByIdAndDelete(userID);
      res.send(
        response.common("Employee Deleted Successfully", true, delet, 200)
      );
    } else {
      res.send(response.common("Employee Not Found", false, 300));
    }
  } catch (err) {
    res.send(response.common(err, false, 400));
  }
};

//Employee Get By ID
module.exports.get_employee = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const Employe_get = await Employee.findById({ user_id });
    if (Employe_get) {
      res.send(response.common("Get All Employee", true, Employe_get, 200));
    } else {
      res.send(response.common("Employee Not Found", false, 300));
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
