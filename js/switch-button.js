const calculatorDeveloper = document.querySelector(
  ".definitions-calculator-developer"
);

const calculatorConsumer = document.querySelector(
  ".definitions-calculator-consumer"
);

const graphDeveloper = document.querySelector(".definitions-graph-developer");

const graphConsumer = document.querySelector(".definitions-graph-consumer");

const buttons = document.querySelector(".definitions-calculator-categories");

const switchButtons = ({ target }) => {
  if (target.nodeName !== "BUTTON") return;

  Array.from(buttons.children).map((item) => {
    item.classList.remove("active");
  });

  calculatorDeveloper.classList.toggle("active");
  calculatorConsumer.classList.toggle("active");
  graphDeveloper.classList.toggle("active");
  graphConsumer.classList.toggle("active");
  target.classList.add("active");
};

buttons.addEventListener("click", switchButtons);
