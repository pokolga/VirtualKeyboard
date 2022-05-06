
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
    generateKeyboard();

}

function generateKeyboard() {
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
    output = "<div class='numbers'>";
    numbers.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "</div><div class='top'>";
    topRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "</div><div class='middle'>";
    middleRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "</div><div class='bottom'>";
    bottomRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${elem[0].toLowerCase()}'>`
    })
    output += "</div>";
    document.querySelector(".keyboard").insertAdjacentHTML("afterbegin", output);

    window.addEventListener('keydown', (ev) => console.log(ev));
    document.querySelector(".keyboard").addEventListener('mouseup', (ev) => console.log(ev));
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

window.addEventListener('keydown', (ev) => {
    if (document.querySelector(".overlay")) return; //иначе многократно выводит модальные окна
    if (!activeWord) return;

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

    if (!keyboardRu.includes(inpSymb.toLowerCase())) { return; } //отсекаем символы специальные, ALT SHIFT и т.п.


})

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
