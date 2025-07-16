const inputSlider = document.querySelector(".slider");
const lengthSelector = document.querySelector(".length");
const passwordDisplay = document.querySelector(".passwordDisplay");
const copyBtn = document.querySelector(".bb");
const copyMes = document.querySelector(".msgcopy");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const NumbersCheck = document.querySelector("#numbers");
const SymbolsCheck = document.querySelector("#symbols");
const Indicator = document.querySelector(".circle");
const generateBtn = document.querySelector(".generateBtn");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
//starting ma password kya hai
//starting ma password length 10 man rha hu
//starting ma uppercase checkbox ko tick krkr de rha hai
//strting ma indicator grey

let password = "";

let passwordlength = 15;
let checkCounter = 0;

handleSlider();

//set passwordLength
//jo slider aaga picha kroge us mutabik password length set kr dega
//paswordlength ko ui pa reflect krata hai;
function handleSlider() {
  inputSlider.value = passwordlength;
  //jo length hai woh starting ma 10 ho
  lengthSelector.innerText = passwordlength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordlength - min) * 100) / (max - min) + "% 100%";
}
//   If the slider's range is from 1 to 20, and current value is 10:

// min = 1

// max = 20

// passwordLength = 10

// So:
// ((10 - 1) * 100) / (20 - 1) = (9 * 100) / 19 ≈ 47.36%
// This fills about 47% of the slider background to indicate the current length visually. iska matlab slider ko move karenge kisi value pe toh indicate hoga
//kaha tak filled h aur kaha tak bacha hua h aur percentage nikalne  ke liye we used the formula

//color set
//shadow set
function setindicator(color) {
  Indicator.style.backgroundColor = color;
  Indicator.style.boxShadow = `0px 0px 12px 1px ${color} `;
}
//min aur max ka bich ma ek random integer findout krkr deta hai

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomInteger() {
  return getRandomInteger(0, 9);
}

function generateUpperCase() {
  return String.fromCharCode(getRandomInteger(65, 91));
}
function generateLowerCase() {
  return String.fromCharCode(getRandomInteger(97, 123));
}
function generatesymbols() {
  return String.fromCharCode(getRandomInteger(65, 91));
}
//symbol ki string se randomly index pakar kar uss index pa jo symbol pda hai woh deta hai
function generateSymbols() {
  //string len find in order to find max
  const randNum = getRandomInteger(0, symbols.length);
  return symbols[randNum];
}

function calculateStrength() {
  let hasupper = false;
  let haslower = false;
  let hasNum = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) {
    hasupper = true;
  }
  if (lowercaseCheck.checked) {
    haslower = true;
  }
  if (NumbersCheck.checked) {
    hasNum = true;
  }
  if (SymbolsCheck.checked) {
    hasSymbol = true;
  }

  if (hasupper && haslower && (hasNum || hasSymbol) && passwordlength >= 8) {
    setindicator("green");
  } else if (
    (haslower || hasupper) &&
    (hasNum || hasSymbol) &&
    passwordlength >= 6
  ) {
    setindicator("yellow");
  } else {
    setindicator("red");
  }
}

//clipboard api
//async function
//jo bhi content password display ki field ka andar ussa clipboard pa copy krta hai
//write text method jo promise return krta haiclipboard

//promise resolve or reject dono ho skta hai so we give in try and catch block
//copy msg invisible ho gya kuch time ka bad
//   navigator.clipboard.writeText(...) — What Is It?
//  It’s a built-in Web API method
// You must write it exactly like this — it's not a variable or function you created, it's provided by the browser.

//  Think of it like a predefined tool:
// navigator.clipboard.writeText("hello");
// means:
//  Ask the browser's "clipboard manager" to copy the string "hello" to the user's clipboard.
async function copycontent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMes.innerText = "copied";
  } catch (error) {
    copyMes.innerText = "Failed";
  }
  //to make copy wala span visible
  copyMes.classList.add("active");
  // isse ek active karke class ban jaayega jisko humlog webpage pe show kar sakte h aur edit bhi kar sakte h without adding it inside the html

  //copy wala text ko gyab krne ka liye set time out ka use karenge
  setTimeout(() => {
    copyMes.classList.remove("active");
  }, 2000);
}
//to add event listener
//slider ko jb bhi aag picha kr raha hun to slider ki value change ho rhi yeh woh value lakar de rha hai
inputSlider.addEventListener("input", (e) => {
  //pasword length ko update kr diya
  passwordlength = e.target.value;
  handleSlider();
});
//copy btn add event listener
//input value koi value hogi tb copy kr payoge
copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copycontent();
  }
});
function handleCheckBoxChange() {
  checkCounter = 0;
  allCheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCounter++;
    }
  });
}

//special condition of password length< no of checkbocx count
if (passwordlength < checkCounter) {
  passwordlength = checkCounter;
  handleSlider();
}
//saara checkbocx pa even listener lga denga
//chahe tick ho ho rha ya untick usma check krkr aao kitna checkbox cheked hai
allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

// 🎲 Pick a random index j from 0 to i
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

//generate password
//jb mai sare boxes ko unchecked kr deta hu then click krta hu genertae password
//then generate password nhi hota

generateBtn.addEventListener("click", () => {
  //koi bhi checkbox ticked nhi hai to hum password generate nhi kr sakta
  if (checkCounter == 0) {
    return;
  }

  if (passwordlength < checkCounter) {
    passwordlength = checkCounter;
    handleSlider();
  }

  // console.log("stating the journey");

  //lets start to journey to find new password

  //remove old password
  password = "";
  //check kru ki password ma kon si chiza dalni hai means konsa checkbox checked hai

  let funcArr = [];
  // This array will store functions (like generateUpperCase, generateLowerCase, etc.)

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  // If the uppercase checkbox is ticked, add the generateUpperCase function.

  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  // If lowercase checkbox is ticked, add that function.
  if (NumbersCheck.checked) {
    funcArr.push(generateRandomInteger);
  }
  // If numbers are selected, add the number generator function.

  if (SymbolsCheck.checked) {
    funcArr.push(generateSymbols);
  }
  // If symbols are selected, add that function.

  //  After this step, funcArr contains only the functions matching what user selected.

  //  3. Add at least one of each selected character type
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }
  // Loop through all selected functions.

  // Call each one (funcArr[i]()) to generate 1 character.

  // Add that character to the password string.

  //  This ensures each selected type is included at least once in the password.

  //  4. Add more random characters to reach total length

  for (let i = 0; i < passwordlength - funcArr.length; i++) {
    let randIndex = getRandomInteger(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  password = shufflePassword(Array.from(password));

  //  This helps avoid patterns like always starting with uppercase if that was first.
  // console.log("Ui addition done");
  //paswword bn ka bad strength bhi call krni padegi

  passwordDisplay.value = password;
  calculateStrength();
});
