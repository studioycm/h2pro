const rangeSlider = (element, meaning = "%") => {
  // set cap/max for hours input value
  const hoursCap = 8760;
  // get initial min and max values from input element
  const min = Number(element.min);
  let max = Number(element.max); // changed max from const to let, so that it can be dynamic
  // get initial input element value
  let elValue = Number(element.value);
  
  // if meaning is hrs, set max at 8760 hours, and cap elValue at 8760.
  if (meaning === "hrs") {
    elValue = Number(element.value) >= 8760 ? 8760 : Number(element.value);
    max = hoursCap;
  }

  // calc percentage value for styling range slider with css 
  const percentageValue = ((elValue - min) / (max - min)) * 100;
  
  // set background color of range slider
  const backgroundLinear = `linear-gradient(to right, rgb(114, 190, 68) 0%, rgb(139, 223, 89) ${percentageValue}%, rgb(239, 242, 245) ${percentageValue}%, rgb(239, 242, 245) 100%)`;
  element.style.background = backgroundLinear;
  
  // set left position of label
  element.parentElement.children[2].style.left = `${percentageValue}%`;
  element.parentElement.children[3].style.left = `${percentageValue}%`;
  
  // merged 2conditional statements of "kg" and "MWh" to one 
  if (meaning === "kg" || meaning === "MWh") {
    element.parentElement.children[2].children[0].innerText = `$${elValue} / ${meaning}`;
  } else {
    element.parentElement.children[2].children[0].innerText = `${elValue} ${meaning}`;
  }
};


document
  .getElementById("track1")
  .addEventListener("input", ({ target }) => rangeSlider(target, "MW"));

document
  .getElementById("track2")
  .addEventListener("input", ({ target }) => rangeSlider(target, "hrs"));

document
  .getElementById("track3")
  .addEventListener("input", ({ target }) => rangeSlider(target, "kg"));

document
  .getElementById("track4")
  .addEventListener("input", ({ target }) => rangeSlider(target, "ktpa"));

document
  .getElementById("track5")
  .addEventListener("input", ({ target }) => rangeSlider(target, "MWh"));

rangeSlider(document.getElementById("track1"), "MW");
rangeSlider(document.getElementById("track2"), "hrs");
rangeSlider(document.getElementById("track3"), "kg");
rangeSlider(document.getElementById("track4"), "ktpa");
rangeSlider(document.getElementById("track5"), "MWh");
