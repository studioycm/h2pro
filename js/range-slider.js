const rangeSlider = (element, min, max, meaning = "%") => {
  const currentValue = ((Number(element.value) - min) / (max - min)) * 100;

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
  } else {
    element.parentElement.children[2].children[0].innerText = `${Number(
      element.value
    )} ${meaning}`;
  }
};

document
  .getElementById("track1")
  .addEventListener("input", ({ target }) =>
    rangeSlider(target, 100, 1000, "MW")
  );

document
  .getElementById("track2")
  .addEventListener("input", ({ target }) => rangeSlider(target, 30, 100));

document
  .getElementById("track3")
  .addEventListener("input", ({ target }) => rangeSlider(target, 1, 5, "kg"));

document
  .getElementById("track4")
  .addEventListener("input", ({ target }) =>
    rangeSlider(target, 10, 100, "ktpa")
  );

document
  .getElementById("track5")
  .addEventListener("input", ({ target }) =>
    rangeSlider(target, 10, 100, "MWh")
  );

document.getElementById("track1");

rangeSlider(document.getElementById("track1"), 100, 1000, "MW");
rangeSlider(document.getElementById("track2"), 30, 100);
rangeSlider(document.getElementById("track3"), 1, 5, "kg");
rangeSlider(document.getElementById("track4"), 10, 100, "ktpa");
rangeSlider(document.getElementById("track5"), 10, 100, "MWh");
