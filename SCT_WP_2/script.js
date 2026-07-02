const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleInput(button.innerText);
  });
});

function handleInput(value) {
  if (value === "AC") {
    display.value = "";
  } 
  else if (value === "⌫") {
    display.value = display.value.slice(0, -1);
  } 
  else if (value === "=") {
    calculateResult();
  } 
  else {
    display.value += value;
  }
}

function calculateResult() {
  try {
    if (display.value === "") {
      display.value = "";
      return;
    }

    let result = eval(display.value);

    if (!isFinite(result)) {
      display.value = "Math Error";
    } else {
      display.value = result;
    }
  } catch {
    display.value = "Error";
  }
}

// Keyboard input handling
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ((key >= "0" && key <= "9") || ["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
    display.value += key;
  } 
  else if (key === "Enter") {
    calculateResult();
  } 
  else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } 
  else if (key === "Escape") {
    display.value = "";
  }
});