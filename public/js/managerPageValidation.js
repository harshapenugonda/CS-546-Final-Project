let checkString = async (str) => {
  return !(!str || typeof str !== "string" || !str.trim());
};

let checkEmail = async (email) => {
  await checkString(email);
  email = email.trim();
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    throw "Invalid, Enter a proper email";
  } else {
    return true;
  }
};

let checkPassword = async (password) => {
  await checkString(password);
  password = password.trim();
  if (password.length < 8) throw "Error: Password should be at least 8 characters long";
};

let checkGender = async (gender) => {
  await checkString(gender);
  if (["male", "female", "transgender", "gender neutral", "non-binary", "prefer not to say"].includes(gender.toLowerCase().trim())) {
    return true;
  } else {
    throw "Please choose a gender from provided options";
  }
};

let checkState = async (state) => {
  await checkString(state);
  state = state.trim();
  let states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  if (!states.includes(state.toUpperCase())) {
    throw "Error: Invalid state, please enter state in 2 letter format";
  }
};

let checkZip = async (zip) => {
  await checkString(zip);
  zip = zip.trim();
  let re = /^\d{5}$/;
  if (!re.test(zip)) {
    throw "Error: Invalid zip code, please enter zip code in 5 digit format";
  } else {
    return true;
  }
};

let checkPhone = async (phone) => {
  await checkString(phone);
  phone = phone.trim();
  let re = /^\d{10}$/;
  if (!re.test(phone)) {
    throw "Error: Invalid phone number, please enter phone number in 10 digit format";
  } else {
    return true;
  }
};

let checkEmploymentStatus = async (employmentStatus) => {
  await checkString(employmentStatus);
  if (["full-time", "part-time", "contract", "intern", "temporary", "volunteer", "other"].includes(employmentStatus.toLowerCase().trim())) {
    return true;
  } else {
    throw "Please choose an employment status from provided options";
  }
};

let checkBoolean = async (bool) => {
  if (!bool) {
    throw "Error: Invalid boolean, please enter a boolean";
  }
  if (typeof bool === "string") {
    if (bool.toLowerCase() === "true" || bool.toLowerCase() === "false") {
      return true;
    } else {
      throw "Error: Invalid boolean, please enter a boolean";
    }
  }
  if (typeof bool === "boolean") {
    return true;
  } else {
    throw "Error: Invalid boolean, please enter a boolean";
  }
};

let checkNumber = async (num) => {
  if (!num) {
    throw "Error: Invalid number, please enter a number";
  }
  if (typeof num === "string") {
    if (num != parseInt(num)) {
      // here "==" is the logic used to compare data but not the type
      throw "Error: Invalid number, please enter a number";
    }
  }
  num = parseInt(num);
  if (isNaN(num)) {
    throw "Error: Invalid number, please enter a number";
  }
  if (num < 0) {
    throw "Error: Invalid number, please enter a positive number";
  }
  return true;
};

let checkDate = async (date) => {
  console.log(date);
  await checkString(date);
  date = date.trim();
  // validate Date in YYYY-MM-DD format
  let arr = date.split("-");
  if (arr.length !== 3) throw "Error: Date should contain 3 values of month, day, year in YYYY-MM-DD format";

  let year = parseInt(arr[0]);
  let month = parseInt(arr[1]);
  let day = parseInt(arr[2]);

  if (year != arr[0] || month != arr[1] || day != arr[2]) {
    throw "Error: Invalid characters present in releaseDate";
  }

  if (month > 12 || month < 1) throw "Error: month of Date should be between 1 and 12";
  // months with 31 days
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    if (day < 1 || day > 31) {
      throw "Error: Value for day should be between 1 and 31";
    }
  } // months with 30 days
  else if ([4, 6, 9, 11].includes(month)) {
    if (day < 1 || day > 30) {
      throw "Error: Value for day should be between 1 and 30";
    }
  } // february
  else if (month === 2) {
    if (year % 4 === 0) {
      if (day < 1 || day > 29) {
        throw "Error: Value for day should be between 1 and 29";
      }
    } else {
      if (day < 1 || day > 28) {
        throw "Error: Value for day should be between 1 and 28";
      }
    }
  }
  // check if date is in the past, if not throw error
  // new Date() returns the current date in YYYY-MM-DD format

  let currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    throw "Error: Value for year should be between 1900 and " + currentYear;
  } else if (year === currentYear) {
    let currentMonth = new Date().getMonth() + 1;
    if (month > currentMonth) {
      throw "Error: Value for month should be less than or equal to " + currentMonth;
    } else if (month === currentMonth) {
      let currentDay = new Date().getDate();
      if (day > currentDay) {
        throw "Error: Value for day should be less than or equal to " + currentDay;
      }
    }
  }
  return true;
};

