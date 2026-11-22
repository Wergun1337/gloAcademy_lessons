'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 12,
    services: {},
    servicePercentPrice: 0,
    allServicePrices: 0,
    fullPrice: 0,
    lowercaseTitle: '',

    // запуск
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.getRollbackMessage(appData.fullPrice);
    },

    // Опросник
    asking: function () {
        do {
            appData.title = prompt("Как называется ваш проект?", "project1");
        }
        while (!appData.isText(appData.title));

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");

        // тип экранов
        for (let i = 0; i < 2; i++) {
            let screenName = '';
            let screenPrice = 0
            do { screenName = prompt("Какие типы экранов нужно разработать?", "Простые"); }
            while (!appData.isText(screenName))

            do {
                screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
            } while (!appData.isNumber(screenPrice) || screenPrice <= 0);

            appData.screens.push({ id: i, screenName: screenName, screenPrice: screenPrice })
        }


        // доп услуги
        for (let i = 0; i < 2; i++) {
            let serviceName = '';
            let servicePrice = 0;
            do {
                serviceName = prompt("Какой дополнительный тип услуги нужен?", "Вёрстка кнопки");
            } while (!appData.isText(serviceName))
            do {
                servicePrice = prompt("Сколько это будет стоить?", "0");
            } while (!appData.isNumber(servicePrice) || Number(servicePrice) < 0);

            appData.services[i] = {
                name: serviceName,
                price: Number(servicePrice),
            };
        }

    },

    addPrices: function () {

        // appData.screenPrice через reduce
        appData.screenPrice = appData.screens.reduce(function (acc, cur) {
            return acc + cur.screenPrice;
        }, 0);

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key].price;
        }
    },

    // Проверка на число
    isNumber: function (num) {
        return typeof num === 'string' &&
            num.trim() !== '' &&
            !isNaN(parseFloat(num)) &&
            isFinite(num);
    },

    // Проверка на строку
    isText: function (string) {
        return typeof string === 'string' &&
            string.trim() != '' &&
            /\p{L}/u.test(string);
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
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },

    // Форматирование названия
    getTitle: function () {
        appData.lowercaseTitle = appData.title.trimStart().toLowerCase();

        appData.title = appData.lowercaseTitle.charAt(0).toUpperCase() +
            appData.lowercaseTitle.slice(1);
    },

    // Стоимость за вычетом процента посредника
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.ceil(
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
        );
    },
};

appData.start();


