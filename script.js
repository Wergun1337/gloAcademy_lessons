
'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 12,
    service1: '',
    service2: '',
    servicePercentPrice: 0,
    allServicePrices: 0,
    fullPrice: 0,
    lowercaseTitle: '',

    // Опросник
    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "project1");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?", "12000");

            if (appData.isNumber(appData.screenPrice)) {
                appData.screenPrice = Number(appData.screenPrice);
            }
        } while (!appData.isNumber(appData.screenPrice) || appData.screenPrice <= 0);

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    // Проверка на число
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    // Сумма дополнительных услуг
    getAllServicePrices: function () {
        let sum = 0;
        let servicePrice = 0;

        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "service1");
            } else {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "service2");
            }

            do {
                servicePrice = prompt("Сколько это будет стоить?", "0");
            } while (!appData.isNumber(servicePrice) || Number(servicePrice) < 0);

            sum += Number(servicePrice);
        }

        return sum;
    },

    // Сообщение о скидке
    getRollbackMessage: function (price) {
        switch (true) {
            case price >= 30000:
                console.log("Даем скидку в 10%");
                break;
            case price >= 15000:
                console.log("Даем скидку в 5%");
                break;
            case price >= 0:
                console.log("Скидка не предусмотрена");
                break;
            default:
                console.log("Что-то пошло не так");
        }
    },

    // Полная стоимость
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },

    // Форматирование названия
    getTitle: function () {
        appData.lowercaseTitle = appData.title.trimStart().toLowerCase();

        return appData.lowercaseTitle.charAt(0).toUpperCase() +
            appData.lowercaseTitle.slice(1);
    },

    // Стоимость за вычетом процента посредника
    getServicePercentPrices: function () {
        return Math.ceil(
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
        );
    },

    logger: function () {
        for (let prop in appData) {
            console.log('appData.' + prop, appData[prop])
        }
    },

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.getRollbackMessage(appData.fullPrice);

        appData.logger();
    },


};

appData.start();


