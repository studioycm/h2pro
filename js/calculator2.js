// Global constants
const eTacPCmod = 42;
const convPCmod = 55;
const eTacKWH = 1 / eTacPCmod;
const convKWH = 1 / convPCmod;
const developerProfitModifier = 20;
const consumerProfitModifier = 0.001;
const maxValueCapacity = 8760;
const barLabelPositionTrigger = 26; // in percentage

// DOM elements
const valueSize = document.getElementById("track1");
const valueCapacity = document.getElementById("track2");
const valueHydrogen = document.getElementById("track3");
const valueHydrogenConsumer = document.getElementById("track4");
const valueCostElectricity = document.getElementById("track5");

const elConvetional = document.getElementById("el-convetional");
const valueConvetional = document.getElementById("value-convetional");
const elEtac = document.getElementById("el-etac");
const valueEtac = document.getElementById("value-etac");
const elProfits = document.getElementById("el-profits");
const valueProfits = document.getElementById("value-profits");

const elConvetionalConsumer = document.getElementById("el-convetional-consumer");
const valueConvetionalConsumer = document.getElementById("value-convetional-consumer");
const elEtacConsumer = document.getElementById("el-etac-consumer");
const valueEtacConsumer = document.getElementById("value-etac-consumer");
const elProfitsConsumer = document.getElementById("el-profits-consumer");
const valueProfitsConsumer = document.getElementById("value-profits-consumer");

const developerGraph = document.querySelector(".definitions-graph-developer");

// Calculate the percentage heights for each bar
const maxEtacCalc = valueSize.max * maxValueCapacity * eTacKWH * consumerProfitModifier;
console.log("maxEtacCalc = " + maxEtacCalc);

// developer min and max
const etacMinValue = 4;
const etacMaxValue = 209;
const etacMinHeight = 12; // in percentage
const etacMaxHeight = 100; // in percentage

const conventionalMinValue = 3;
const conventionalMaxValue = 209;
const conventionalMinHeight = 6; // in percentage
const conventionalMaxHeight = 100; // in percentage, adjust as needed

let conventionalHeightMod = -2;

const profitMinValue = 17;
const profitMaxValue = 4930;

// consumer min and max
const etacMinValueConsumer = 420;
const etacMaxValueConsumer = 5500;
const etacMinHeightConsumer = 7.5; // in percentage
const etacMaxHeightConsumer = 100; // in percentage

const conventionalMinValueConsumer = 550;
const conventionalMaxValueConsumer = 5500;
const conventionalMinHeightConsumer = 15; // in percentage
const conventionalMaxHeightConsumer = 100; // in percentage, adjust as needed

const profitMinValueConsumer = 1;
const profitMaxValueConsumer = 130;

// profits min and max
const profitMinHeight = 20; // in percentage
const profitMaxHeight = 100; // in percentage, adjust as needed

// Calculation functions
function calculateDeveloperConventional(D2, D3) {
  return D2 * D3 * convKWH * consumerProfitModifier;
}

function calculateDeveloperEtac(D2, D3) {
  return D2 * D3 * eTacKWH * consumerProfitModifier;
}

function calculateDeveloperProfits(I2, I3, D4) {
  return (I3 - I2) * D4 * developerProfitModifier;
}

function calculateConsumerConventional(D2) {
  return D2 * convPCmod;
}

function calculateConsumerEtac(D2) {
  return D2 * eTacPCmod;
}

function calculateConsumerProfits(I2, I3, D3) {
  return (I2 - I3) * D3 * consumerProfitModifier;
}

// Custom round function
function customRound(number) {
  return Math.round(number);
}

