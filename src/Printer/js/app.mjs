import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5192/Printer';

const printers = [];

const table = document.querySelector('#printer-list tbody');
const name = document.querySelector('#name');
const formatL = document.querySelector('#length');
const formatB = document.querySelector('#width');
const border = document.querySelector('#margin');



function initializeTable(printerJson) {
    printerJson.forEach(item => {
        printers.push(item);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.maschinenName}</td>
        <td>${item.maschinenFormatL}</td>
        <td>${item.maschinenFormatB}</td>
        `;
        console.log(item);
        row.setAttribute('data-id', item.printerId);
        row.addEventListener('click', (e) => {
            const printer = printers.find(item => item.printerId === parseInt(e.currentTarget.getAttribute('data-id')));
            name.value = printer.maschinenName;
            formatL.value = printer.maschinenFormatL;
            formatB.value = printer.maschinenFormatB;
            console.log(printer.maschinenRand);
            border.value = printer.unbedruckterRand;
        });
        table.appendChild(row);
    });
}

//Main
let printerJson = await Helpers.fetchTable(path);
initializeTable(printerJson);