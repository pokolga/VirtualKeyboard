
//data

const numbers = [
    ["Ё", "Ё", "`", "~"], ["1", "!", "1", "!"], ["2", "\"", "2", "@"], ["3", "№", "3", "#"], ["4", ";", "4", "$"], ["5", "%", "5", "$"], ["6", ":", "6", "^"], ["7", "?", "7", "&"], ["8", "*", "8", "*"], ["9", "(", "9", "("], ["0", ")", "0", ")"], ["-", "_", "-", "_"], ["=", "+", "=", "+"]
];
const topRow = [
    ["Й", "Q"], ["Ц", "W"], ["У", "E"], ["К", "R"], ["Е", "T"], ["Н", "Y"], ["Г", "U"], ["Ш", "I"], ["Щ", "O"], ["З", "P"], ["Х", "Х", "[", "{"], ["Ъ", "Ъ", "]", "}"]
];
const middleRow = [
    ["Ф", "A"], ["Ы", "S"], ["В", "D"], ["А", "F"], ["П", "G"], ["Р", "H"], ["О", "J"], ["Л", "K"], ["Д", "L"], ["Ж", "Ж", ";", ":"], ["Э", "Э", "'", "\""], ["\\", "/", "\\", "|"]
];
const bottomRow = [
    ["Я", "Z"], ["Ч", "X"], ["С", "C"], ["М", "V"], ["И", "B"], ["Т", "N"], ["Ь", "M"], ["Б", "Б", ",", "<"], ["Ю", "Ю", ".", ">"], [".", ",", "/", "?"]
];


//                                   <div class="backspace delete"><i class="fa-solid fa-delete-left"></i></div>
//                                  <input type='button' class="enter" value="ВВОД">







//functions
/*********************************
 * init() - 
 * generateKeyboard() - генерирует клавиатуру
*********************************/
function init() {
    generateSkeleton();
    generateKeyboard();

}

function generateSkeleton() {
    let output = `<div class="content">
    <main>
    <textarea class="field" rows="10" cols="60"></textarea>
    <div class="keyboard">
    </div>
    </main>
    <footer class="footer">
             <div class="git">
                 <a href="https://github.com/pokolga">
                     <img class="rs-school-icon" src="./assets/img/github.svg" alt="github">
                 </a>
             </div>
             <span>© 2022</span>
             <div class="rsschool">
                 <a href="https://rs.school/js-stage0/">
                     <img class="rs-school-icon" src="./assets/img/rs_school_js.svg" alt="rs_school_js">
                 </a>
             </div>
         </footer>
     </div>
    `;
    document.querySelector("body").insertAdjacentHTML("afterbegin", output);
}

function generateKeyboard() {
    let output = "<div class='numbers'>";
    numbers.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "<button   class='special'>BackSpace</button></div>";
    output += "<div class='top'><button class='special'>Tab</button>";
    topRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "<button  class='special'>DEL</button></div><div class='middle'><button class='special'>CapsLock</button>";
    middleRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "<button  class='special'>ENTER</button></div><div class='bottom'><button  class='special'>Shift</button>";
    bottomRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "<button  class='special'>Shift</button>";
    output += '<button class="special arrow-up"><i class="fas fa-circle-arrow-up"></i> </button></div>';
    output += "<div class='additional'><button  class='special'>Ctrl</button><button class='special'>Win</button><button  class='special'>Alt</button><button  class='special space'> </button><button  class='special'>Alt</button><button  class='special'>Ctrl</button>";
    output += '<button class="special  arrow-left"><i class="fas fa-circle-arrow-left"></i> </button><button class="special  arrow-down"><i class="fas fa-circle-arrow-down"></i> </button><button class="special  arrow-right"><i class="fas fa-circle-arrow-right"></i> </button></div>';
    document.querySelector(".keyboard").insertAdjacentHTML("afterbegin", output);

    window.addEventListener('keyup', (ev) => {

        let targetSymb = ev.key;
        const virtualKey = Array.from(document.querySelectorAll(".keyboard input")).filter((e) => e.value === targetSymb);
        if (virtualKey[0]) {
            virtualKey[0].classList.add("active-key");
            setTimeout(function () { virtualKey[0].classList.remove("active-key"); }, 150);
        }
        document.querySelector(".field").textContent = document.querySelector(".field").textContent + targetSymb;
    });
    document.querySelector(".keyboard").addEventListener('mouseup', (ev) => {
        console.log(ev.target.textContent);
        document.querySelector(".field").focus();
        if (ev.target.value) {
            document.querySelector(".field").textContent = document.querySelector(".field").textContent + ev.target.value;
        }

    });
}

