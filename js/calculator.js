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
  const result = (I3 - I2) * D4 * 20;

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

const formatNumber = (number) => {
  if (Number.isInteger(number)) {
    return number.toString();
  } else {
    return number.toFixed(2);
  }
};

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

  if ((calcConvetionalValue / 159) * 100 < 15) {
    if (!valueConvetional.parentElement.classList.contains("active")) {
      valueConvetional.parentElement.classList.add("active");
    }
  } else {
    if (valueConvetional.parentElement.classList.contains("active")) {
      valueConvetional.parentElement.classList.remove("active");
    }
  }

  if ((calcEtacValue / 209) * 100 < 15) {
    if (!valueEtac.parentElement.classList.contains("active")) {
      valueEtac.parentElement.classList.add("active");
    }
  } else {
    if (valueEtac.parentElement.classList.contains("active")) {
      valueEtac.parentElement.classList.remove("active");
    }
  }

  if ((calcProfitsValue / 4930) * 100 < 15) {
    if (!valueProfits.parentElement.classList.contains("active")) {
      valueProfits.parentElement.classList.add("active");
    }
  } else {
    if (valueProfits.parentElement.classList.contains("active")) {
      valueProfits.parentElement.classList.remove("active");
    }
  }

  valueConvetional.innerText = Math.floor(calcConvetionalValue);
  elConvetional.style.height = `${(calcConvetionalValue / 209) * 100}%`;

  valueEtac.innerText = Math.floor(calcEtacValue);
  elEtac.style.height = `${(calcEtacValue / 209) * 100}%`;

  valueProfits.innerText =
    Number(calcProfitsValue) < 0.6
      ? `$0.5`
      : `$${Math.floor(calcProfitsValue)}`;

  elProfits.style.height = `${(calcProfitsValue / 4930) * 100}%`;
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

  if ((calculateConsumerConventionalResult / 11000) * 100 < 15) {
    if (!valueConvetionalConsumer.parentElement.classList.contains("active")) {
      valueConvetionalConsumer.parentElement.classList.add("active");
    }
  } else {
    if (valueConvetionalConsumer.parentElement.classList.contains("active")) {
      valueConvetionalConsumer.parentElement.classList.remove("active");
    }
  }

  if ((calculateConsumerEtacResult / 8400) * 100 < 15) {
    if (!valueEtacConsumer.parentElement.classList.contains("active")) {
      valueEtacConsumer.parentElement.classList.add("active");
    }
  } else {
    if (valueEtacConsumer.parentElement.classList.contains("active")) {
      valueEtacConsumer.parentElement.classList.remove("active");
    }
  }

  if ((calculateConsumerProfitsResult / 260) * 100 < 15) {
    if (!valueProfitsConsumer.parentElement.classList.contains("active")) {
      valueProfitsConsumer.parentElement.classList.add("active");
    }
  } else {
    if (valueProfitsConsumer.parentElement.classList.contains("active")) {
      valueProfitsConsumer.parentElement.classList.remove("active");
    }
  }

  valueConvetionalConsumer.innerText = Math.floor(
    calculateConsumerConventionalResult
  );
  elConvetionalConsumer.style.height = `${
    (calculateConsumerConventionalResult / 11000) * 100
  }%`;

  valueEtacConsumer.innerText = Math.floor(calculateConsumerEtacResult);
  elEtacConsumer.style.height = `${
    (calculateConsumerEtacResult / 11000) * 100
  }%`;

  valueProfitsConsumer.innerText =
    calculateConsumerConventionalResult <= 0.4
      ? `$0.5`
      : `$${Math.floor(calculateConsumerProfitsResult)}`;
  elProfitsConsumer.style.height = `${
    (calculateConsumerProfitsResult / 130) * 100
  }%`;
};

valueSize.addEventListener("input", calculateDeveloper);
valueCapacity.addEventListener("input", calculateDeveloper);
valueHydrogen.addEventListener("input", calculateDeveloper);

valueHydrogenConsumer.addEventListener("input", calculateConsumer);
valueCostElectricity.addEventListener("input", calculateConsumer);

calculateDeveloper();
calculateConsumer();
