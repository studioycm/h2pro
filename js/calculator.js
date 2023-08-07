const valueSize = document.getElementById("track1");
const valueCapacity = document.getElementById("track2");
const valueHydrogen = document.getElementById("track3");

const elConvetional = document.getElementById("el-convetional");
const valueConvetional = document.getElementById("value-convetional");

const elEtac = document.getElementById("el-etac");
const valueEtac = document.getElementById("value-etac");

const elProfits = document.getElementById("el-profits");
const valueProfits = document.getElementById("value-profits");

function calculateConventional(D2, D3) {
  const KWH = 1 / 55;

  const result = D2 * 8760 * (D3 / 100) * KWH * 0.001;

  return result;
}

function calculateEtac(D2, D3) {
  const KWH = 1 / 42;
  const result = D2 * 8760 * (D3 / 100) * KWH * 0.001;

  return result;
}

function calculateProfits(I2, I3, D4) {
  const result = (I3 - I2) * D4;

  return result;
}

const calculatorDeveloper = () => {
  const calcConvetionalValue = calculateConventional(
    Number(valueSize.value),
    Number(valueCapacity.value)
  );

  const calcEtacValue = calculateEtac(
    Number(valueSize.value),
    Number(valueCapacity.value)
  );

  const calcProfitsValue = calculateProfits(
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

valueSize.addEventListener("input", calculatorDeveloper);
valueCapacity.addEventListener("input", calculatorDeveloper);
valueHydrogen.addEventListener("input", calculatorDeveloper);
