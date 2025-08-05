const inputUser = document.querySelector(".a3");
const inputPassword = document.querySelector(".a4");
const loginButton = document.querySelector(".a6");

loginButton.addEventListener("click", function (e) {
  e.preventDefault();

  let valueOfUser = inputUser.value.trim();
  let valueOfPass = inputPassword.value;

  if (valueOfUser === "" || valueOfPass === "") {
    alert("Please fill in all fields");
  } else if (valueOfUser === "user" && valueOfPass === "1234") {
    window.location.href = "index.html";
  } else {
    console.log(valueOfPass);
  }
});
