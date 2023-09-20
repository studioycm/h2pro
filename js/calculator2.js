// Global constants
const eTacKWH = 1 / 42;
const convKWH = 1 / 55;
const eTacPCmod = 42;
const convPCmod = 55;
const developerProfitModifier = 20;
const maxValueCapacity = 8760;

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

const etacMinValue = 4;
const etacMaxValue = 209;
const etacMinHeight = 15; // in percentage
const etacMaxHeight = 100; // in percentage

const conventionalMinValue = 3;
const conventionalMaxValue = 209;
const conventionalMinHeight = 10; // in percentage
const conventionalMaxHeight = 100; // in percentage, adjust as needed

const profitMinValue = 17;
const profitMaxValue = 4930;
const profitMinHeight = 20; // in percentage
const profitMaxHeight = 100; // in percentage, adjust as needed


// Calculation functions
function calculateDeveloperConventional(D2, D3) {
  return D2 * D3 * convKWH * 0.001;
}

function calculateDeveloperEtac(D2, D3) {
  return D2 * D3 * eTacKWH * 0.001;
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
  return (I2 - I3) * D3 * 0.001;
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

  // Calculate the percentage heights for each bar
  const maxEtacCalc = valueSize.max * maxValueCapacity * eTacKWH * 0.001;
  const maxConvCalc = valueSize.max * maxValueCapacity * convKWH * 0.001;

  const developerConventionalHeight = Math.max(5, (calcDeveloperConventional / maxConvCalc) * 100);
  const developerEtacHeight = Math.max(15, (calcDeveloperEtac / maxEtacCalc) * 100);
  const developerProfitsHeight = Math.max(20, (calcDeveloperProfits / ((maxEtacCalc - maxConvCalc) * valueHydrogen.getAttribute("max") * developerProfitModifier)) * 100);

  const consumerConventionalHeight = Math.max(15, (calcConsumerConventional / (valueHydrogenConsumer.getAttribute("max") * convPCmod)) * 100);
  const consumerEtacHeight = Math.max(5, (calcConsumerEtac / (valueHydrogenConsumer.getAttribute("max") * eTacPCmod)) * 100);
  const consumerProfitsHeight = Math.max(20, (calcConsumerProfits / ((valueHydrogenConsumer.getAttribute("max") * convPCmod - valueHydrogenConsumer.getAttribute("max") * eTacPCmod) * valueCostElectricity.max * 0.001)) * 100);

  const etacHeightPercentage = etacMinHeight + ((etacMaxHeight - etacMinHeight) * (calcDeveloperEtac - etacMinValue)) / (etacMaxValue - etacMinValue);
  const conventionalHeightPercentage = conventionalMinHeight + ((conventionalMaxHeight - conventionalMinHeight) * (calcDeveloperConventional - conventionalMinValue)) / (conventionalMaxValue - conventionalMinValue);
  const profitHeightPercentage = profitMinHeight + ((profitMaxHeight - profitMinHeight) * (calcDeveloperProfits - profitMinValue)) / (profitMaxValue - profitMinValue);
  
  
  // Update the bar heights and value labels in the DOM
  elConvetional.style.height = `${conventionalHeightPercentage}%`;
  valueConvetional.innerText = customRound(calcDeveloperConventional);

  elEtac.style.height = `${etacHeightPercentage}%`;
  valueEtac.innerText = customRound(calcDeveloperEtac);

  elProfits.style.height = `${profitHeightPercentage}%`;
  valueProfits.innerText = customRound(calcDeveloperProfits);

  elConvetionalConsumer.style.height = `${consumerConventionalHeight}%`;
  valueConvetionalConsumer.innerText = customRound(calcConsumerConventional);

  elEtacConsumer.style.height = `${consumerEtacHeight}%`;
  valueEtacConsumer.innerText = customRound(calcConsumerEtac);

  elProfitsConsumer.style.height = `${consumerProfitsHeight}%`;
  valueProfitsConsumer.innerText = customRound(calcConsumerProfits);
}

// Event listeners for input changes
[valueSize, valueCapacity, valueHydrogen, valueHydrogenConsumer, valueCostElectricity].forEach(input => {
  input.addEventListener('input', updateBarsAndLabels);
});

// Initial setup
window.addEventListener('load', () => {
  updateBarsAndLabels();
});
