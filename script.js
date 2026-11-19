'use strict';
const rollback = 12;

let title;
let screens;
let screenPrice;
let adaptive;

let service1;
let service2;

let servicePercentPrice;
let allServicePrices;
let fullPrice;

// проверка на число 
const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

// опросник 
const asking = function () {
    title = prompt("Как называется ваш проект?", "project1");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

    // усложнение
    do {
        screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
        if (isNumber(screenPrice)) {
            screenPrice = Number(screenPrice)
        }
    }
    while (!isNumber(screenPrice) || screenPrice <= 0);

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

// определение типа
const showTypeOf = function (variable) {
    console.log(variable, typeof (variable))
}

// сумма доп услуг
const getAllServicePrices = function () {
    let sum = 0;
    let servicePrice;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?", "service1");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?", "service 2");
        }
        do { servicePrice = prompt("Сколько это будет стоить?", "0"); }
        while (!isNumber(servicePrice) || servicePrice <= 0);

        sum += Number(servicePrice);
    };

    return sum;

};

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


// полная стоимость
function getFullPrice() {
    return screenPrice + allServicePrices;
};

const getTitle = function () {
    let lowercaseTitle = title.trimStart().toLowerCase();
    return lowercaseTitle.charAt(0).toUpperCase() + lowercaseTitle.slice(1)
};

const getServicePercentPrices = function () {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100));
};

asking();

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
getRollbackMessage(fullPrice);

// не очень понял с выводом экранов 
// console.log(screens.toLocaleLowerCase().split(","));
console.log(screens);

console.log(servicePercentPrice);
