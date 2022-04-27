const express = require("express");
const router = express.Router();
const validate = require("../validate/index.js");

router.use("/", async (req, res) => {
  if (req.session.user && !req.session.isBusiness) {
    res.render("home/home", {
      user: req.session.user,
      isAdmin: req.session.isAdmin,
      businessId: req.session.businessId,
      employeeId: req.session.employeeId,
      employee: req.session.employee,
    });
  } else if (req.session.user && req.session.isBusiness) {
    res.redirect("/manager");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;