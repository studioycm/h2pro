const calculatorDeveloper = document.querySelector(".definitions-calculator-developer");
const calculatorConsumer = document.querySelector(".definitions-calculator-consumer");
const graphDeveloper = document.querySelector(".definitions-graph-developer");
const graphConsumer = document.querySelector(".definitions-graph-consumer");
const buttons = document.querySelector(".definitions-calculator-categories");

const switchButtons = ({ target }) => {
  if (target.nodeName !== "BUTTON") return;

  Array.from(buttons.children).map((item) => {
    item.classList.remove("active");
  });

  target.classList.add("active");

  if (buttons.children[0].classList.contains("active")) {
    calculatorDeveloper.classList.remove("active");
    calculatorConsumer.classList.remove("active");

    graphDeveloper.classList.remove("active");
    graphConsumer.classList.remove("active");
  } else {
    if (calculatorDeveloper.classList.contains("active")) {
    } else {
      calculatorDeveloper.classList.add("active");
      calculatorConsumer.classList.add("active");

      graphDeveloper.classList.add("active");
      graphConsumer.classList.add("active");
    }
  }
};

// buttons.addEventListener("click", switchButtons);

// diffrent toggle function, efficiant and shorter then the above - when button clicked then toggle active class for the two pairs of elements - calculators and graphs
// the html initial state for the developer calculator and graph is they have "active" class already

const toggleButtons = ({ target }) => {
  if (target.nodeName !== "BUTTON") return;

  Array.from(buttons.children).map((item) => {
    item.classList.remove("active");
  });

  target.classList.add("active");

  calculatorDeveloper.classList.toggle("active");
  calculatorConsumer.classList.toggle("active");

  graphDeveloper.classList.toggle("active");
  graphConsumer.classList.toggle("active");
}
 
buttons.addEventListener("click", toggleButtons);