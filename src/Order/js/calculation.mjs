import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5000';

let customers = [];
let papers = [];
let printers = [];
let usedPapers = [];
let paperRows = [];
let usedPrinter;

let sheets1;
let sheets2;
let sheets3;

let stackHeight = 0;

let paperPrice = 0;
let paperPriceEk = 0;

let paperSchoenPrice = 0;
let paperWiderPrice = 0;

let paperSchoenPriceEk = 0;
let paperWiderPriceEk = 0;

let cuts = 0;

usedPapers.push = (function(originalPush) {
    return function(...args) {
        const result = originalPush.apply(this, args);
        checkFields();
        return result;
    };
})(usedPapers.push);

const table = document.querySelector('#customer-table tbody');
const tablePaperPopup = document.querySelector('#paper-table-popup tbody');
const paperTable = document.querySelector('#paperTable tbody');


const CustomerNr = document.querySelector('#kundennr');
const CustomerName = document.querySelector('#name');
const CustomerName2 = document.querySelector('#name2');
const CustomerPaymentTerms = document.querySelector('#zahlung');
const Street = document.querySelector('#strasse')
const ZIP = document.querySelector('#plz');
const City = document.querySelector('#ort');
const Country = document.querySelector('#land');

const formatL = document.querySelector('#formatL');
const formatB = document.querySelector('#formatB');
const endFormat = document.querySelector('#endFormat');
const binding = document.querySelector('#bindung');
const gap = document.querySelector('#zwischenschnitt');
const nutzen = document.querySelector('#nutzen');
const nutzenM = document.querySelector('#nutzenM');

const trimming = document.querySelector('#endbeschnitt');
const shippingCost = document.querySelector('#versandkosten');

const batch1 = document.querySelector('#batch1');
const batch2 = document.querySelector('#batch2');
const batch3 = document.querySelector('#batch3');

const print1a = document.querySelector('#print1a');
const print1b = document.querySelector('#print1b');
const material1a = document.querySelector('#material1a');
const material1b = document.querySelector('#material1b');
const rk1 = document.querySelector('#rk1');
const finish1 = document.querySelector('#finish1');
const cut1 = document.querySelector('#cut1');
const manuell1 = document.querySelector('#manuell1');
const sum1a = document.querySelector('#sum1a');
const sum1b = document.querySelector('#sum1b');
const factor1 = document.querySelector('#factor1');
const priceManuell1 = document.querySelector('#priceManuell1');
const price1 = document.querySelector('#price1');
const singlePrice1 = document.querySelector('#singlePrice1');

const print2a = document.querySelector('#print2a');
const print2b = document.querySelector('#print2b');
const material2a = document.querySelector('#material2a');
const material2b = document.querySelector('#material2b');
const rk2 = document.querySelector('#rk2');
const finish2 = document.querySelector('#finish2');
const cut2 = document.querySelector('#cut2');
const manuell2 = document.querySelector('#manuell2');
const sum2a = document.querySelector('#sum2a');
const sum2b = document.querySelector('#sum2b');
const factor2 = document.querySelector('#factor2');
const priceManuell2 = document.querySelector('#priceManuell2');
const price2 = document.querySelector('#price2');
const singlePrice2 = document.querySelector('#singlePrice2');

const print3a = document.querySelector('#print3a');
const print3b = document.querySelector('#print3b');
const material3a = document.querySelector('#material3a');
const material3b = document.querySelector('#material3b');
const rk3 = document.querySelector('#rk3');
const finish3 = document.querySelector('#finish3');
const cut3 = document.querySelector('#cut3');
const manuell3 = document.querySelector('#manuell3');
const sum3a = document.querySelector('#sum3a');
const sum3b = document.querySelector('#sum3b');
const factor3 = document.querySelector('#factor3');
const priceManuell3 = document.querySelector('#priceManuell3');
const price3 = document.querySelector('#price3');
const singlePrice3 = document.querySelector('#singlePrice3');

const discount = document.querySelector('#discount');

