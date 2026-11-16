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
