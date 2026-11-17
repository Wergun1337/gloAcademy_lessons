let title = "lesson02";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 322;
let rollback = 12;
let fullPrice = 1337;
let adaptive = true;

// определение типов
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

// длинна строки
console.log(screens.length);

// вывод переменных внутри строки
console.log(`Стоимость верстки экранов ${screenPrice} рублей / долларов / гривен / юани`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей / долларов / гривен / юани`);

// нижний регистр + создание массива
console.log(screens.toLocaleLowerCase().split(","));

// вывод вычислительных операций внутри console.log()
console.log("Процент отката посреднику за работу: " + fullPrice * (rollback / 100));


// lesson 03

title = prompt("Как называется ваш проект?");
screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
screenPrice = prompt("Сколько будет стоить данная работа?", "12000");

// через !!prompt при ненулевом значении выводит всегда true, поэтому сделал вот такую проверку
adaptive = prompt("Нужен ли адаптив на сайте?", "true/false") === "true";

console.log(adaptive);

let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = prompt("Сколько это будет стоить?", "0");

let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = prompt("Сколько это будет стоить?", "0");

fullPrice = parseInt(screenPrice) + parseInt(servicePrice1) + parseInt(servicePrice2);

let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

console.log(servicePercentPrice);

switch (true) {
    case fullPrice >= 30000:
        console.log("Даем скидку в 10%")
        break
    case fullPrice >= 15000 && fullPrice < 30000:
        console.log("Даем скидку в 5%")
        break
    case fullPrice >= 0 && fullPrice < 15000:
        console.log("Скидка не предусмотрена")
        break
    default:
        console.log("Что то пошло не так")
};