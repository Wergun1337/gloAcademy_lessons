'use strict';

const title = document.getElementsByTagName('h1')[0];
const totalButton = document.getElementsByClassName('handler_btn')[0];
const addButton = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const rangeInput = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector('.rollback .range-value');


const totalInput = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalCountFull = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];


let screens = document.querySelectorAll('.screen');


const appData = {
    title: '',
    screenCount: 0,
    screens: [],
    screenPrice: 0,
    rollback: 12,
    servicesPercent: {},
    servicesNumber: {},
    servicePricePercent: 0,
    servicePriceNumber: 0,
    allServicePrices: 0,
    fullPrice: 0,
    lowercaseTitle: '',


    init: function () {
        appData.addTitle();
        totalButton.addEventListener('click', appData.start);
        addButton.addEventListener('click', appData.addScreenBlock);

        document.addEventListener('input', function (event) {
            if (event.target.closest('.screen')) {
                appData.updateCalculateButton();
            }
        });

        document.addEventListener('change', function (event) {
            if (event.target.closest('.screen')) {
                appData.updateCalculateButton();
            }
        });

        appData.updateCalculateButton();
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    showResult: function () {
        totalInput.value = appData.screenPrice;
        totalCountOther.value = appData.servicePriceNumber + appData.servicePricePercent
        totalCountFull.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.screenCount;

    },

    addScreens: function () {
        appData.screens = [];
        screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                screenName: selectName,
                screenPrice: +select.value * +input.value,
                count: +input.value,
            })
        });

    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },

    addServices: function () {
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        })

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        })
    },
    // запуск
    start: function () {
        if (!appData.validateScreens()) {
            return;
        }
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        appData.updateRollback();
    },

    addPrices: function () {
        appData.servicePriceNumber = 0;
        appData.servicePricePercent = 0;
        // appData.screenPrice через reduce
        appData.screenPrice = appData.screens.reduce(function (acc, cur) {
            return acc + cur.screenPrice;
        }, 0);

        for (let key in appData.servicesNumber) {
            appData.servicePriceNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricePercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = appData.screenPrice + appData.servicePriceNumber + appData.servicePricePercent;

        appData.servicePercentPrice = Math.ceil(
            appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
        );

        appData.screenCount = appData.screens.reduce(function (acc, cur) {
            return acc + cur.count;
        }, 0);
    },

    // Проверка на заполненность 
    validateScreens: function () {
        const screens = document.querySelectorAll('.screen');

        return Array.from(screens).every(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            return select.value !== '' &&
                input.value.trim() !== '' &&
                Number(input.value) > 0;
        });
    },

    updateCalculateButton: function () {
        totalButton.disabled = !appData.validateScreens();
    },
    // обработчик range + усложнение
    updateRollback: function () {
        appData.rollback = +rangeInput.value;
        rangeValue.textContent = appData.rollback;

        appData.servicePercentPrice = Math.ceil(
            appData.fullPrice * (1 - appData.rollback / 100)
        );

        totalCountRollback.value = appData.servicePercentPrice;
    },

};

appData.init();


