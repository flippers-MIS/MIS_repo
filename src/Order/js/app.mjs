import * as Helpers from '../../HelperFunctions/helper.mjs';

const path = 'http://localhost:5000';

let calcultions = [];
let customers = [];
let calculation;


const table = document.querySelector('#calc-table tbody');



const userMessage = document.querySelector("#userMessage")


async function initializeTable(calcJson) {
    calcultions = [];
    customers = [];
    const customersJson = await Helpers.fetchTable(`${path}/customers`);
    table.innerHTML = '';
    calcJson.forEach(item => {
        calcultions.push(item);
        const row = document.createElement('tr');
        customersJson.forEach(item2 => {
            customers.push(item2);
        })
        row.innerHTML = `
        <td>${item.date}</td>
        <td>${item.id}</td>
        <td>${customers.find(item2 => item2.id === item.customerId).personName}</td>
        <td>${item.productName}</td>
        <td>${item.title}</td>
        <td>${item.pages}</td>
        `;
        row.setAttribute('data-id', item.id);
        row.addEventListener('click', (e) => {
            calculation = calcultions.find(item => item.id === parseInt(e.currentTarget.dataset.id));
            localStorage.setItem('calculation', JSON.stringify(calculation));
            location.href = "/src/Order/html/calculation.html";
        });

        table.appendChild(row);
    });
}

//Main
let calcJson = await Helpers.fetchTable(`${path}/orders`);
initializeTable(calcJson);