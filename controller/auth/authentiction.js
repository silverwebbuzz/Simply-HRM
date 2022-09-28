const Users = require("../../model/user");
const express = require("express");
const response = require("../../helper/middlewere");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userType } = require("../../helper/enum/userType");

//user registation
module.exports.registation = async (req, res) => {
  try {
    const data = await Users.findOne({ email_id: req.body.email_id });
    console.log();
    if (data) {
      res.send(response.common("User alrady exist", false, undefined, 300));
    } else {
      const user = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_id: req.body.email_id,
        phone_number: req.body.phone_number,
        password: req.body.password,
        user_type: userType.ADMIN,
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

//user login
module.exports.login = async (req, res) => {
  try {
    const email_id = req.body.email_id;
    const user = await Users.findOne({ email_id: email_id });
    console.log(user);
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(validPassword);
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      if (!validPassword) {
        res.send(response.common("Login Failed..", false, undefined, 300));
      } else {
        const data1 = { user, token };
        res.send(response.common("Login Sucessfully", true, data1, 200));
      }
    } else {
      res.send(response.common("email does not exist", false, undefined, 400));
    }
  } catch (err) {
    res.send(response.common(err, false, undefined, 500));
  }
};