const btnCustomer = document.querySelector('#btnCustomer')
const btnPaper = document.querySelector('#btnPaper')
const popup = document.getElementById('popup');
const popupPaper = document.getElementById('popupPaper');
const closePopup = document.getElementById('closePopup');
const closePaper = document.getElementById('closePaper');

const inputs = document.querySelectorAll('input');



const userMessage = document.querySelector("#userMessage")

const updateButton = document.querySelector("#button-update");
const addbutton = document.getElementById('button-add');
const clearbutton = document.getElementById('button-clear');


function initializeTable(customerJson, paperJson, printerJson) {
    customers = [];
    table.innerHTML = '';
    customerJson.forEach(item => {
        customers.push(item);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.personName}</td>
        <td>${item.zipCode}</td>
        <td>${item.city}</td>
        `;
        row.setAttribute('data-id', item.id);
        row.addEventListener('click', (e) => {
            const customer = customers.find(item => item.id === parseInt(e.currentTarget.getAttribute('data-id')));

            CustomerNr.value = customer.id;
            CustomerName.value = customer.personName;
            CustomerName2.value = customer.companyName;
            CustomerPaymentTerms.value = customer.paymentTerms;
            Street.value = customer.street;
            ZIP.value = customer.zipCode;
            City.value = customer.city;
            Country.value = customer.country;

            popup.style.display = 'none';

            clearbutton.disabled = false
        });

        table.appendChild(row);
    });

    let index = 1;

    papers = [];
    tablePaperPopup.innerHTML = '';
    paperJson.forEach((item) => {
        papers.push(item);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.grammatur}</td>
        <td>${item.formatLength} X ${item.formatWidth}</td>
        <td>${item.brand}</td>
        `;
        row.setAttribute('data-id', item.id);
        row.addEventListener('click', (e) => {
            const paper = papers.find(item => item.id === parseInt(e.currentTarget.getAttribute('data-id')));

            if (usedPapers.length !== 4) {
                const rowPaper = document.createElement('tr');
                rowPaper.setAttribute('data-id', index);
                index++;
                rowPaper.innerHTML = `
                <td><input type="number" style="width: 20px;" onChange="calculatePaper();"></td>
                <td>
                    <select>
                        <option value=0>0</option>
                        <option value=1>1</option>
                        <option value=4>4</option>
                    </select>
                     / 
                    <select>
                        <option value=0>0</option>
                        <option value=1>1</option>
                        <option value=4>4</option>
                    </select>
                </td>
                <td><input type="text"></td>
                <td>${paper.grammatur}  ${paper.name}</td>
                <td>${paper.brand}</td>
                <td>${paper.formatLength} X ${paper.formatWidth}</td>
                <td>${paper.sellPrice}</td>
                `;

                const combobox = document.createElement('select');

                printerJson.forEach((printer, i) => {
                    printers.push(printer);
                    const option = document.createElement('option');
                    if (i === 1) option.selected = true;
                    option.value = i;
                    option.innerHTML = printer.name;
                    combobox.appendChild(option);
                });

                const td = document.createElement('td');

                combobox.style.width = "100px";

                combobox.addEventListener('change', checkFields);

                td.appendChild(combobox);
                rowPaper.appendChild(td);
                paperRows.push(rowPaper);
                paperTable.appendChild(rowPaper);

                popupPaper.style.display = 'none';

                usedPapers.push(paper);

                paperEventListeners();
            } else {
                console.log("Maximale Anzahl an Papierarten erreicht");
            }

            popupPaper.style.display = 'none';

            clearbutton.disabled = false
        });

        tablePaperPopup.appendChild(row);
    });
}

