const rangeSlider = (element, min, max, meaning = "%") => {
  const currentValue = ((Number(element.value) - min) / (max - min)) * 100;

  console.log(element.value);

  const backgroundLinear = `
    linear-gradient(to right, rgb(114, 190, 68) 0%, rgb(139, 223, 89) ${currentValue}%, rgb(239, 242, 245) ${currentValue}%, rgb(239, 242, 245) 100%)`;

  element.style.background = backgroundLinear;

  element.parentElement.children[2].style.left = `${currentValue}%`;
  element.parentElement.children[3].style.left = `${currentValue}%`;

  if (meaning === "kg") {
    element.parentElement.children[2].children[0].innerText = `$${Number(
      element.value
    )} / kg`;
  } else {
    element.parentElement.children[2].children[0].innerText = `${Number(
      element.value
    )}${meaning}`;
  }
};

document
  .getElementById("track1")
  .addEventListener("input", ({ target }) =>
    rangeSlider(target, 100, 1000, "MW")
  );

document
  .getElementById("track2")
  .addEventListener("input", ({ target }) => rangeSlider(target, 10, 100));

document
  .getElementById("track3")
  .addEventListener("input", ({ target }) => rangeSlider(target, 1, 10, "kg"));

document
  .getElementById("track4")
  .addEventListener("input", ({ target }) =>
    rangeSlider(target, 10, 200, "MW")
  );

document
  .getElementById("track5")
  .addEventListener("input", ({ target }) =>
    rangeSlider(target, 10, 100, "kWh")
  );

document.getElementById("track1");

rangeSlider(document.getElementById("track1"), 100, 1000, "MW");
rangeSlider(document.getElementById("track2"), 10, 100);
rangeSlider(document.getElementById("track3"), 1, 10, "kg");
rangeSlider(document.getElementById("track4"), 10, 200, "MW");
rangeSlider(document.getElementById("track5"), 10, 100, "kWh");
