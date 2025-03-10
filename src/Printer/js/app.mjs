import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5192/Printer';

let printers = [];
let updatePrinterId = 0;


const table = document.querySelector('#printer-list tbody');


const description = document.querySelector('#description');
const border = document.querySelector('#margin');
const name = document.querySelector('#name');
const click4cEK = document.querySelector('#klick-4c-ek');
const click1cEK = document.querySelector('#klick-1c-ek');
const click4cVK = document.querySelector('#klick-4c-vk');
const click1cVK = document.querySelector('#klick-1c-vk');
const formatL = document.querySelector('#length');
const formatB = document.querySelector('#width');
const inactive = document.querySelector('#inactive');

const inputs = document.querySelectorAll('input');



const userMessage = document.querySelector("#userMessage")

const updateButton = document.querySelector("#button-update");
const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');




function initializeTable(printerJson) {
    table.innerHTML = '';
    printers = [];
    printerJson.forEach(item => {
        if (item.inaktiv == 0) {
            printers.push(item);
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.bezeichnung}</td>
            <td>${item.druckformatL}</td>
            <td>${item.druckformatB}</td>
            `;
            row.setAttribute('data-id', item.id);
            row.addEventListener('click', (e) => {
                const printer = printers.find(item => item.id === parseInt(e.currentTarget.getAttribute('data-id')));
                updatePrinterId = parseInt(e.currentTarget.getAttribute('data-id'));
                name.value = printer.name;
                formatL.value = printer.druckformatL;
                formatB.value = printer.druckformatB;
                border.value = printer.rand;
                description.value = printer.bezeichnung;
                click4cEK.value = printer.eK4c;
                click1cEK.value = printer.eK1c;
                click4cVK.value = printer.vK4c;
                click1cVK.value = printer.vK1c;
            });
            table.appendChild(row);
        }
    });
}




/*------------------------------------------ADD-BUTTON---------------------------------------------------*/




async function addRow() 
{
  const newPrinter = 
  {
    Id: printers.length + 1,
    Bezeichnung: description.value,
    Rand: parseInt(border.value),
    Name: name.value,
    EK4c: click4cEK.value,
    EK1c: click1cEK.value,
    VK4c: click4cVK.value,
    VK1c: click1cVK.value,
    DruckformatL: parseInt(formatL.value),
    DruckformatB: parseInt(formatB.value),
    Inaktiv: 0,
  };
  console.log(JSON.stringify(newPrinter));
  addbutton.disabled = true;
  try 
  {
    console.log('sending request');
    const response = await fetch(path, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(newPrinter),
    });

    const data = await response.json();
    console.log('got request: ', data);

    if (!response.ok) 
    {
        throw new Error(`Fehler beim Hinzufügen: ${response.status}`);
    }

    printerJson = await Helpers.fetchTable(path);
    initializeTable(printerJson); 
    userMessage.textContent = "Drucker wurde erfolgreich hinzugefügt";
    userMessage.style.color = "green";
  } 
  catch (error) 
  {
    console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
  }
  Array.from(inputs).some(input => input.value = "");
  clearbutton.disabled = true;
}





/*------------------------------------------UPDATE-BUTTON---------------------------------------------------*/




updateButton.addEventListener('click', async () => {
    const newPrinter = 
    {
        Id: updatePrinterId,
        Bezeichnung: description.value,
        Rand: parseInt(border.value),
        Name: name.value,
        EK4c: click4cEK.value,
        EK1c: click1cEK.value,
        VK4c: click4cVK.value,
        VK1c: click1cVK.value,
        DruckformatL: parseInt(formatL.value),
        DruckformatB: parseInt(formatB.value),
        Inaktiv: 0,
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
          throw new Error(`Response beim PUT-Request fehlerhaft: ${response.status}`);
      }
  
      printerJson = await Helpers.fetchTable(path);
      initializeTable(printerJson); 
      userMessage.textContent = "Drucker wurde erfolgreich geupdated";
      userMessage.style.color = "green";  
    } 
    catch (error) 
    {
      console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
    }
  
    Array.from(inputs).some(input => input.value = "");
    clearbutton.disabled = true;
    updateButton.disabled = true;
    updatePrinterId = 0;
})


document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("#printer-list tbody");
    const contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");
    contextMenu.innerHTML = '<button id="context-delete">Inaktiv stellen</button>';
    document.body.appendChild(contextMenu);

    let selectedPrinterId = null;

    table.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const row = event.target.closest("tr");
        if (!row) return;

        selectedPrinterId = row.getAttribute("data-id");
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.display = "block";
    });

    document.addEventListener("click", () => {
        contextMenu.style.display = "none";
    });

    document.getElementById("context-delete").addEventListener("click", async () => {
        if (selectedPrinterId) {
            try {
                let printer = printers[selectedPrinterId - 1];
                printer.inaktiv = 1;
                const response = await fetch(`${path}/${selectedPrinterId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify(printer),
                });

                if (!response.ok) {
                    throw new Error(`Fehler beim Löschen: ${response.status}`);
                }

                printerJson = await Helpers.fetchTable(path);
                initializeTable(printerJson); 
                userMessage.textContent = "Drucker wurde erfolgreich auf inaktiv gestellt";
                userMessage.style.color = "green"; 
            } catch (error) {
                console.error("Fehler beim Löschen des Druckers: ", error);
            }
        }
    });
});







function checkFields() 
{
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    const anyFilled = Array.from(inputs).some(input => input.value.trim() !== "" || !input.value);

    addbutton.disabled = !allFilled || !(updatePrinterId === 0);
    updateButton.disabled = !anyFilled || updatePrinterId === 0;
    clearbutton.disabled = !anyFilled;
}

document.querySelectorAll('input').forEach(input => 

{
    input.addEventListener('input', checkFields);  // Jedes Mal, wenn ein Eingabewert geändert wird
});


/*------------------------------------------RESET-BUTTON---------------------------------------------------*/

clearbutton.addEventListener('click', () => {
    Array.from(inputs).some(input => input.value = "");
    clearbutton.disabled = true;
    addbutton.disabled = true;
    updateButton.disabled = true;
});


addbutton.addEventListener('click', async () => {
    addRow();
});



//Main
let printerJson = await Helpers.fetchTable(path);
initializeTable(printerJson);