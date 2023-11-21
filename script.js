const inputInputElement = document.querySelector("#input-input");
const inputUnitsElement = document.querySelector("#input-units");
const outputInputElement = document.querySelector("#output-input");
const outputUnitsElement = document.querySelector("#output-units");

inputInputElement.addEventListener("input", update);
inputUnitsElement.addEventListener("input", update);
outputUnitsElement.addEventListener("input", update);


const units = [
  {
    name: 'mm',
    type: 'length',
    weight: 1
  },
  {
    name: 'inch',
    type: 'length',
    weight: 25.4
  },
  {
    name: 'meter',
    type: 'length',
    weight: 1000
  },
  {
    name: 'grams',
    type: 'weight',
    weight: 1
  },
  {
    name: 'ounce',
    type: 'weight',
    weight: 28.3495
  },
  {
    name: 'lbs',
    type: 'weight',
    weight: 453.592
  },
  {
    name: 'kgs',
    type: 'weight',
    weight: 1000
  },
];


units.forEach(function (unit) {
  const optionElement = document.createElement('option');
  optionElement.value = unit.name;

  if (unit.name === 'mm') {
    optionElement.selected = true;
  }

  optionElement.innerText = unit.name;

  outputUnitsElement.appendChild(optionElement);
})


units.forEach(function (unit) {
  const optionElement = document.createElement('option');
  optionElement.value = unit.name;

  if (unit.name === 'inch') {
    optionElement.selected = true;
  }

  optionElement.innerText = unit.name;

  inputUnitsElement.appendChild(optionElement);
})





function update() {
  const inputNumber = Number(inputInputElement.value);

  const inputUnit = units.find(function (unit) {
    return unit.name == inputUnitsElement.value;
  });

  const outputUnit = units.find(function (unit) {
    return unit.name == outputUnitsElement.value;
  });

  if (!outputUnit || !inputUnit) {
    console.error('Invalid unit type');
    emptyResponse();
    return;
  }

  if (!areUnitsCompatible(inputUnit, outputUnit)) {
    console.error(inputUnit.name + ' is not compatible with ' + outputUnit.name);
    emptyResponse();
    return;
  }


  const baseInputNumber = inputNumber * inputUnit.weight;
  const outputNumber = baseInputNumber / outputUnit.weight;


  console.log(
    inputNumber, inputUnit.name, ' equals ', outputNumber, outputUnit.name
  );

  outputInputElement.value = outputNumber;
}


function areUnitsCompatible(unit1, unit2) {
  return unit1.type === unit2.type;
}

function emptyResponse() {
  outputInputElement.value = '';
}