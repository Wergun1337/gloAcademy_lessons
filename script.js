'use strict';

const rollback = 12;
let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?", "0");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?", "0");

// определение типа
const showTypeOf = function (variable) {
    console.log(variable, typeof (variable))
}

// сообщение о скидке 

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            console.log("Даем скидку в 10%")
            break
        case price >= 15000:
            console.log("Даем скидку в 5%")
            break
        case price >= 0:
            console.log("Скидка не предусмотрена")
            break
        default:
            console.log("Что то пошло не так")
    };
};

//сумма доп услуг 
const getAllServicePrices = function () {
    return Number(servicePrice1) + Number(servicePrice2);
};

let allServicePrices = getAllServicePrices();

// полная стоимость
function getFullPrice() {
    return Number(screenPrice) + allServicePrices;
};
let fullPrice = getFullPrice();

const getTitle = function () {
    let lowercaseTitle = title.trimStart().toLowerCase();
    return lowercaseTitle.charAt(0).toUpperCase() + lowercaseTitle.slice(1)
};

title = getTitle();

const getServicePercentPrices = function () {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

let servicePercentPrice = getServicePercentPrices();


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
getRollbackMessage(fullPrice);

// не очень понял с выводом экранов 
// console.log(screens.toLocaleLowerCase().split(","));
console.log(screens);

console.log(servicePercentPrice);
