import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5000/customers';

let customers = [];
let updateCustomerId = 0;


const table = document.querySelector('#customer-table tbody');


const personName = document.querySelector('#name');
const companyName = document.querySelector('#name2');
const street = document.querySelector('#street');
const zipCode = document.querySelector('input#zip');
const city = document.querySelector('input#city');
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




function initializeTable(customerJson) {
    customers = [];
    table.innerHTML = '';
    customerJson.forEach(item => {
        customers.push(item);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.personName}</td>
        <td>${item.companyName}</td>
        <td>${item.city}</td>
        <td>${item.zipCode}</td>
        <td>${item.street}</td>
        `;
        row.setAttribute('data-id', item.id);
        row.addEventListener('click', (e) => {
            const customer = customers.find(item => item.id === parseInt(e.currentTarget.getAttribute('data-id')));
            updateCustomerId = parseInt(e.currentTarget.getAttribute('data-id'));
            personName.value = customer.personName;
            companyName.value = customer.companyName;
            street.value = customer.street;
            zipCode.value = customer.zipCode;
            city.value = customer.city;
            country.value = customer.country;
            phoneNumber.value = customer.phoneNumber;
            mailAdress.value = customer.mailAdress;
            discount.value = customer.discount;
            payment.value = customer.paymentTerms;
            clearbutton.disabled = false
        });
        table.appendChild(row);
    });
}




/*------------------------------------------ADD-BUTTON---------------------------------------------------*/




async function addRow() 
{
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
    PaymentTerms: payment.value,
  };
  console.log(JSON.stringify(newCustomer));
  addbutton.disabled = true;
  try 
  {
    console.log('sending request');
    const response = await fetch(path, 
    {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(newCustomer),
    });

    const data = await response.json();
    console.log('got request: ', data);

    if (!response.ok) 
    {
        throw new Error(`Fehler beim Hinzufügen: ${response.status}`);
    }

    customerJson = await Helpers.fetchTable(path);
    initializeTable(customerJson); 
    userMessage.textContent = "Drucker wurde erfolgreich hinzugefügt";
    userMessage.style.color = "green";
  } 
  catch (error) 
  {
    console.error("Fehler beim Hinzufügen eines neuen Druckers: ", error);
  }
  Array.from(inputs).some(input => input.value = "");
  clearbutton.disabled = true;
  payment.value = "2";
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
        PaymentTerms: payment.value,
    };
    console.log(JSON.stringify(newCustomer));


    try 
    {
      const response = await fetch(`${path}/${updateCustomerId}`, 
      {
          method: "PUT",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(newCustomer), // Daten an Server senden
      });
  
      if (!response.ok) 
      {
          throw new Error(`Response beim PUT-Request fehlerhaft: ${response.status}`);
      }
  
      customerJson = await Helpers.fetchTable(path);
      initializeTable(customerJson); 
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
    updateCustomerId = 0;
    payment.value = "2";
})










function checkFields() 
{
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
    const anyFilled = Array.from(inputs).some(input => input.value.trim() !== "" || !input.value);

    addbutton.disabled = !allFilled || !(updateCustomerId === 0);
    updateButton.disabled = !anyFilled || updateCustomerId === 0;
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
    updateCustomerId = 0;
});


addbutton.addEventListener('click', async () => {
    addRow();
});


payment.addEventListener('change', () => {
    updateButton.disabled = updateCustomerId === 0 ? true : false;
})


//Main
let customerJson = await Helpers.fetchTable(path);
initializeTable(customerJson);