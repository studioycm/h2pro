const rangeSlider = (element, min, max, meaning = "%") => {
  const currentValue = (Number(element.value) / max) * 100;
  // console.log(element.value - min);

  const backgroundLinear = `
    linear-gradient(to right, rgb(114, 190, 68) 0%, rgb(139, 223, 89) ${currentValue}%, rgb(239, 242, 245) ${currentValue}%, rgb(239, 242, 245) 100%)`;

  element.style.background = backgroundLinear;

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
