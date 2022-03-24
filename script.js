"use strict";
let money = document.querySelector(".dolar");
let input = document.querySelector("input");
let stavka = document.querySelector(".stavka button");
let modal = document.querySelector(".modal");
let pod_modal = document.querySelector(".pod_modal");
let white = document.querySelector(".white");
let brown = document.querySelector(".brown");
let buttons = document.querySelector(".buttons");
let white_horse = document.querySelector(".white_horse");
let brown_horse = document.querySelector(".brown_horse");
let text = document.querySelector(".text");
let number_message = 0;
let clik_button = "";
let winner = { name: "" };
let money_int;
let input_int;

let times_horses = [{
    name: "white",
    time: 0
}, {
    name: "brown",
    time: 0
}, ];

let message = [
    "Тебе не хватает денег для ставки!!!",
    "пополни счёт, для ставки",
    "Ау...Ты слышишь меня?!",
    "ТЕБЕ НЕ ХВАТАЕТ ДЕНЕГ!!!",
    "Так, всё, ты мне надоел..."
];


money.innerText = "10"; //деньги
input.oninput = function() {
    if ((input.value == "") || (Number(input.value) == 0)) {
        stavka.setAttribute("disabled", true);

    } else {
        stavka.removeAttribute("disabled");
    }
}; //проверка ставки

stavka.onclick = async function() {

    let timeout = 0;

    stavka.setAttribute("disabled", true); //расблокировка 
    input.setAttribute("disabled", true); //расблокировка 

    money_int = Number(money.innerText);
    input_int = Number(input.value);

    modal.classList.add("modalTransform"); //движение человечка
    await sleep(2000);

    if (money_int >= input_int) {

        text.innerText = "Ставка принята. Удачи!";
        pod_modal.classList.add("pod_modalTransform"); //появление текста

        await sleep(2000);
        modal.classList.remove("modalTransform"); //возвращение
        pod_modal.classList.remove("pod_modalTransform");


        for (let i = 0; i < input_int; i++) { //снятие денег

            if (input_int > 100) {

                money_int = money_int - 1;
                money.innerText = money_int;
                await sleep(1);

                timeout = timeout + 300;

            } else if (input_int > 10) {

                money_int = money_int - 1;
                money.innerText = money_int;
                await sleep(100);
                timeout = timeout + 300;
            } else {
                money_int = money_int - 1;
                money.innerText = money_int;
                await sleep(300);
                timeout = timeout + 300;

            }

        }

        buttons.classList.remove("buttons");
        buttons.classList.add("buttons_visbility"); //появление кнопок
        white.removeAttribute("disabled", true);
        brown.removeAttribute("disabled", true);


    } else {

        if (number_message == message.length - 1) { //нехватка денег

            money.innerText = "-\u221E";
            text.innerText = message[number_message];
            input.placeholder = "счёт заблокирован";

            pod_modal.classList.add("pod_modalTransform");
            await sleep(2000);
            modal.classList.remove("modalTransform");
            pod_modal.classList.remove("pod_modalTransform");
            input.value = "";

        } else {

            text.innerText = message[number_message];
            number_message = number_message + 1;

            pod_modal.classList.add("pod_modalTransform");
            await sleep(2000);
            modal.classList.remove("modalTransform");
            pod_modal.classList.remove("pod_modalTransform");
            input.value = "";
            input.removeAttribute("disabled", true);

        }
    }
    if (timeout <= 2500) {
        await sleep(2500 - timeout);
    }
};

