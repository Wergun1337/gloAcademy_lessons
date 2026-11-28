'use strict';

const title = document.getElementsByTagName('h1')[0];
const totalButton = document.getElementsByClassName('handler_btn')[0];
const addButton = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const rangeInput = document.querySelector('.rollback input[type="range"]');
const rangeValue = document.querySelector('.rollback .range-value');

const cmsCheckbox = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const cmsSelect = cmsVariants.querySelector('select');
const cmsInput = cmsVariants.querySelector('.main-controls__input');

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
    servicePercentPrice: 0,
    cmsPrice: 0,
    lowercaseTitle: '',

    init() {
        this.addTitle();

        totalButton.addEventListener('click', this.start.bind(this));
        addButton.addEventListener('click', this.addScreenBlock.bind(this));

        document.addEventListener('input', (event) => {
            if (event.target.closest('.screen')) {
                this.updateCalculateButton();
            }
        });

        document.addEventListener('change', (event) => {
            if (event.target.closest('.screen')) {
                this.updateCalculateButton();
            }
        });

        rangeInput.addEventListener('input', () => {
            if (!rangeInput.disabled) {
                this.updateRollback();
            }
        });

        cmsCheckbox.addEventListener('change', () => {
            cmsVariants.style.display = cmsCheckbox.checked ? 'flex' : 'none';
        });

        cmsSelect.addEventListener('change', () => {
            cmsInput.style.display = cmsSelect.value === 'other' ? 'block' : 'none';
        });

        this.updateCalculateButton();
    },

    addTitle() {
        document.title = title.textContent;
    },

    showResult() {
        totalInput.value = this.screenPrice;
        totalCountOther.value = this.servicePriceNumber + this.servicePricePercent;
        totalCountFull.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.screenCount;
    },

    addScreens() {
        this.screens = [];
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                screenName: selectName,
                screenPrice: +select.value * +input.value,
                count: +input.value,
            });
        });
    },

    addScreenBlock() {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);

        screens = document.querySelectorAll('.screen');

        this.updateCalculateButton();
    },

    addServices() {
        this.servicesPercent = {};
        this.servicesNumber = {};

        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    start() {
        if (!this.validateScreens()) {
            return;
        }

        this.addScreens();
        this.addServices();
        this.addPrices();
        this.updateRollback();
        this.showResult();

        document.querySelectorAll('.main input[type="text"], .main select')
            .forEach((item) => {
                item.disabled = true;
            });

        addButton.disabled = true;

        totalButton.style.display = 'none';

        const resetButton = document.createElement('button');
        resetButton.id = 'reset';
        resetButton.className = totalButton.className;
        resetButton.textContent = 'Сброс';

        totalButton.after(resetButton);

        resetButton.addEventListener('click', this.reset.bind(this));

        rangeInput.disabled = true;
    },

    addPrices() {
        this.servicePriceNumber = 0;
        this.servicePricePercent = 0;
        this.cmsPrice = 0;

        this.screenPrice = this.screens.reduce((acc, cur) => {
            return acc + cur.screenPrice;
        }, 0);

        for (let key in this.servicesNumber) {
            this.servicePriceNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricePercent +=
                this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice =
            this.screenPrice +
            this.servicePriceNumber +
            this.servicePricePercent;

        // Усложненное задание: расчет стоимости CMS
        const cmsCheckboxes = cmsVariants.querySelectorAll('input[type="checkbox"]');

        cmsCheckboxes.forEach((checkbox) => {
            if (checkbox.checked && checkbox.value.trim() !== '' &&
                !isNaN(Number(checkbox.value))) {
                this.cmsPrice += this.fullPrice * (Number(checkbox.value) / 100);
            }
        });

        this.fullPrice += this.cmsPrice;

        this.servicePercentPrice = Math.ceil(
            this.fullPrice - this.fullPrice * (this.rollback / 100)
        );

        this.screenCount = this.screens.reduce((acc, cur) => {
            return acc + cur.count;
        }, 0);
    },

    validateScreens() {
        const screens = document.querySelectorAll('.screen');

        return Array.from(screens).every((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            return select.value !== '' &&
                input.value.trim() !== '' &&
                Number(input.value) > 0;
        });
    },

    updateCalculateButton() {
        totalButton.disabled = !this.validateScreens();
    },

    updateRollback() {
        this.rollback = +rangeInput.value;
        rangeValue.textContent = this.rollback;

        this.servicePercentPrice = Math.ceil(
            this.fullPrice * (1 - this.rollback / 100)
        );

        totalCountRollback.value = this.servicePercentPrice;
    },

    reset() {
        const allScreens = document.querySelectorAll('.screen');

        allScreens.forEach((screen, index) => {
            if (index > 0) {
                screen.remove();
            }
        });

        document.querySelectorAll('.main input[type="text"]').forEach((input) => {
            input.value = '';
            input.disabled = false;
        });

        document.querySelectorAll('.main select').forEach((select) => {
            select.selectedIndex = 0;
            select.disabled = false;
        });

        document.querySelectorAll('.main input[type="checkbox"]').forEach((input) => {
            input.checked = false;
        });

        rangeInput.disabled = false;
        rangeInput.value = 12;
        rangeValue.textContent = 12;

        addButton.disabled = false;

        totalInput.value = '';
        totalCount.value = '';
        totalCountOther.value = '';
        totalCountFull.value = '';
        totalCountRollback.value = '';

        const resetButton = document.getElementById('reset');

        if (resetButton) {
            resetButton.remove();
        }

        totalButton.style.display = '';
        totalButton.disabled = true;

        cmsCheckbox.checked = false;
        cmsVariants.style.display = 'none';

        cmsSelect.selectedIndex = 0;
        cmsInput.style.display = 'none';

        cmsVariants.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.checked = false;
        });

        cmsVariants.querySelectorAll('input[type="text"]').forEach((input) => {
            input.value = '';
            input.disabled = false;
        });

        this.screenCount = 0;
        this.screens = [];
        this.screenPrice = 0;
        this.rollback = 12;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.servicePricePercent = 0;
        this.servicePriceNumber = 0;
        this.allServicePrices = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.cmsPrice = 0;

        screens = document.querySelectorAll('.screen');

        this.updateCalculateButton();
    },
};

appData.init();
