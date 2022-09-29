const Company = require("../../model/company");
const express = require("express");
const response = require("../../helper/middlewere");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userType } = require("../../helper/enum/userType");
const { login } = require("../auth/authentiction");

//Company Registation
module.exports.company_registation = async (req, res) => {
  try {
    const email_id = req.body.email_id;
    const company_name = req.body.company_name;
    const Email = await Company.findOne({
      email_id: email_id,
    });
    const Company_Name = await Company.findOne({
      company_name: company_name,
    });
    if (Email || Company_Name) {
      res.send(response.common("User alrady exist", false, undefined, 300));
    } else {
      const user = new Company({
        company_name: req.body.company_name,
        email_id: req.body.email_id,
        password: req.body.password,
      });
      const newUser = user.save();
      if (newUser) {
        res.send(response.common("Registation Successfully ", true, user, 200));
      } else {
        res.send(response.common("Registation Failed", true, undefined, 400));
      }
    }
  } catch (err) {
    res.send(response.common(err, false, undefined, 600));
  }
};

//Company Login
module.exports.company_login = async (req, res) => {
  try {
    const email_id = req.body.email_id;
    const user = await Company.findOne({ email_id: email_id });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      if (!validPassword) {
        res.send(response.common("Login Failed..", false, undefined, 300));
      } else {
        const data = { user, token };
        res.send(response.common("Login Sucessfully", true, data, 200));
      }
    } else {
      res.send(
        response.common("Email And Password Not Currect", false, undefined, 400)
      );
    }
  } catch (err) {
    res.send(response.common(err, false, undefined, 500));
  }
};

//company profile update
module.exports.update_company_details = async (req, res) => {
  try {
    const id = req.params.id;
    const company_name = req.body.company_name;
    const Company_Id = await Company.findById(id);
    if (!Company_Id) {
      res.send(response.common("User Not Found"));
    } else {
      const update = await Company.find({ company_name });
      if (update.length > 0) {
        res.send(response.common("Company Name Alredy Exist"));
      } else {
        const updateDetails = await Company.findByIdAndUpdate(
          id,
          {
            company_name: req.body.company_name,
            company_website_url: req.body.company_website_url,
            //   Company_logo: req.body.Company_logo,
            industry_business_location: req.body.industry_business_location,
            company_address: req.body.company_address,
            city: req.body.city,
            zip_code: req.body.zip_code,
            mobile_number: req.body.mobile_number,
            phone_number: req.body.phone_number,
            contact_person: req.body.contact_person,
            time_zone: req.body.time_zone,
            date_format: req.body.date_format,
            company_number: req.body.company_number,
            company_tax_id: req.body.company_tax_id,
          },
          {
            new: true,
          }
        );
        if (updateDetails) {
          res.send(
            response.common(
              "user updated successfully",
              true,
              updateDetails,
              200
            )
          );
        } else {
          res.send(response.common("user Not updated", false, undefined, 300));
        }
      }
    }
  } catch (err) {
    res.send(response.common(err, false, undefined, 500));
  }
};

//All Company Get

module.exports.getAllCompany = async (req, res) => {
  try {
    const Company_get = await Company.find();
    if (Company_get) {
      res.send(response.common("Get All Company", true, Company_get, 200));
    } else {
      res.send(response.common("Company Not Found", false, 300));
    }
  } catch (err) {
    res.send(response.common(err, false, undefined, 500));
  }
};

//Get ID BY Company

module.exports.companyById = async (req, res) => {
  try {
    const id = req.params.id;
    const company_get = await Company.findById(id);
    if (company_get) {
      res.send(response.common("Get company", true, company_get, 200));
    } else {
      res.send(response.common("company Not Found", false, 300));
    }
  } catch (err) {
    res.send(response.common(err, false, undefined, 500));
  }
};