function ifBackSpace(activeSymb) {
    if (!activeSymb) {
        activeSymb = activeWord.querySelectorAll("div")[4];
    } else {
        activeSymb = activeSymb.previousElementSibling;
        if (!activeSymb) {
            activeSymb = activeWord.querySelector("div");
        }
    }
    activeSymb.textContent = "";
    document.querySelector(".enter").classList.add("inactive");
    return activeSymb;
}


//listeners

window.addEventListener("DOMContentLoaded", init);

/*window.addEventListener('keydown', (ev) => {
    if (document.querySelector(".overlay")) return; //иначе многократно выводит модальные окна


    let inpSymb = ev.key;
    //смотрим на особые клавиши: ввод, забой.
    switch (inpSymb) {
        case " ":
            ev.preventDefault();
            return;
        case "Backspace":
            activeSymb = ifBackSpace(activeSymb);
            return;
        case "Enter":
            let result = checkWord(activeWord); //посчитать буквы!

            if (!result) return; //не все буквы введены или отсутствует слово в словаре

            //определяем цвета угаданных букв
            changeColorOfRightSymb(activeWord, result);

            if (result === "!!!!!") {
                showResult(activeWord, "victory");
                activeWord = null;
                return;
            }

            numbOfAttemp++;
            if (numbOfAttemp >= 6) {
                showResult(activeWord, "loss");
                activeWord = null;
                return;
            }
            activeWord = document.querySelector(`.${attempts[numbOfAttemp]}`);
            activeSymb = activeWord.querySelector("div");
            activeWordHighlight(activeWord);
            document.querySelector(".enter").classList.add("inactive");
            return;
        case "ё": inpSymb = "е"; //буква ё не используется
    }

})*/

/*document.querySelector(".keyboard").addEventListener('mouseup', (ev) => {
    if (!activeWord) return;

    if (!(ev.target.type === "button" || /delete/.test(ev.target.className))) return;

    let inpSymb = ev.target.value;

    if (/delete/.test(ev.target.className)) {
        //написать новое
        return;
    }

    activeSymb.textContent = inpSymb; //записываем в ячейку и переходим к следующей
    activeSymb = activeSymb.nextElementSibling;
    if (!activeSymb) document.querySelector(".enter").classList.remove("inactive");
})

document.querySelector(".sound").addEventListener("click", soundControl);

*/

console.log(`Итого: 60(70)
                                        +10 Вёрстка:реализован интерфейс игры, в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс
                                        +10 Логика игры. Ходы, другие действия игрока подчиняются определённым свойственным игре правилам
                                        +10 Реализовано завершение игры при достижении игровой цели
                                        +10 По окончанию игры выводится её результат:  выигрыш или поражение, ссылка на значение слова, кнопка на новую итерацию игры
                                        +10 Результаты (угаданные слова) сохраняются в local storage. Есть диаграмма, с какой попытки угадано слово, общая статистика игр и перечень сыгранных слов
                                        +10 Анимации или звуки: звуки, отражающие меру попадания в цель, поддерживающие вывод результата, музыкальная заставка в начале игры
                                        +10 Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал: заставка с выводом произвольных слов из словаря, серьезная работа с подготовкой словаря существительных из 5 букв.
                                        `);
