const emailInput = document.getElementById("email");
const fullNameInput = document.getElementById("full-name");
const submitBtn = document.getElementById("submit-btn");
const userInfo = document.getElementById("user-info");
const gravatarImg = document.getElementById("gravatar");
const usernameSpan = document.getElementById("username");

submitBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const fullName = fullNameInput.value.trim();
  if (email && fullName) {
    const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?s=50`;
    localStorage.setItem("gravatarUrl", gravatarUrl);
    localStorage.setItem("email", email);
    localStorage.setItem("fullName", fullName);
    window.location.href = "./home/index.html";
  }
});

function md5(str) {
  return CryptoJS.MD5(str).toString();
}