// Main function to update bars and labels
function updateBarsAndLabels() {
  // Get the current input values
  let valueCapacityValue = Number(valueCapacity.value) >= maxValueCapacity ? maxValueCapacity : Number(valueCapacity.value);
  
  const calcDeveloperConventional = calculateDeveloperConventional(Number(valueSize.value), valueCapacityValue);
  const calcDeveloperEtac = calculateDeveloperEtac(Number(valueSize.value), valueCapacityValue);
  const calcDeveloperProfits = calculateDeveloperProfits(calcDeveloperConventional, calcDeveloperEtac, Number(valueHydrogen.value));

  const calcConsumerConventional = calculateConsumerConventional(Number(valueHydrogenConsumer.value));
  const calcConsumerEtac = calculateConsumerEtac(Number(valueHydrogenConsumer.value));
  const calcConsumerProfits = calculateConsumerProfits(calcConsumerConventional, calcConsumerEtac, Number(valueCostElectricity.value));

  const etacHeightPercentage = etacMinHeight + ((calcDeveloperEtac - etacMinValue) / (etacMaxValue - etacMinValue)) * (etacMaxHeight - etacMinHeight);
  const conventionalHeightPercentage = ( conventionalMinHeight + ((calcDeveloperConventional - conventionalMinValue) / (conventionalMaxValue - conventionalMinValue)) * (conventionalMaxHeight - conventionalMinHeight) ) + conventionalHeightMod;
  const profitHeightPercentage = profitMinHeight + ((calcDeveloperProfits - profitMinValue) / (profitMaxValue - profitMinValue)) * (profitMaxHeight - profitMinHeight);
  
  const etacHeightPercentageConsumer = etacMinHeightConsumer + ((calcConsumerEtac  - etacMinValueConsumer) / (etacMaxValueConsumer - etacMinValueConsumer)) * (etacMaxHeightConsumer - etacMinHeightConsumer);
  const conventionalHeightPercentageConsumer = conventionalMinHeightConsumer  + ((calcConsumerConventional - conventionalMinValueConsumer) / (conventionalMaxValueConsumer - conventionalMinValueConsumer)) * (conventionalMaxHeightConsumer  - conventionalMinHeightConsumer );
  const profitHeightPercentageConsumer = profitMinHeight + ((calcConsumerProfits  - profitMinValueConsumer ) / (profitMaxValueConsumer  - profitMinValueConsumer )) * (profitMaxHeight - profitMinHeight);
  
  // Update the bar heights and value labels in the DOM
  elConvetional.style.height = `${conventionalHeightPercentage}%`;
  valueConvetional.innerText = customRound(calcDeveloperConventional);

  elEtac.style.height = `${etacHeightPercentage}%`;
  valueEtac.innerText = customRound(calcDeveloperEtac);

  elProfits.style.height = `${profitHeightPercentage}%`;
  valueProfits.innerText = customRound(calcDeveloperProfits);

  elConvetionalConsumer.style.height = `${conventionalHeightPercentageConsumer}%`;
  valueConvetionalConsumer.innerText = customRound(calcConsumerConventional);

  elEtacConsumer.style.height = `${etacHeightPercentageConsumer}%`;
  valueEtacConsumer.innerText = customRound(calcConsumerEtac);

  elProfitsConsumer.style.height = `${profitHeightPercentageConsumer}%`;
  valueProfitsConsumer.innerText = customRound(calcConsumerProfits);

 
  let calc = (calcDeveloperConventional / etacMaxValue) * 100;
  console.log("conventional less then 30:" + calc);
 
  // move the bar label above or below top of the bar for all three bars based on the height of the lowest bar
  // if developerGraph have class "active" then set maxBarHeight to max between developer etac and developer profit, else set maxBarHeight to max between consumer conventional and consumer profit
  const maxBarHeight = developerGraph.classList.contains("active") ? Math.max(etacHeightPercentage, profitHeightPercentage) : Math.max(conventionalHeightPercentageConsumer, profitHeightPercentageConsumer);
  const minBarHeight = developerGraph.classList.contains("active") ? Math.min(conventionalHeightPercentage, profitHeightPercentage) : Math.min(etacHeightPercentageConsumer, profitHeightPercentageConsumer);
  console.log("minBarHeight = " + minBarHeight);
  if (minBarHeight < barLabelPositionTrigger ) {
    
    document.querySelectorAll(".definitions-graph > .active .bar-label").forEach(el => {
      if (!el.classList.contains("active")) {
        el.classList.add("active");
      }
    });
  }  else {
    
    // better efficiant way to remove class from all three bars (only from the ) only if it not already removed
    document.querySelectorAll(".definitions-graph > .active .bar-label").forEach(el => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });
  }


  // if ((calcDeveloperConventional / etacMaxValue) * 100 < 60) {
  //   if (!valueConvetional.parentElement.classList.contains("active")) {
  //     valueConvetional.parentElement.classList.add("active");
  //   }
  // } else {
  //   if (valueConvetional.parentElement.classList.contains("active")) {
  //     valueConvetional.parentElement.classList.remove("active");
  //   }
  // }

  // if ((calcDeveloperEtac / etacMaxValue) * 100 < 60) {
  //   if (!valueEtac.parentElement.classList.contains("active")) {
  //     valueEtac.parentElement.classList.add("active");
  //   }
  // } else {
  //   if (valueEtac.parentElement.classList.contains("active")) {
  //     valueEtac.parentElement.classList.remove("active");
  //   }
  // }

  // if ((calcDeveloperProfits / profitMaxValue) * 100 < 60) {
  //   if (!valueProfits.parentElement.classList.contains("active")) {
  //     valueProfits.parentElement.classList.add("active");
  //   }
  // } else {
  //   if (valueProfits.parentElement.classList.contains("active")) {
  //     valueProfits.parentElement.classList.remove("active");
  //   }
  // }

  //  if ((calcConsumerConventional / (conventionalMaxValueConsumer * 2)) * 100 < 30) {
  //   if (!valueConvetionalConsumer.parentElement.classList.contains("active")) {
  //     valueConvetionalConsumer.parentElement.classList.add("active");
  //   }
  // } else {
  //   if (valueConvetionalConsumer.parentElement.classList.contains("active")) {
  //     valueConvetionalConsumer.parentElement.classList.remove("active");
  //   }
  // }

  // if ((calcConsumerEtac / (conventionalMaxValueConsumer * 2)) * 100 < 30) {
  //   if (!valueEtacConsumer.parentElement.classList.contains("active")) {
  //     valueEtacConsumer.parentElement.classList.add("active");
  //   }
  // } else {
  //   if (valueEtacConsumer.parentElement.classList.contains("active")) {
  //     valueEtacConsumer.parentElement.classList.remove("active");
  //   }
  // }

  // if ((calcConsumerProfits / (profitMaxValueConsumer * 2)) * 100 < 30) {
  //   if (!valueProfitsConsumer.parentElement.classList.contains("active")) {
  //     valueProfitsConsumer.parentElement.classList.add("active");
  //   }
  // } else {
  //   if (valueProfitsConsumer.parentElement.classList.contains("active")) {
  //     valueProfitsConsumer.parentElement.classList.remove("active");
  //   }
  // }
  
  
}

// Event listeners for input changes
[valueSize, valueCapacity, valueHydrogen, valueHydrogenConsumer, valueCostElectricity].forEach(input => {
  input.addEventListener('input', updateBarsAndLabels);
});

// Initial setup
window.addEventListener('load', () => {
  updateBarsAndLabels();
});
