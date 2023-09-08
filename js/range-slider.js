const rangeSlider = (element, meaning = "%") => {
  const min = Number(element.min);
  let max = Number(element.max);
  const hoursCap = 8760;
  let elValue = Number(element.value);
  if (meaning === "hrs") {
    elValue = Number(element.value) >= 8760 ? 8760 : Number(element.value);
    max = hoursCap;
  }


  const currentValue = ((elValue - min) / (max - min)) * 100;
  
  console.log("meaning");
  console.log(meaning);
  console.log("min: " + min, "max: " + max);
  console.log("element.value");
  console.log(element.value);
  console.log("elValue after cap");
  console.log(elValue);
  console.log("currentValue");
  console.log(currentValue);
  console.log("label before");
  console.log(element.parentElement.children[2].children[0].innerText);
  console.log("label now");
  console.log(elValue);
  const backgroundLinear = `
    linear-gradient(to right, rgb(114, 190, 68) 0%, rgb(139, 223, 89) ${currentValue}%, rgb(239, 242, 245) ${currentValue}%, rgb(239, 242, 245) 100%)`;

  element.style.background = backgroundLinear;

  element.parentElement.children[2].style.left = `${currentValue}%`;
  element.parentElement.children[3].style.left = `${currentValue}%`;

  if (meaning === "kg") {
    element.parentElement.children[2].children[0].innerText = `$${Number(
      element.value
    )} / kg`;
  } else if (meaning === "MWh") {
    element.parentElement.children[2].children[0].innerText = `$${Number(
      element.value
    )} / MWh`;
  } else if (meaning === "hrs") {
    element.parentElement.children[2].children[0].innerText = `${elValue} hrs`;
    console.log("'hrs' label now");
    console.log(element.parentElement.children[2].children[0].innerText);
  } else {
    element.parentElement.children[2].children[0].innerText = `${Number(
      element.value
    )} ${meaning}`;
  }
};

const checkValue = (rangeInput) => {
  // console.log(rangeInput.value);
  // if (Number(rangeInput.value) >= 8500) {
  //   rangeInput.setAttribute("step", "260");
  // } else if (
  //   Number(rangeInput.value) !== 8760 &&
  //   Number(rangeInput.value) > 8500
  // ) {
  //   rangeInput.setAttribute("step", "500");
  // } else {
  //   rangeInput.setAttribute("step", "500");
  // }
  // console.log(rangeInput.step);
};

document
  .getElementById("track1")
  .addEventListener("input", ({ target }) => rangeSlider(target, "MW"));

document.getElementById("track2").addEventListener("input", ({ target }) => {
  checkValue(target);
  rangeSlider(target, "hrs");
});

document
  .getElementById("track3")
  .addEventListener("input", ({ target }) => rangeSlider(target, "kg"));

document
  .getElementById("track4")
  .addEventListener("input", ({ target }) => rangeSlider(target, "ktpa"));

document
  .getElementById("track5")
  .addEventListener("input", ({ target }) => rangeSlider(target, "MWh"));

document.getElementById("track1");

rangeSlider(document.getElementById("track1"), "MW");
rangeSlider(document.getElementById("track2"), "hrs");
rangeSlider(document.getElementById("track3"), "kg");
rangeSlider(document.getElementById("track4"), "ktpa");
rangeSlider(document.getElementById("track5"), "MWh");
