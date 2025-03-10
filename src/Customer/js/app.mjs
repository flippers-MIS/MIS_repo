import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5192/Printer';

const printers = [];
let updatePrinterId = 0;


const table = document.querySelector('#printer-list tbody');


const personName = document.querySelector('#name');
const companyName = document.querySelector('#name2');
const street = document.querySelector('#street');
const zipCode = document.querySelector('#zip');
const city = document.querySelector('#city');
const country = document.querySelector('#country');
const phoneNumber = document.querySelector('#mobile');
const mailAdress = document.querySelector('#mail');
const discount = document.querySelector('#discount');
const payment = document.querySelector('#payment_terms');

const inputs = document.querySelectorAll('input');



const userMessage = document.querySelector("#userMessage")

const updateButton = document.querySelector("#button-update");
const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');




function initializeTable(printerJson) {
    table.innerHTML = '';
    printerJson.forEach(item => {
        if (item.inaktiv == 0) {
            printers.push(item);
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${item.name}</td>
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
    Inaktiv: inactive.checked ? 1 : 0,
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
        Inaktiv: inactive.checked ? 1 : 0,
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
})










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
    inactive.checked = false
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