const rangeSlider = (element, min, max, meaning = "%") => {
  // const currentValue = (Number(element.value) / max) * 100;
  const currentValue = (
    ((Number(element.value) - min) / (max - min)) *
    100
  ).toFixed(2);

  console.dir(element.getBoundingClientRect().width);

  const backgroundLinear = `
    linear-gradient(to right, rgb(114, 190, 68) 0%, rgb(139, 223, 89) ${currentValue}%, rgb(239, 242, 245) ${currentValue}%, rgb(239, 242, 245) 100%)`;

  element.style.background = backgroundLinear;

  element.parentElement.children[2].style.left = `${currentValue}%`;
  element.parentElement.children[2].children[0].innerText = `${Number(
    element.value
  )}${meaning}`;
};

document
  .getElementById("track1")
  .addEventListener("input", ({ target }) =>
    rangeSlider(target, 100, 1050, "MW")
  );

document
  .getElementById("track2")
  .addEventListener("input", ({ target }) => rangeSlider(target, 0, 100));

document
  .getElementById("track3")
  .addEventListener("input", ({ target }) => rangeSlider(target, 0, 10, "kg"));

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