function sleep(ms) { //задержка
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

function getRandomInt(min, max) { //рандомное число
    return Math.floor(Math.random() * (max - min)) + min;
}


async function go_horse(min, max, steps, horse) { //забег лошадей

    let random;
    let time = 0;

    for (let i = 1; i < steps + 1; i++) {

        random = getRandomInt(min, max);
        time = time + random;

        horse.style.transitionDuration = `${random}s`;
        horse.classList.add(`horse_transform_part_0${i}`);
        await sleep(random * 1000);

    }
    return time;
}

async function start(button) { //забег лошадей
    white.setAttribute("disabled", true);
    brown.setAttribute("disabled", true);
    let result = await Promise.all([
        go_horse(1, 5, 3, white_horse),
        go_horse(1, 5, 3, brown_horse)
    ]);

    white_horse.style.transitionDuration = "0.5s";
    brown_horse.style.transitionDuration = "0.5s";
    white_horse.classList.add("horse_transform_back_01");
    brown_horse.classList.add("horse_transform_back_01");
    await sleep(1000);

    white_horse.style.transitionDuration = "2s";
    brown_horse.style.transitionDuration = "2s";
    white_horse.classList.add("horse_transform_back_02");
    brown_horse.classList.add("horse_transform_back_02");
    await sleep(3000);

    white_horse.style.transitionDuration = "0.5s";
    white_horse.classList.remove("horse_transform_back_01");
    white_horse.classList.remove("horse_transform_back_02");

    brown_horse.style.transitionDuration = "0.5s";
    brown_horse.classList.remove("horse_transform_back_01");
    brown_horse.classList.remove("horse_transform_back_02");

    for (let i = 1; i < 3 + 1; i++) {

        white_horse.classList.remove(`horse_transform_part_0${i}`);

        brown_horse.classList.remove(`horse_transform_part_0${i}`);

    }

    times_horses[0].time = result[0]; // время забега
    times_horses[1].time = result[1];

    let money_result = 0; // кол-во денег получим при победе проигрыше или гичьи

    if (result[0] == result[1]) {
        money_result = input_int;
        winner.name = "ничья";
    } else {

        winner = times_horses.reduce(function(min, item) {

            if (min.time > item.time) {
                min = item;
            }
            return min;
        });

        if (button == winner.name) {
            money_result = input_int * 2;

        }
    }

    for (let i = 0; i < money_result; i++) { //начисление денег
        if (money_result <= 10) {
            money_int = money_int + 1;
            money.innerText = money_int;
            await sleep(300);
        } else if (money_result <= 100) {
            money_int = money_int + 1;
            money.innerText = money_int;
            await sleep(100);
        } else if (money_result > 100) {
            money_int = money_int + 1;
            money.innerText = money_int;
            await sleep(1);
        }
    }






    await end();
}
white.addEventListener("click", async function() {
    clik_button = "white";
    await start("white");

});

brown.addEventListener("click", async function() {
    clik_button = "brown";
    await start("brown");

});

async function end() { //кто выйграл

    modal.classList.add("modalTransform");
    await sleep(2000);

    if (winner.name == "ничья") {

        text.innerText = "А такое бывает, похоже ничья";
        pod_modal.classList.add("pod_modalTransform");

    } else {


        if (clik_button == winner.name) {

            if (money.innerText >= 1000) {

                text.innerText = "Ты пытаешься обмануть меня?";

                pod_modal.classList.add("pod_modalTransform");

                money.innerText = "-\u221E";
                input.placeholder = "счёт заблокирован";

            } else {

                text.innerText = "Хм, а тебе повезло, сыграешь ещё?";
                pod_modal.classList.add("pod_modalTransform");

            }

        } else {

            if (money.innerText == 0) {

                text.innerText = "Так... Я смотрю ты совсем заигрался";
                pod_modal.classList.add("pod_modalTransform");

                // modal.classList.add("modalTransform");

                await sleep(2000);

                text.innerText = "Ладно уж, я дам тебе немного денег";

                await sleep(2000);

                money.innerText = 10;

            } else {

                text.innerText = "Может отыграешься?";
                pod_modal.classList.add("pod_modalTransform");

            }

        }
    }

    await sleep(2000);
    modal.classList.remove("modalTransform");
    pod_modal.classList.remove("pod_modalTransform");

    input.removeAttribute("disabled", true);

    input.value = "";

}