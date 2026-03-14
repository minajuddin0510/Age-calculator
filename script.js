const birthDateInput = document.getElementById("birthDate");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

const today = new Date();
birthDateInput.max = formatDate(today);

calculateBtn.addEventListener("click", () => {
  if (!birthDateInput.value) {
    showError("Please select your date of birth.");
    return;
  }

  const birthDate = new Date(`${birthDateInput.value}T00:00:00`);
  const now = new Date();

  if (birthDate > now) {
    showError("Date of birth cannot be in the future.");
    return;
  }

  const age = calculateAge(birthDate, now);
  result.classList.remove("error");
  result.textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
});

function calculateAge(birthDate, currentDate) {
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += previousMonthDate.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function showError(message) {
  result.classList.add("error");
  result.textContent = message;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
