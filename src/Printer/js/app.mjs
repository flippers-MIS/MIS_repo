import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:32772/Printer';

const printers = [];
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

const inputs = document.querySelectorAll('input[type="text"]');



const userMessage = document.querySelector("#userMessage")

const updateButton = document.querySelector("#button-update");
const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');




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




/*------------------------------------------ADD-BUTTON---------------------------------------------------*/




async function addRow() 
{
    const printer = [];
  const newPrinter = 
  {
      Bezeichnung: description.value,
      Rand: parseInt(border.value),
      Name: name.value,
      EK4c: click4cEK.value,
      EK1c: click1cEK.value,
      VK4c: click4cVK.value,
      VK1c: click1cVK.value,
      DruckformatL: parseInt(formatL.value),
      DruckformatB: parseInt(formatB.value),
      Inaktiv: inactive ? 1 : 0,
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

    printer.push(data);
    initializeTable(printer); 
    userMessage.textContent = "Drucker wurde erfolgreich hinzugefügt";
    userMessage.style.color = "green";
  } 
  catch (error) 
  {
    console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
  }
  Array.from(inputs).some(input => input.value = "");
}





/*------------------------------------------UPDATE-BUTTON---------------------------------------------------*/




updateButton.addEventListener('click', async () => {
    const newPrinter = 
    {
        PrinterId: updatePrinterId,
        MaschinenName: name.value,
        UnbedruckbarerRand: parseInt(border.value),
        // Klick4cEk:const click4cEK.value
        // Klick1cEk:const click1cEK.value
        // Klick4cVk: click4cVK.value
        // Klick1cVk: click1cVK.value
        MaschinenFormatL: parseInt(formatL.value),
        MaschinenFormatB: parseInt(formatB.value),
        FarbFormat: '0',
        UnbedruckbarerRand: parseInt(border.value),
        inaktiv: inactive ? 1 : 0,
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
  
      alert("Drucker erfolgreich hinzugefügt!");
      location.reload();
  
    } 
    catch (error) 
    {
      console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
    }
  
    Array.from(inputs).some(input => input.value = "");
}










function checkFields() 
{
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    const anyFilled = Array.from(inputs).some(input => input.value.trim() !== "" || !input.value);

    addbutton.disabled = !allFilled;
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
    updateButton = true;
});


addbutton.addEventListener('click', async () => {
    addRow();
});



//Main
let printerJson = await Helpers.fetchTable(path);
initializeTable(printerJson);