let matchPassword = async (password, confirmPassword) => {
  if (password !== confirmPassword) {
    throw "Error: Passwords do not match";
  }
};

$(document).ready(function () {
  const newEmployeeForm = $("#newEmployeeForm");
  newEmployeeForm.submit(async (event) => {
    $("#errormessage").attr("hidden", true);
    try {
      let email = $("#email").val();
      let password = $("#password").val();
      let confirmPassword = $("#confirmPassword").val();
      let firstName = $("#firstName").val();
      let lastName = $("#lastName").val();
      let address = $("#address").val();
      let city = $("#city").val();
      let state = $("#state").val();
      let zip = $("#zip").val();
      let phone = $("#phoneNumber").val();
      let employmentStatus = $("#employmentStatus").val();
      let isActiveEmployee = $("#isActiveEmployee").val();
      let hourlyPay = $("#hourlyPay").val();
      let startDate = $("#startDate").val();
      let isManager = $("#isManager").val();
      let gender = $("#gender").val();

      await checkEmail(email);
      await checkPassword(password);
      password = password.trim();
      await checkPassword(confirmPassword);
      confirmPassword = confirmPassword.trim();
      await matchPassword(password, confirmPassword);
      await checkString(firstName);
      await checkString(lastName);
      await checkString(address);
      await checkString(city);
      await checkState(state);
      await checkZip(zip);
      await checkPhone(phone);
      await checkEmploymentStatus(employmentStatus);
      await checkBoolean(isActiveEmployee);
      await checkNumber(hourlyPay);
      await checkDate(startDate);
      await checkBoolean(isManager);
      await checkGender(gender);
    } catch (e) {
      event.preventDefault();
      $("#errormessage").text(e);
      $("#errormessage").attr("hidden", false);
    }
  });
});

$(document).on("click", ".editEmployee", async function (event) {
  event.preventDefault();
  let employeeId = $(this).attr("employee-id");
  $.ajax({
    url: `manager/employee/${employeeId}`,
    type: "GET",
  }).done((data) => {
    if (data.error) console.log("Error getting employee while editing: ", data.error);
    const employee = data;
    console.log("employee: ", employee);
    $("#editEmployeeModal").attr("employee-id", employeeId);
    $("#editEmail").val(employee.email);
    $("#editFirstName").val(employee.firstName);
    $("#editLastName").val(employee.lastName);
    const gender = $("#editGender");
    gender.find("option").each(function () {
      if ($(this).val().toLowerCase() === employee.gender.toLowerCase()) {
        $(this).attr("selected", true);
      } else {
        $(this).attr("selected", false);
      }
    });
    $("#editAddress").val(employee.address);
    $("#editCity").val(employee.city);
    $("#editState").val(employee.state);
    $("#editZip").val(employee.zip);
    $("#editPhoneNumber").val(employee.phone);
    // find relevent option for employment Status from select
    const employmentStatus = $("#editEmploymentStatus");
    employmentStatus.find("option").each(function () {
      if ($(this).val().toLowerCase() === employee.employmentStatus.toLowerCase()) {
        $(this).attr("selected", true);
      } else {
        $(this).attr("selected", false);
      }
    });
    const isActiveEmployee = $("#editIsActiveEmployee");
    isActiveEmployee.find("option").each(function () {
      // stringify employee.isActiveEmployee from boolean to string
      if (JSON.stringify(employee.isActiveEmployee).toLowerCase() === $(this).val().toLowerCase()) {
        $(this).attr("selected", true);
      } else {
        $(this).attr("selected", false);
      }
    });
    $("#editHourlyPay").val(employee.hourlyPay);
    $("#editStartDate").val(employee.startDate);
    $("#editEmployeeModal").show();
  });
});

