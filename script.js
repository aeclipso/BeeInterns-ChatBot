/* selectors */
const btnSend = document.querySelector(".send-btn");
const inputField = document.querySelector(".msg-input");
const messageField = document.querySelector(".main-field");
let flagStart = false;
let flagName = false;
let flagCalc = false;
let nums;
let name;

firstCommands = () => {
    let msg = inputField.value;
    userSendMessage(msg);

    if (msg === "/start" && flagStart === false){
        flagStart = true;
        botSendMessage("Привет, меня зовут Чат-бот, а как зовут тебя?");
    }
    else if(msg === "/start" && flagStart === true){
        botSendMessage("Вы уже вводили /start, введите другую команду");
    }
    else if(msg === "/stop" && flagStart === true){
        botSendMessage("Всего доброго, если хочешь поговорить пиши /start");
        flagStart = false;
        flagName = false;
    }
    else if(msg.startsWith("/name") && flagStart === true && flagName === false){
        name = msg.slice(6);
        if (name === " " || name === ""){
            botSendMessage("Введите имя после команды /name, не оставляйте поле пустым!")
        }
        else{
            botSendMessage(`Привет, ${name}, приятно познакомиться. Я умею считать. Введи числа, которые надо посчитать в формате: /number: 1,2.`);
            flagName = true;
        }
    }
    else if (msg.startsWith("/number:") && flagStart === true && flagName === true){
        nums = msg.slice(9).split(",");
        if (nums.length == 2){
            botSendMessage("Что сделать с числами: + - / * ?");
            flagCalc = true;
        }
        else {
            botSendMessage("Введите два числа разделённых запятой \",\"");
        }
    }
    else if (msg === "+" && flagCalc === true){
        let add = parseInt(nums[0]) + parseInt(nums[1]);
        botSendMessage(`Сумма равна ${add}`);
        flagCalc = false;
    }
    else if (msg === "-" && flagCalc === true){
        let sub = parseInt(nums[0]) - parseInt(nums[1]);
        botSendMessage(`Разность равна ${sub}`);
        flagCalc = false;
    }
    else if (msg === "*" && flagCalc === true){
        let mult = parseInt(nums[0]) * parseInt(nums[1]);
        botSendMessage(`Произведение равно ${mult}`);
        flagCalc = false;
    }
    else if (msg === "/" && flagCalc === true){
        let div = parseInt(nums[0]) / parseInt(nums[1]);
        botSendMessage(`Частное равно ${div}`);
        flagCalc = false;
    }
    else if (flagStart === true && flagName === false){
        botSendMessage("Чтобы ввести имя, воспользуйся командой /name");
    }
    else if (flagStart === true && flagName === true && msg.startsWith("/name")){
        botSendMessage(`Я уже знаю ваше имя, вас зовут: ${name}`);
    }
    else if (flagStart === false){
        botSendMessage("Введите команду /start, для начала общения");
    }
    else if(msg === "/weather") {
        let url = "https://api.openweathermap.org/data/2.5/onecall?lat=55.75396&lon=37.620393&exclude=current,minutely,hourly&lang=ru&units=metric&appid=f7d70d2365450e551f8856b8dc431f90";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        try {
            xhr.send();
            let data = JSON.parse(xhr.response);
            botSendMessage(`Прогноз погоды на завтра:\n
            температура днем ${data.daily[1].temp.day} С \n
            температура ночью ${data.daily[1].temp.night} С \n
            скорость ветра ${data.daily[1].wind_speed} м/с \n
            влажность ${data.daily[1].humidity}%\n${data.daily[1].weather[0].description}\n
            давление ${data.daily[1].pressure} hPa`);
        } catch (err) {
            botSendMessage("Не удалось получить данные о погоде.");
        }
    }
    else{
        botSendMessage  ("Не могу распознать команду");
    }
};

botSendMessage = (msg) => {
    setTimeout( () => {
        messageField.insertAdjacentHTML('beforebegin',
            `<div class="bot-block">
                    <div class="avatar">
                        <img src="img/bot.svg">
                    </div> 
                    <div class="bot-msg">${msg}</div>
                  </div>`);
    }, 1000);
};

userSendMessage = (msg) => {
    setTimeout( () => {
        messageField.insertAdjacentHTML('beforebegin',
                    `<div class="user-block">
                       <div class="avatar">
                            <img src="img/user.svg"> 
                       </div>
                       <div class="user-msg"><div>${msg}</div></div> 
                   </div>`);
    }, 100);
        let divForScroll = document.querySelector(".main");
    setInterval( () => {
        divForScroll.scrollTop = 9999;
    }, 1000);
};

btnSend.addEventListener('click', firstCommands);