function paperEventListeners() 
{
    paperRows[0].children[0].children[0].addEventListener('input', checkFields);
    paperRows[0].children[1].children[0].addEventListener('change', checkFields);
    paperRows[0].children[1].children[1].addEventListener('change', checkFields);
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





function calculatePaper() 
{
    const pages = paperRows[0].children[0].children[0].value;
    if (pages !== "") {
        const schoen = parseInt(paperRows[0].children[1].children[0].value);
        const wider = parseInt(paperRows[0].children[1].children[1].value);
    
        if (schoen !== 0 && wider !== 0) {
            paperPrice = ((usedPapers[0].sellPrice / 1000) / 2) * parseInt(pages);
            paperPriceEk = ((usedPapers[0].buyPrice / 1000) / 2) * parseInt(pages);
        } else {
            paperPrice = (usedPapers[0].sellPrice / 1000) * parseInt(pages);
            paperPriceEk = (usedPapers[0].buyPrice / 1000) * parseInt(pages);
        }

        if (schoen !== 0 && wider !== 0) {
            stackHeight = (((usedPapers[0].grammatur / 1000) * usedPapers[0].volume) * parseInt(pages)) / 2;
        } else {
            stackHeight = ((usedPapers[0].grammatur / 1000) * usedPapers[0].volume) * parseInt(pages);
        }

        if (schoen === 0) paperSchoenPrice = 0;
        else if (schoen === 1 && wider === 0) paperSchoenPrice = usedPrinter.sellPriceFor1cKlick * parseInt(pages);
        else if (schoen === 4 && wider === 0) paperSchoenPrice = usedPrinter.sellPriceFor4cKlick * parseInt(pages);
        else if (schoen === 1 && wider > 0) paperSchoenPrice = (usedPrinter.sellPriceFor1cKlick * parseInt(pages)) / 2;
        else if (schoen === 4 && wider > 0) paperSchoenPrice = (usedPrinter.sellPriceFor4cKlick * parseInt(pages)) / 2;

        if (wider === 0) paperWiderPrice = 0;
        else if (wider === 1 && schoen === 0) paperWiderPrice = usedPrinter.sellPriceFor1cKlick * parseInt(pages);
        else if (wider === 4 && schoen === 0) paperWiderPrice = usedPrinter.sellPriceFor4cKlick * parseInt(pages);
        else if (wider === 1 && schoen > 0) paperWiderPrice = (usedPrinter.sellPriceFor1cKlick * parseInt(pages)) / 2;
        else if (wider === 4 && schoen > 0) paperWiderPrice = (usedPrinter.sellPriceFor4cKlick * parseInt(pages)) / 2;

        if (schoen === 0) paperSchoenPriceEk = 0;
        else if (schoen === 1 && wider === 0) paperSchoenPriceEk = usedPrinter.buyPrinceFor1cKlick * parseInt(pages);
        else if (schoen === 4 && wider === 0) paperSchoenPriceEk = usedPrinter.buyPrinceFor4cKlick * parseInt(pages);
        else if (schoen === 1 && wider > 0) paperSchoenPriceEk = (usedPrinter.buyPrinceFor1cKlick * parseInt(pages)) / 2;
        else if (schoen === 4 && wider > 0) paperSchoenPriceEk = (usedPrinter.buyPrinceFor4cKlick * parseInt(pages)) / 2;

        if (wider === 0) paperWiderPriceEk = 0;
        else if (wider === 1 && schoen === 0) paperWiderPriceEk = usedPrinter.buyPrinceFor1cKlick * parseInt(pages);
        else if (wider === 4 && schoen === 0) paperWiderPriceEk = usedPrinter.buyPrinceFor4cKlick * parseInt(pages);
        else if (wider === 1 && schoen > 0) paperWiderPriceEk = (usedPrinter.buyPrinceFor1cKlick * parseInt(pages)) / 2;
        else if (wider === 4 && schoen > 0) paperWiderPriceEk = (usedPrinter.buyPrinceFor4cKlick * parseInt(pages)) / 2;
    }
}


trimming.addEventListener('change', checkFields);

function checkFields() 
{
    if (parseInt(binding.value) === 1) endFormat.style.opacity = 0;
    else endFormat.style.opacity = 1;

    if (nutzenM.value !== "") {
        nutzen.value = nutzenM.value;
    } else {
        if (formatL.value > 0 && formatB.value > 0 && gap.value > 0 && usedPapers.length > 0) {
            let printerNumber = parseInt(paperRows[0].children[7].children[0].selectedOptions[0].value);
            usedPrinter = printers[printerNumber];
            let nutzenQuer = Math.floor((usedPapers[0].formatWidth - (printers[printerNumber].unprintedEdgeMM * 2)) / (parseInt(formatB.value) + parseInt(gap.value))) * 
                             Math.floor((usedPapers[0].formatLength - (printers[printerNumber].unprintedEdgeMM * 2)) / (parseInt(formatL.value) + parseInt(gap.value)));
            let nutzenHoch = Math.floor((usedPapers[0].formatLength - (printers[printerNumber].unprintedEdgeMM * 2)) / (parseInt(formatB.value) + parseInt(gap.value))) * 
                             Math.floor((usedPapers[0].formatWidth - (printers[printerNumber].unprintedEdgeMM * 2)) / (parseInt(formatL.value) + parseInt(gap.value)));
            nutzen.value = nutzenQuer > nutzenHoch ? nutzenQuer : nutzenHoch;

            if (nutzenQuer < nutzenHoch) {
                cuts = ((Math.floor(usedPapers[0].formatLength / (parseInt(formatB.value) + parseInt(gap.value)))) * 2) +
                       ((Math.floor(usedPapers[0].formatWidth / (parseInt(formatL.value) + parseInt(gap.value)))) * 2);
            } else {
                cuts = ((Math.floor(usedPapers[0].formatWidth / (parseInt(formatB.value) + parseInt(gap.value)))) * 2) +
                       ((Math.floor(usedPapers[0].formatLength / (parseInt(formatL.value) + parseInt(gap.value)))) * 2);
            }
        }
    }

    if (paperRows.length > 0) calculatePaper();

    if (batch1.value !== "") {
        sheets1 = Math.ceil(parseInt(batch1.value) / parseInt(nutzen.value));
    }
    if (batch2.value !== "") {
        sheets2 = Math.ceil(parseInt(batch2.value) / parseInt(nutzen.value));
    }
    if (batch3.value !== "") {
        sheets3 = Math.ceil(parseInt(batch3.value) / parseInt(nutzen.value));
    }

    let costs1 = printMaterialCosts(batch1, print1a, print1b, material1a, material1b);
    let productionCosts1 = sumCosts(batch1, cut1, costs1[0], costs1[1], sum1a, sum1b);
    endPriceCalc(productionCosts1, factor1, priceManuell1, price1, singlePrice1);

    let costs2 = printMaterialCosts(batch2, print2a, print2b, material2a, material2b);
    let productionCosts2 = sumCosts(batch2, cut2, costs2[0], costs2[1], sum2a, sum2b);
    endPriceCalc(productionCosts2, factor2, priceManuell2, price2, singlePrice2);

    let costs3 = printMaterialCosts(batch3, print3a, print3b, material3a, material3b);
    let productionCosts3 = sumCosts(batch3, cut3, costs3[0], costs3[1], sum3a, sum3b);
    endPriceCalc(productionCosts3, factor3, priceManuell3, price3, singlePrice3);

    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "" || input.id === "storageInput");
    const anyFilled = Array.from(inputs).some(input => input.value.trim() !== "" || !input.value);

    addbutton.disabled = !allFilled;
    updateButton.disabled = !anyFilled;
    clearbutton.disabled = !anyFilled;
}