$("#saveEditEmployee").on("click", async (event) => {
  event.preventDefault();
  let employeeId = $("#editEmployeeModal").attr("employee-id");
  // TODO client side validation goes here BEFORE patching
  $("#modalErrorMessage").attr("hidden", true);
  try {
    let email = $("#editEmail").val();
    let firstName = $("#editFirstName").val();
    let lastName = $("#editLastName").val();
    let gender = $("#editGender").val();
    let address = $("#editAddress").val();
    let city = $("#editCity").val();
    let state = $("#editState").val();
    let zip = $("#editZip").val();
    let phone = $("#editPhoneNumber").val();
    let employmentStatus = $("#editEmploymentStatus").val();
    let isActiveEmployee = $("#editIsActiveEmployee").val();
    let hourlyPay = $("#editHourlyPay").val();
    let startDate = $("#editStartDate").val();

    await checkEmail(email);
    await checkString(firstName);
    await checkString(lastName);
    await checkGender(gender);
    await checkString(address);
    await checkString(city);
    await checkState(state);
    await checkZip(zip);
    await checkPhone(phone);
    await checkEmploymentStatus(employmentStatus);
    await checkBoolean(isActiveEmployee);
    await checkNumber(hourlyPay);
    await checkDate(startDate);
    $.ajax({
      url: `manager/employee/${employeeId}`,
      type: "PATCH",
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        address: address,
        city: city,
        state: state,
        zip: zip,
        phoneNumber: phone,
        employmentStatus: employmentStatus,
        isActiveEmployee: isActiveEmployee,
        hourlyPay: hourlyPay,
        startDate: startDate,
      },
    })
      .done((data) => {
        if (data.error) console.log("Error updating employee: ", data.error);
        else {
          let trQuery = `tr[employee-id=${employeeId}] `;
          $(trQuery + " .employeeName").text(data.firstName + " " + data.lastName);
          $(trQuery + " .employeeStatus").text(data.currentStatus);
          $(trQuery + " .employeeEmail").text(data.email);
          $(trQuery + " .employeePhone").text(data.phone);
          $(trQuery + " .employeeAddress").text(`${data.address}, ${data.city} ${data.state}, ${data.zip}`);
          $(trQuery + " .employeeGender").text(data.gender);
          $(trQuery + " .employeeHourlyPay").text("$" + data.hourlyPay);
          $(trQuery + " .employeeEmployment").text(data.employmentStatus);
          $(trQuery + " .employeeActive").text(data.isActiveEmployee === true ? "Yes" : "No");
          startDate = new Date(data.startDate);
          $(trQuery + " .employeeStart").text(startDate.toLocaleDateString("en-US"));
          $(trQuery + " .employeeManager").text(data.isManager ? "Manager" : "Employee");
          $("#editEmployeeModal").hide();
          resetModal();
        }
      })
      .fail((req, status, error) => console.log(error));
  } catch (e) {
    event.preventDefault();
    $("#modalErrorMessage").text(e);
    $("#modalErrorMessage").attr("hidden", false);
  }
});

$("#cancelEditEmployee").on("click", async (event) => {
  event.preventDefault();
  $("#editEmployeeModal").hide();
  $("#modalErrorMessage").attr("hidden", true);
  // reset the contents of the modal
  resetModal();
});

let resetModal = () => {
  // reset modal back to original state
  $(".modal-body input").val("");
  $(".modal-body select").val("");
  $(".modal-body select option").removeAttr("selected");
  $("#modalErrorMessage").attr("hidden", true);
};