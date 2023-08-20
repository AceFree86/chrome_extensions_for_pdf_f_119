console.log("Label was triggered by some other means.");
function getElementCompany() {
  const company = document.querySelector('label[for="COMPANY"]');
  if (company) {
    company.addEventListener("click", function (event) {
      if (event instanceof MouseEvent) {
        const inputElement = document.querySelector(
          'input[placeholder="Автозаповнення Прізвища, Імені та По-батькові"]'
        );
        const inputElement2 = document.querySelector(
          'input[placeholder="Autofill of Last name, First Names and Patronymic"]'
        );
        if (inputElement) {
          inputElement.style.display = "none";
        } else if (inputElement2) {
          inputElement2.style.display = "none";
        }
      } else {
        console.log("Label was triggered by some other means.");
      }
    });
  }
}

function getElementIndividual() {
  const individual = document.querySelector('label[for="INDIVIDUAL"]');
  if (individual) {
    individual.addEventListener("click", function (event) {
      if (event instanceof MouseEvent) {
        const inputElement = document.querySelector(
          'input[placeholder="Автозаповнення Прізвища, Імені та По-батькові"]'
        );
        const inputElement2 = document.querySelector(
          'input[placeholder="Autofill of Last name, First Names and Patronymic"]'
        );
        if (inputElement) {
          inputElement.style.display = "block";
        } else if (inputElement2) {
          inputElement2.style.display = "block";
        }
      } else {
        console.log("Label was triggered by some other means.");
      }
    });
  }
}

function fillInputNames(text) {
  const family_name = document.querySelector('input[placeholder="Прізвище"]');
  const name = document.querySelector('input[placeholder="Ім\'я"]');
  const patronymic = document.querySelector('input[placeholder="По-батькові"]');
  if (family_name && name && patronymic) {
    if (text[0]) {
      family_name.value = text[0];
      family_name.dispatchEvent(new Event("change"));
    }
    if (text[1]) {
      name.value = text[1];
      name.dispatchEvent(new Event("change"));
    }
    if (text[2]) {
      patronymic.value = text[2];
      patronymic.dispatchEvent(new Event("change"));
    }
  }
}

function fillInputNamesEnglish(text) {
  const family_name2 = document.querySelector('input[placeholder="Last name"]');
  const name2 = document.querySelector('input[placeholder="First name"]');
  const patronymic2 = document.querySelector('input[placeholder="Patronymic"]');
  if (family_name2 && name2 && patronymic2) {
    if (text[0]) {
      family_name2.value = text[0];
      family_name2.dispatchEvent(new Event("change"));
    }
    if (text[1]) {
      name2.value = text[1];
      name2.dispatchEvent(new Event("change"));
    }
    if (text[2]) {
      patronymic2.value = text[2];
      patronymic2.dispatchEvent(new Event("change"));
    }
  }
}

function addInput() {
  const input = document.querySelector('input[placeholder="Прізвище"]');
  const input2 = document.querySelector('input[placeholder="Last name"]');
  if (input || input2) {
    const inputElement = document.createElement("input");
    inputElement.className =
      "form-control ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required";
    inputElement.type = "text";
    inputElement.placeholder = input2
      ? "Autofill of Last name, First Names and Patronymic"
      : "Автозаповнення Прізвища, Імені та По-батькові";
    inputElement.style.marginTop = "20px";
    const rowDiv = document.querySelector(".account-input");
    if (rowDiv) {
      rowDiv.appendChild(inputElement);
      inputElement.addEventListener("blur", function () {
        const inputValue = inputElement.value;
        const nameParts = inputValue.split(" ");
        if (input) {
          fillInputNames(nameParts);
        } else if (input2) {
          fillInputNamesEnglish(nameParts);
        }
      });
    } else {
      console.error("Div with class 'row' not found.");
    }
  }
}

function showElements() {
  chrome.storage.local.get("checkbox", (result) => {
    if (
      result.checkbox === "checked" ||
      typeof result.checkbox === "undefined"
    ) {
      getElementCompany();
      getElementIndividual();
      addInput();
    } else {
      console.log("Hide");
    }
  });
}

showElements();
