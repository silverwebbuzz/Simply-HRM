const mongoose = require("mongoose");
const bcriptjs = require("bcryptjs");
const Employeeschema = new mongoose.Schema({
  first_Name: {
    type: "string",
  },
  middle_Name: {
    type: "string",
  },
  last_name: {
    type: "string",
  },
  date_of_birth: {
    type: "string",
  },
  email_address: {
    type: "string",
  },
  mobile_number: {
    type: "string",
  },
  alternate_number: {
    type: "string",
  },
  father_number: {
    type: "string",
  },
  mother_number: {
    type: "string",
  },
  current_address: {
    type: "string",
  },
  permanent_address: {
    type: "string",
  },
  designation: {
    type: "string",
  },
  date_of_joining: {
    type: "string",
  },
  pancard: {
    type: "string",
  },
  ID_number: {
    type: "string",
  },

  bank_name: {
    type: "string",
  },
  bank_account: {
    type: "string",
  },
  number_bank: {
    type: "string",
  },
  IFSC_code: {
    type: "string",
  },
  upload_Document: {
    type: "string",
  },
  employee_image: {
    type: "string",
  },
  user_type: {
    type: "string",
  },
  user_id: {
    type: "string",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("employee", Employeeschema);
