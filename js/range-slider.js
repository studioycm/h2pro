const rangeSlider = (element, meaning = "%") => {
  const hoursCap = 8760;
  const min = Number(element.min);
  // changed max from const to let, so that it can be changed if "meaning" = hrs
  let max = Number(element.max);
  // get initial input element value
  let elValue = Number(element.value);
  // if meaning is hrs, set max at 8760 hours, and cap elValue at 8760.
  if (meaning === "hrs") {
    elValue = Number(element.value) >= 8760 ? 8760 : Number(element.value);
    max = hoursCap;
  }
  // parse value to a 
  const percentageValue = ((elValue - min) / (max - min)) * 100;
  
  // console.log("meaning");
  // console.log(meaning);
  // console.log("min: " + min, "max: " + max);
  // console.log("element.value");
  // console.log(element.value);
  // console.log("elValue after cap");
  // console.log(elValue);
  // console.log("percentageValue");
  // console.log(percentageValue);
  // console.log("label before");
  // console.log(element.parentElement.children[2].children[0].innerText);
  // console.log("label now");
  // console.log(elValue);

  const backgroundLinear = `
    linear-gradient(to right, rgb(114, 190, 68) 0%, rgb(139, 223, 89) ${percentageValue}%, rgb(239, 242, 245) ${percentageValue}%, rgb(239, 242, 245) 100%)`;

  element.style.background = backgroundLinear;

  element.parentElement.children[2].style.left = `${percentageValue}%`;
  element.parentElement.children[3].style.left = `${percentageValue}%`;

  if (meaning === "kg" || meaning === "MWh") {
    element.parentElement.children[2].children[0].innerText = `$${elValue} / ${meaning}`;
  } else {
    element.parentElement.children[2].children[0].innerText = `${elValue} ${meaning}`;
  }
};


document
  .getElementById("track1")
  .addEventListener("input", ({ target }) => rangeSlider(target, "MW"));

document.getElementById("track2").addEventListener("input", ({ target }) => {
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