document.querySelectorAll('input').forEach(input => 
{
    input.addEventListener('input', checkFields);  // Jedes Mal, wenn ein Eingabewert geändert wird
});

binding.addEventListener('change', checkFields);

function printMaterialCosts(batch, printA, printB, materialA, materialB) {
    let printCostsA = (Math.ceil(parseInt(batch.value) / parseInt(nutzen.value)) * (paperSchoenPrice + paperWiderPrice));
    let printCostsB = (Math.ceil(parseInt(batch.value) / parseInt(nutzen.value)) * (paperSchoenPriceEk + paperWiderPriceEk));
    let materialCostsA = (Math.ceil(parseInt(batch.value) / parseInt(nutzen.value)) * paperPrice);
    let materialCostsB = (Math.ceil(parseInt(batch.value) / parseInt(nutzen.value)) * paperPriceEk);

    printA.innerHTML = printCostsA.toFixed(2);
    printB.innerHTML = printCostsB.toFixed(2);
    materialA.innerHTML = materialCostsA.toFixed(2);
    materialB.innerHTML = materialCostsB.toFixed(2);

    return [printCostsA + materialCostsA, printCostsB + materialCostsB];
}

function sumCosts(batch, cut, costsA, costsB, sumA, sumB) {
    let cutWorkPrice = 60;
    let cutingCosts;

    let cutStackHeigth = stackHeight * Math.ceil(parseInt(batch.value) / parseInt(nutzen.value));
    if (trimming.value === 'ja') {
        cutingCosts = Math.ceil((((Math.ceil(cutStackHeigth / 70) * cuts) * 17) * ((cutWorkPrice / 60) /60)) + 2);
    } else {
        cutingCosts = 0;
    }
    cut.innerHTML = cutingCosts;

    let productionCostsA = costsA + parseFloat(cut.innerHTML);
    let productionCostsB = costsB;

    sumA.innerHTML = productionCostsA.toFixed(2);
    sumB.innerHTML = productionCostsB.toFixed(2);

    return productionCostsA;
}

