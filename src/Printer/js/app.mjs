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
            border.value = printer.unbedruckbarerRand;
        });
        table.appendChild(row);
    });
}

//Main
let printerJson = await Helpers.fetchTable(path);
initializeTable(printerJson);

// code vom Italienischen Kollegen

const inputs = document.querySelectorAll('input[type="text"]');

const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');

const apiUrl = "http://localhost:5192/Printer"; 

function checkFields() 
{
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    const anyFilled = Array.from(inputs).some(input => input.value.trim() !== "");

    addbutton.disabled = !allFilled;
    clearbutton.disabled = !anyFilled;
}

document.querySelectorAll('input[type="text"]').forEach(input => 
{
    input.addEventListener('input', checkFields);  // Jedes Mal, wenn ein Eingabewert geändert wird
});



document.addEventListener('DOMContentLoaded', checkFields);

clearbutton.addEventListener('click', () => {
    Array.from(inputs).some(input => input.value = "");
});



addbutton.addEventListener('click', async () => {
    const description = document.getElementById("description").value.trim();
    const margin = document.getElementById("margin").value.trim();
    const name = document.getElementById("name").value.trim();
    const klick_4c_ek = document.getElementById("klick-4c-ek").value.trim();
    const klick_1c_ek = document.getElementById("klick-1c-ek").value.trim();
    const klick_4c_vk = document.getElementById("klick-4c-vk").value.trim();
    const klick_1c_vk = document.getElementById("klick-1c-vk").value.trim();


    const newPrinter = {
        Description: description,
        Margin: parseInt(margin),
        Name: name,
        Klick_4c_ek: parseInt(klick_4c_ek),
        Klick_1c_ek: parseInt(klick_1c_ek),
        Klick_4c_vk: parseInt(klick_4c_vk),
        Klick_1c_vk: parseInt(klick_1c_vk)
    };

    try 
    {
        const response = await fetch(apiUrl, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(newPrinter)
        });
            
        alert("Drucker erfolgreich hinzugefügt!");
        //populateTable(); // Tabelle aktualisieren

    } 
    catch (error) 
    {
        alert("Drucker konnte nicht hinzugefügt werden!");
        console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
    }

    Array.from(inputs).some(input => input.value = "");
});