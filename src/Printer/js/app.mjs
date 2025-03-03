import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:32771/Printer';

const printers = [];
let updatePrinterId = 0;

const table = document.querySelector('#printer-list tbody');
const name = document.querySelector('#name');
const formatL = document.querySelector('#length');
const formatB = document.querySelector('#width');
const border = document.querySelector('#margin');
const inactive = document.querySelector('#inactive')

const updateButton = document.querySelector("#button-update");



function initializeTable(printerJson) {
    printerJson.forEach(item => {
        if (item.inaktiv == 0) {
            printers.push(item);
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.maschinenName}</td>
            <td>${item.maschinenFormatL}</td>
            <td>${item.maschinenFormatB}</td>
            `;
            row.setAttribute('data-id', item.printerId);
            row.addEventListener('click', (e) => {
                const printer = printers.find(item => item.printerId === parseInt(e.currentTarget.getAttribute('data-id')));
                updatePrinterId = parseInt(e.currentTarget.getAttribute('data-id'));
                name.value = printer.maschinenName;
                formatL.value = printer.maschinenFormatL;
                formatB.value = printer.maschinenFormatB;
                border.value = printer.unbedruckbarerRand;
            });
            table.appendChild(row);
        }
    });
}

async function addRow() {
  const newPrinter = {
      PrinterId: parseInt(printers.length),
      MaschinenName: name.value,
      MaschinenFormatL: parseInt(formatL.value),
      MaschinenFormatB: parseInt(formatB.value),
      FarbFormat: '0',
      UnbedruckbarerRand: parseInt(border.value),
      inactiv: inactive ? 0 : 1,
  };
  console.log(JSON.stringify(newPrinter));
  try 
  {
    const response = await fetch(apiUrl, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(newPrinter), // Daten an Server senden
    });

    if (!response.ok) 
    {
        throw new Error(`Fehler beim Hinzufügen: ${response.status}`);
    }

    alert("Drucker erfolgreich hinzugefügt!");
    location.reload(); // Tabelle aktualisieren

  } 
  catch (error) 
  {
    console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
  }

  // Eingabefelder leeren
  Array.from(inputs).some(input => input.value = "");
}

// document.addEventListener("DOMContentLoaded", () => {
//     const table = document.querySelector("#printer-list tbody");
//     const contextMenu = document.createElement("div");
//     contextMenu.classList.add("context-menu");
//     contextMenu.innerHTML = '<button id="context-delete">Inaktiv stellen</button>';
//     document.body.appendChild(contextMenu);

//     let selectedPrinterId = null;

//     table.addEventListener("contextmenu", (event) => {
//         event.preventDefault();
//         const row = event.target.closest("tr");
//         if (!row) return;

//         selectedPrinterId = row.getAttribute("data-id");
//         contextMenu.style.top = `${event.pageY}px`;
//         contextMenu.style.left = `${event.pageX}px`;
//         contextMenu.style.display = "block";
//     });

//     document.addEventListener("click", () => {
//         contextMenu.style.display = "none";
//     });

//     document.getElementById("context-delete").addEventListener("click", async () => {
//         if (selectedPrinterId) {
//             try {
//                 const response = await fetch(`${apiUrl}/${selectedPrinterId}`, {
//                     method: "DELETE",
//                 });

//                 if (!response.ok) {
//                     throw new Error(`Fehler beim Löschen: ${response.status}`);
//                 }

//                 alert("Drucker erfolgreich gelöscht!");
//                 location.reload();
//             } catch (error) {
//                 console.error("Fehler beim Löschen des Druckers: ", error);
//             }
//         }
//     });
// });

updateButton.addEventListener('click', putPrinter)
    
async function putPrinter() {
    const newPrinter = {
        PrinterId: updatePrinterId,
        MaschinenName: name.value,
        MaschinenFormatL: parseInt(formatL.value),
        MaschinenFormatB: parseInt(formatB.value),
        FarbFormat: '0',
        UnbedruckbarerRand: parseInt(border.value),
    };
    console.log(JSON.stringify(newPrinter));
    try 
    {
      const response = await fetch(`${path}/${updatePrinterId}`, 
      {
          method: "PUT",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(newPrinter), // Daten an Server senden
      });
  
      if (!response.ok) 
      {
          throw new Error(`Fehler beim Hinzufügen: ${response.status}`);
      }
  
      alert("Drucker erfolgreich hinzugefügt!");
      location.reload(); // Tabelle aktualisieren
  
    } 
    catch (error) 
    {
      console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
    }
  
    // Eingabefelder leeren
    Array.from(inputs).some(input => input.value = "");
}

//Main
let printerJson = await Helpers.fetchTable(path);
initializeTable(printerJson);

// code vom Italienischen Kollegen

const inputs = document.querySelectorAll('input[type="text"]');

const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');

function checkFields() 
{
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    const anyFilled = Array.from(inputs).some(input => input.value.trim() !== "");

    addbutton.disabled = !allFilled;
    updateButton.disabled = !anyFilled || updatePrinterId === 0;
    clearbutton.disabled = !anyFilled;
}

document.querySelectorAll('input[type="text"]').forEach(input => 
{
    input.addEventListener('input', checkFields);  // Jedes Mal, wenn ein Eingabewert geändert wird
});



document.addEventListener('DOMContentLoaded', checkFields);

clearbutton.addEventListener('click', () => {
    Array.from(inputs).some(input => input.value = "");
    clearbutton.disabled = true;
    addbutton.disabled = true;
    updateButton = true;
});



addbutton.addEventListener('click', async () => {
    addRow();
    // const description = document.getElementById("description").value.trim();
    // const margin = document.getElementById("margin").value.trim();
    // const name = document.getElementById("name").value.trim();
    // const klick_4c_ek = document.getElementById("klick-4c-ek").value.trim();
    // const klick_1c_ek = document.getElementById("klick-1c-ek").value.trim();
    // const klick_4c_vk = document.getElementById("klick-4c-vk").value.trim();
    // const klick_1c_vk = document.getElementById("klick-1c-vk").value.trim();


    // const newPrinter = {
    //     Description: description,
    //     Margin: parseInt(margin),
    //     Name: name,
    //     Klick_4c_ek: parseInt(klick_4c_ek),
    //     Klick_1c_ek: parseInt(klick_1c_ek),
    //     Klick_4c_vk: parseInt(klick_4c_vk),
    //     Klick_1c_vk: parseInt(klick_1c_vk)
    // };

    // try 
    // {
    //     const response = await fetch(apiUrl, 
    //     {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json", },
    //         body: JSON.stringify(newPrinter)
    //     });
            
    //     alert("Drucker erfolgreich hinzugefügt!");
    //     //populateTable(); // Tabelle aktualisieren

    // } 
    // catch (error) 
    // {
    //     alert("Drucker konnte nicht hinzugefügt werden!");
    //     console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
    // }

    // Array.from(inputs).some(input => input.value = "");
});