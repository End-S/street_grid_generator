import { Street } from './locations/street.class';
import { StreetGridGenerator } from './generation/streetgrid.generation';
import { StreetGenerator } from './generation/street.generation';
import './index.scss';

const domGrid = document.getElementById('StreetOutput');
const domSelectedStreet = document.getElementById('SelectedStreet');
const gridSizeRange = document.getElementById('SizeRange') as HTMLInputElement;
const gridSizeLabel = document.getElementById('SizeRangeLabel');
const numberOfStreetsRange = document.getElementById('StreetAmount') as HTMLInputElement;
const numberOfStreetsLabel = document.getElementById('StreetAmountLabel');
const generateButton = document.getElementById('GenerateButton');
const streetGridRef: any = {};

function rangeLabelUpdate (value: string, label: HTMLElement) {
  label.innerText = value;
}

gridSizeRange.oninput = (event: any) => {
  rangeLabelUpdate(event.target.value, gridSizeLabel);
};

numberOfStreetsRange.oninput = (event: any) => {
  rangeLabelUpdate(event.target.value, numberOfStreetsLabel);
};

generateButton.onclick = () => generateGrid(parseInt(gridSizeRange.value, 10),
  parseInt(numberOfStreetsRange.value, 10));

function generateGrid (gridSize: number, numberOfStreets: number) {
  domGrid.innerHTML = '';
  const streetArray: Street[] = StreetGenerator.generateStreets(numberOfStreets);
  const townMap = StreetGridGenerator.createGrid(gridSize, [ ...streetArray ]);
  streetArray.forEach(street => {
    streetGridRef[ street.configuration.name ] = [];
  });
  townMap.grid.forEach((row, index) => {
    const gridRow: HTMLElement = document.createElement('p');
    gridRow.setAttribute('class', 'gridRow');
    const gridNodeContainer: HTMLElement = document.createElement('span');
    row.forEach(column => {
      const gridNode: HTMLElement = document.createElement('span');
      if (column) {
        gridNode.innerText = String.fromCharCode(0x2593);
        streetGridRef[ column.configuration.name ].push(gridNode);
        gridNode.onmouseover = () => streetHighlight(column.configuration.name, true);
        gridNode.onmouseleave = () => streetHighlight(column.configuration.name, false);
      } else {
        gridNode.innerText = String.fromCharCode(0x2591);
      }
      gridNodeContainer.appendChild(gridNode);
    });
    gridRow.appendChild(gridNodeContainer);
    domGrid.appendChild(gridRow);
  });
}

const streetHighlight = (streetName: string, active: boolean) => {
  streetGridRef[ streetName ].forEach((node: HTMLElement) => {
    node.style.color = active ? 'red' : 'black';
  });
  if (active) {
    domSelectedStreet.innerText = streetName;
  } else {
    domSelectedStreet.innerText = '';
  }
};

generateGrid(20, 30);
gridSizeRange.value = '20';
numberOfStreetsRange.value = '30';
gridSizeLabel.innerText = gridSizeRange.value;
numberOfStreetsLabel.innerText = numberOfStreetsRange.value;
