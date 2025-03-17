import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5000/products/printers';

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

const inputs = document.querySelectorAll('input');



const userMessage = document.querySelector("#userMessage")

const updateButton = document.querySelector("#button-update");
const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');




function initializeTable(printerJson) {
    table.innerHTML = '';
    printers = [];
    printerJson.forEach(item => {
        if (item.inactive == 0) {
            printers.push(item);
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.formatWidth}</td>
            <td>${item.formatLength}</td>
            `;
            row.setAttribute('data-id', item.id);
            row.addEventListener('click', (e) => {
                const printer = printers.find(item => item.id === parseInt(e.currentTarget.getAttribute('data-id')));
                updatePrinterId = parseInt(e.currentTarget.getAttribute('data-id'));
                name.value = printer.name;
                formatL.value = printer.formatLength;
                formatB.value = printer.formatWidth;
                border.value = printer.unprintedEdgeMM;
                description.value = printer.formatName;
                click4cEK.value = printer.buyPrinceFor4cKlick;
                click1cEK.value = printer.buyPrinceFor1cKlick;
                click4cVK.value = printer.sellPriceFor4cKlick;
                click1cVK.value = printer.sellPriceFor1cKlick;
                clearbutton.disabled = false;
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
    FormatName: description.value,
    UnprintedEdgeMM: parseInt(border.value),
    Name: name.value,
    BuyPrinceFor4cKlick: click4cEK.value,
    BuyPrinceFor1cKlick: click1cEK.value,
    SellPriceFor4cKlick: click4cVK.value,
    SellPriceFor1cKlick: click1cVK.value,
    FormatLength: parseInt(formatL.value),
    FormatWidth: parseInt(formatB.value),
    Inactive: 0,
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
        FormatName: description.value,
        UnprintedEdgeMM: parseInt(border.value),
        Name: name.value,
        BuyPrinceFor4cKlick: click4cEK.value,
        BuyPrinceFor1cKlick: click1cEK.value,
        SellPriceFor4cKlick: click4cVK.value,
        SellPriceFor1cKlick: click1cVK.value,
        FormatLength: parseInt(formatL.value),
        FormatWidth: parseInt(formatB.value),
        Inactive: 0,
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



/*-----------------------------------------Inactive-BUTTON---------------------------------------------------*/



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
                let printer = printers.find(x => x.id == selectedPrinterId);
                printer.inaktiv = 1;
                const response = await fetch(`${path}/changeInactive/${selectedPrinterId}`, {
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
    updatePrinterId = 0;
});


addbutton.addEventListener('click', async () => {
    addRow();
});



//Main
let printerJson = await Helpers.fetchTable(path);
initializeTable(printerJson);