function endPriceCalc(productionCosts, factorLabel, priceManuell, price, singlePrice) {
    let factor;

    if (productionCosts < 15) factor = 2;
    else if ((2 - (((2 - 1.2) / 100) * productionCosts) / 3.5) < 1.2) factor = 1.2;
    else factor = (2 - (((2 - 1.2) / 100) * productionCosts) / 3.5);

    factorLabel.innerHTML = factor.toFixed(2);

    let endPrice = priceManuell.value !== "" ? priceManuell.value : 
                   Math.ceil((productionCosts * factor) * (1 - (parseInt(discount.value) / 100)) + parseInt(shippingCost.value));

    price.value = endPrice;

    singlePrice.innerHTML = (endPrice / parseInt(batch1.value)).toFixed(2);
}

/*------------------------------------------DELETE-BUTTON---------------------------------------------------*/


document.addEventListener("DOMContentLoaded", () => {
    const contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");
    contextMenu.innerHTML = '<button id="context-delete">Löschen</button>';
    document.body.appendChild(contextMenu);

    let paperRow = null
    let selectedPaperId = null;

    paperTable.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const row = event.target.closest("tr");
        if (!row) return;

        paperRow = row;
        selectedPaperId = row.getAttribute("data-id");
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.display = "block";
    });

    document.addEventListener("click", () => {
        contextMenu.style.display = "none";
    });

    document.getElementById("context-delete").addEventListener("click", async () => {
        if (selectedPaperId) {
            paperTable.removeChild(paperRow);
            usedPapers.splice(selectedPaperId - 1, 1);
        }
    });
});



/*--------------------------------------------BUTTONS------------------------------------------------------*/


btnCustomer.addEventListener('click', () => {
    popup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});


btnPaper.addEventListener('click', () => {
    popupPaper.style.display = 'block';
});

closePaper.addEventListener('click', () => {
    popupPaper.style.display = 'none';
});



/*------------------------------------------RESET-BUTTON---------------------------------------------------*/

clearbutton.addEventListener('click', () => {
    Array.from(inputs).some(input => input.value = "");
    clearbutton.disabled = true;
    addbutton.disabled = true;
    updateButton.disabled = true;
    updatePaperId = 0;
    surcharge.innerHTML = '... % Aufschlag';
});


addbutton.addEventListener('click', async () => {
    addRow();
});






//Main
let customerJson = await Helpers.fetchTable(`${path}/customers`);
let paperJson = await Helpers.fetchTable(`${path}/products/papers`);
let printerJson = await Helpers.fetchTable(`${path}/products/printers`);
initializeTable(customerJson, paperJson, printerJson);