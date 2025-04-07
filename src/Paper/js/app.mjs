import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5000/products/papers';

let paper = [];
let updatePaperId = 0;


const table = document.querySelector('#paper-table tbody');


const papertype = document.querySelector('#papierart');
const brand = document.querySelector('#marke');
const priceEk = document.querySelector('#ek');
const priceVk = document.querySelector('#vk');
const inStorage = document.querySelector('#lagerbestand');
const formatL = document.querySelector('#length');
const formatB = document.querySelector('#width');
const grammatur = document.querySelector('#grammatur');
const volume = document.querySelector('#volumen');
const preis = document.querySelector('#preis');
const amountPerKg = document.querySelector('#preisProKg');
const bogenpreis = document.querySelector('#bogenpreis');
const stapelhöhe = document.querySelector('#stapelhöhe');
const bogen = document.querySelector('#bogen');



const inputs = document.querySelectorAll('input');



const userMessage = document.querySelector("#userMessage")

const updateButton = document.querySelector("#button-update");
const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');




function initializeTable(paperJson) {
    paper = [];
    table.innerHTML = '';
    paperJson.forEach(item => {
        paper.push(item);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.brand}</td>
        <td>${item.grammatur}</td>
        <td>${item.formatLength} X ${item.formatWidth}</td>
        <td>${item.Volume}</td>
        `;
        row.setAttribute('data-id', item.id);
        row.addEventListener('click', (e) => {
            const paper = paper.find(item => item.id === parseInt(e.currentTarget.getAttribute('data-id')));

            updatePaperId = parseInt(e.currentTarget.getAttribute('data-id'));
            papertype.value = paper.name;
            brand.value = paper.brand;
            priceEk.value = paper.buyPrice;
            priceVk.value = paper.sellPrice;
            inStorage.value = paper.amount;
            formatL.value = paper.formatLength;
            formatB.value = paper.formatWidth;
            grammatur.value = paper.grammatur;
            volume.value = paper.volume;
            preis.value = paper.pricePerKg;
            amountPerKg.value = paper.kg;
            bogenpreis.value = paper.calcPricePerKg;
            stapelhöhe.value = paper.stapelHöheMM;
            bogen.value = paper.bogen;

            clearbutton.disabled = false
        });

        table.appendChild(row);
    });
}




/*------------------------------------------ADD-BUTTON---------------------------------------------------*/




async function addRow() 
{
  const newPaper = 
  {
    Name: papertype.value,
    Brand: brand.value,
    BuyPrice: priceEk.value,
    SellPrice: priceVk.value,
    Amount: inStorage .value,
    FormatLength: formatL.value,
    FormatWidth: formatB.value,
    Grammatur: grammatur.value,
    Volume: volume.value,
    PricePerKg: preis.value,
    Kg: amountPerKg.value,
    CalcPricePerKg: bogenpreis.value,
    StapelHöheMM: stapelhöhe.value,
    Bogen: bogen.value,
  };

  console.log(JSON.stringify(newPaper));
  
  addbutton.disabled = true;
  try 
  {
    console.log('sending request');
    const response = await fetch(path, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(newPaper),
    });

    const data = await response.json();
    console.log('got request: ', data);

    if (!response.ok) 
    {
        throw new Error(`Fehler beim Hinzufügen: ${response.status}`);
    }

    paperJson = await Helpers.fetchTable(path);
    initializeTable(paperJson); 
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
    const newCustomer = 
    {
        PersonName: personName.value,
        CompanyName: companyName.value,
        MailAdress: mailAdress.value,
        PhoneNumber: phoneNumber.value,
        City: city.value,
        Street: street.value,
        ZipCode: zipCode.value,
        Country: country.value,
        Discount: discount.value,
    };
    console.log(JSON.stringify(newCustomer));


    try 
    {
      const response = await fetch(`${path}/${updatePaperId}`, 
      {
          method: "PUT",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(newCustomer), // Daten an Server senden
      });
  
      if (!response.ok) 
      {
          throw new Error(`Response beim PUT-Request fehlerhaft: ${response.status}`);
      }
  
      paperJson = await Helpers.fetchTable(path);
      initializeTable(paperJson); 
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
    updatePaperId = 0;
})










function checkFields() 
{
    try {
        bogenpreis.value = (preis.value / amountPerKg.value) * 
                           ((((((formatL.value / 10) * (formatB.value / 10)) * 
                           grammatur.value) / 10000) * 1000) / 1000);
        bogen.value = stapelhöhe.value / ((grammatur.value / 1000) * volume.value);
    } catch (e) {
        
    }

    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    const anyFilled = Array.from(inputs).some(input => input.value.trim() !== "" || !input.value);

    addbutton.disabled = !allFilled || !(updatePaperId === 0);
    updateButton.disabled = !anyFilled || updatePaperId === 0;
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
    updatePaperId = 0;
});


addbutton.addEventListener('click', async () => {
    addRow();
});





//Main
let paperJson = await Helpers.fetchTable(path);
initializeTable(paperJson);