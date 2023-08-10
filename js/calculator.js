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

const elConvetionalConsumer = document.getElementById(
  "el-convetional-consumer"
);
const valueConvetionalConsumer = document.getElementById(
  "value-convetional-consumer"
);

const elEtacConsumer = document.getElementById("el-etac-consumer");
const valueEtacConsumer = document.getElementById("value-etac-consumer");

const elProfitsConsumer = document.getElementById("el-profits-consumer");
const valueProfitsConsumer = document.getElementById("value-profits-consumer");

function calculateDeveloperConventional(D2, D3) {
  const KWH = 1 / 55;

  const result = D2 * 8760 * (D3 / 100) * KWH * 0.001;

  return result;
}

function calculateDeveloperEtac(D2, D3) {
  const KWH = 1 / 42;
  const result = D2 * 8760 * (D3 / 100) * KWH * 0.001;

  return result;
}

function calculateDeveloperProfits(I2, I3, D4) {
  const result = (I3 - I2) * D4;

  return result;
}

const calculateConsumerConventional = (D2) => {
  return D2 * 55;
};

const calculateConsumerEtac = (D2) => {
  return D2 * 42;
};

function calculateConsumerProfits(I2, I3, D3) {
  const result = (I2 - I3) * D3 * 0.001;

  return result;
}

const calculateDeveloper = () => {
  const calcConvetionalValue = calculateDeveloperConventional(
    Number(valueSize.value),
    Number(valueCapacity.value)
  );

  const calcEtacValue = calculateDeveloperEtac(
    Number(valueSize.value),
    Number(valueCapacity.value)
  );

  const calcProfitsValue = calculateDeveloperProfits(
    calcConvetionalValue,
    calcEtacValue,
    Number(valueHydrogen.value)
  );

  valueConvetional.innerText = Math.floor(calcConvetionalValue);
  elConvetional.style.height = `${(calcConvetionalValue / 159) * 100}%`;

  valueEtac.innerText = Math.floor(calcEtacValue);
  elEtac.style.height = `${(calcEtacValue / 209) * 100}%`;

  valueProfits.innerText = `$${Math.floor(calcProfitsValue)}`;
  elProfits.style.height = `${(calcProfitsValue / 493) * 100}%`;
};

const calculateConsumer = () => {
  const calculateConsumerConventionalResult = calculateConsumerConventional(
    Number(valueHydrogenConsumer.value)
  );

  const calculateConsumerEtacResult = calculateConsumerEtac(
    Number(valueHydrogenConsumer.value)
  );

  const calculateConsumerProfitsResult = calculateConsumerProfits(
    calculateConsumerConventionalResult,
    calculateConsumerEtacResult,
    Number(valueCostElectricity.value)
  );

  valueConvetionalConsumer.innerText = Math.floor(
    calculateConsumerConventionalResult
  );
  elConvetionalConsumer.style.height = `${
    (calculateConsumerConventionalResult / 11500) * 100
  }%`;

  valueEtacConsumer.innerText = Math.floor(calculateConsumerEtacResult);
  elEtacConsumer.style.height = `${
    (calculateConsumerEtacResult / 8400) * 100
  }%`;

  valueProfitsConsumer.innerText = `$${Math.floor(
    calculateConsumerProfitsResult
  )}`;
  elProfitsConsumer.style.height = `${
    (calculateConsumerProfitsResult / 260) * 100
  }%`;
};

valueSize.addEventListener("input", calculateDeveloper);
valueCapacity.addEventListener("input", calculateDeveloper);
valueHydrogen.addEventListener("input", calculateDeveloper);

valueHydrogenConsumer.addEventListener("input", calculateConsumer);
valueCostElectricity.addEventListener("input", calculateConsumer);

calculateDeveloper();
calculateConsumer();
