
//data

const numbers = [
    ["Ё", "Ё", "`", "~"], ["1", "!", "1", "!"], ["2", "\"", "2", "@"], ["3", "№", "3", "#"], ["4", ";", "4", "$"], ["5", "%", "5", "%"], ["6", ":", "6", "^"], ["7", "?", "7", "&"], ["8", "*", "8", "*"], ["9", "(", "9", "("], ["0", ")", "0", ")"], ["-", "_", "-", "_"], ["=", "+", "=", "+"]
];
const topRow = [
    ["Й", "Q"], ["Ц", "W"], ["У", "E"], ["К", "R"], ["Е", "T"], ["Н", "Y"], ["Г", "U"], ["Ш", "I"], ["Щ", "O"], ["З", "P"], ["Х", "Х", "[", "{"], ["Ъ", "Ъ", "]", "}"]
];
const middleRow = [
    ["Ф", "A"], ["Ы", "S"], ["В", "D"], ["А", "F"], ["П", "G"], ["Р", "H"], ["О", "J"], ["Л", "K"], ["Д", "L"], ["Ж", "Ж", ";", ":"], ["Э", "Э", "&prime;", '"'], ["\\", "/", "\\", "|"]
];
const bottomRow = [
    ["Я", "Z"], ["Ч", "X"], ["С", "C"], ["М", "V"], ["И", "B"], ["Т", "N"], ["Ь", "M"], ["Б", "Б", ",", "<"], ["Ю", "Ю", ".", ">"], [".", ",", "/", "?"]
];


//functions
/*********************************
 * init() - 
 * generateSkeleton() - генерирует начальную структуру документа
 * generateKeyboard() - генерирует клавиатуру
 * getSymb(elem, cap, shift, lang) - ищет символ в данных, который будет отображаться на клавише
 *       elem - массив с данными для данной клавиши, cap - включен ли CapsLock, shift - нажата ли Shift, lang - какой язык
 * virtualKeyboardKeyDown() - кликаем по виртуальным клавишам
 * specialAction() - кликаем по спец.клавишам виртуальрной клавиатуры
 * shiftKeyUp() - отпускаем клавишу Shift
*********************************/
function init() {
    generateSkeleton();
    generateKeyboard(false, false, localStorage.getItem('lang') || 'en');

}

function generateSkeleton() {
    let output = `<div class="content">
    <main>
    <textarea class="field" rows="10" cols="60"></textarea>
    <div class="keyboard" data-lang="${localStorage.getItem('lang') || 'en'}">
    </div>
    </main>
    <footer class="footer">
             <div class="git">
                 <a href="https://github.com/pokolga">
                     <img class="rs-school-icon" src="./assets/img/github.svg" alt="github">
                 </a>
             </div>
             <span>© 2022</span>
             <div >
             ОС: Windows, переключение языка: левые Ctrl+Alt
             </div>
         </footer>
     </div>
    `;
    document.querySelector("body").insertAdjacentHTML("afterbegin", output);
}

function generateKeyboard(cap = false, shift = false, lang = document.querySelector(".keyboard").dataset.lang) {
    let output = "<div class='numbers'>";
    numbers.forEach(elem => {
        //["2", "\"", "2", "@"]
        output += `<input type='button' class='button' value='${getSymb(elem, cap, shift, lang)}'>`
    })
    output += "<button   class='special BS'>BackSpace</button></div>";
    output += "<div class='top'><button class='special tab'>Tab</button>";
    topRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${getSymb(elem, cap, shift, lang)}'>`
    })
    output += `<button  class='special del'>DEL</button></div><div class='middle'><button class='special caps' data-on=${cap}>CapsLock</button>`;
    middleRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${getSymb(elem, cap, shift, lang)}'>`
    })
    output += "<button  class='special enter'>ENTER</button></div><div class='bottom'><button  class='special shift'>Shift</button>";
    bottomRow.forEach((elem) => {
        output += `<input type='button' class='button' value='${getSymb(elem, cap, shift, lang)}'>`
    })
    output += "<button  class='special shift'>Shift</button>";
    output += '<button class="special arrow-up"><i class="fas fa-circle-arrow-up"></i> </button></div>';
    output += "<div class='additional'><button  class='special ctrl'>Ctrl</button><button class='special win'>Win</button><button  class='special alt'>Alt</button><button  class='special space'>&nbsp;</button><button  class='special alt'>Alt</button><button  class='special ctrl'>Ctrl</button>";
    output += '<button class="special  arrow-left"><i class="fas fa-circle-arrow-left"></i> </button><button class="special  arrow-down"><i class="fas fa-circle-arrow-down"></i> </button><button class="special  arrow-right"><i class="fas fa-circle-arrow-right"></i> </button></div>';
    output = output.replace("&PRIME;", "&prime;");
    document.querySelector(".keyboard").insertAdjacentHTML("afterbegin", output);

    if (cap) {
        document.querySelector(".caps").classList.add("active-caps");
    }


    document.querySelector(".keyboard").addEventListener('mousedown', virtualKeyboardKeyDown);
    document.querySelectorAll(".shift").forEach(item => item.addEventListener('mouseup', shiftKeyUp));
}

function getSymb(elem, cap, shift, lang) {
    let symb;
    if (elem.length === 4) {
        if (lang === "ru") {
            symb = (shift) ? elem[1] : elem[0];
        } else {
            symb = (shift) ? elem[3] : elem[2];
        }
    } else {
        if (lang === "ru") {
            symb = (shift) ? elem[0].toUpperCase() : elem[0].toLowerCase();
        } else {
            symb = (shift) ? elem[1].toUpperCase() : elem[1].toLowerCase();
        }
    }
    if (shift) {
        symb = (cap) ? symb.toLowerCase() : symb.toUpperCase();
    } else {
        symb = (cap) ? symb.toUpperCase() : symb.toLowerCase();
    }
    return symb;
}

function virtualKeyboardKeyDown(ev) {
    const field = document.querySelector(".field");
    field.focus();
    if (ev.target.classList.contains("special") || ev.target.parentElement.classList.contains("special")) {
        specialAction(ev.target);
        return;
    }

    if (ev.target.value) {
        field.setRangeText(ev.target.value, field.selectionStart, field.selectionEnd, "end");
    }
    field.focus();
}

function specialAction(key) {
    let field = document.querySelector(".field");
    field.focus();

    switch (key.textContent.trim().toUpperCase()) {

        case "TAB": {
            field.setRangeText("\t");
            field.selectionStart++;
            field.selectionEnd++;
            break;
        }
        case "ENTER": {
            field.setRangeText("\n");
            field.selectionStart++;
            field.selectionEnd++;
            break;
        }
        case "": {
            field.setRangeText(" ");
            field.selectionStart++;
            field.selectionEnd++;
            break;
        }
        case "CAPSLOCK": {
            if (key.dataset.on === 'false') {
                document.querySelector(".keyboard").innerHTML = "";
                generateKeyboard(true, false);
            }
            else {
                document.querySelector(".keyboard").innerHTML = "";
                generateKeyboard(false, false);
            }
            break;
        }
        case "SHIFT": {
            let cap = document.querySelector(".caps").dataset.on !== "false";
            document.querySelector(".keyboard").innerHTML = "";
            generateKeyboard(cap, true);
            break;
        }
        case "DEL": {
            if (field.selectionStart === field.selectionEnd) {
                field.setSelectionRange(field.selectionStart, ++field.selectionStart);
            }
            field.setRangeText("");
            break;
        }
        case "BACKSPACE": {
            if (field.selectionStart === field.selectionEnd) {
                field.setSelectionRange(--field.selectionStart, field.selectionEnd);
            }
            field.setRangeText("");
        }
    }
    field = document.querySelector(".field");
    field.focus();
    //////////////////////////////////////////
    if (key.className.includes("arrow-up")) {
        if (field.value.lastIndexOf("\n", field.selectionStart) === -1) {
            field.selectionStart = 0;
        } else {
            field.selectionStart = field.value.lastIndexOf("\n", field.selectionStart);
        }
        field.selectionEnd = field.selectionStart;
    }
    if (key.className.includes("arrow-down")) {
        if (field.value.indexOf("\n", field.selectionStart) === -1) {
            field.selectionStart = field.value.length;
        } else {
            field.selectionStart = field.value.indexOf("\n", field.selectionStart) + 1;
        }
        field.selectionEnd = field.selectionStart;
    }
    if (key.className.includes("arrow-left")) {
        field.selectionStart = field.selectionStart - 1;
        field.selectionStart = (field.selectionStart < 0) ? 0 : field.selectionStart;
        field.selectionEnd = field.selectionStart;
    }
    if (key.className.includes("arrow-right")) {
        field.selectionStart = (++field.selectionStart > field.value.length) ? field.value.length : field.selectionStart;
        field.selectionEnd = field.selectionStart;
    }
    field.focus();
}

function shiftKeyUp() {
    let cap = document.querySelector(".caps").dataset.on !== "false";
    document.querySelector(".keyboard").innerHTML = "";
    generateKeyboard(cap, false);
}

function changeLanguage() {
    let cap = document.querySelector(".caps").dataset.on !== "false";
    let lang = document.querySelector(".keyboard").dataset.lang === "en";
    document.querySelector(".keyboard").innerHTML = "";
    generateKeyboard(cap, false, (lang) ? "ru" : "en");
    document.querySelector(".keyboard").dataset.lang = (lang) ? "ru" : "en";
    localStorage.setItem('lang', (lang) ? "ru" : "en");
}

//listeners

window.addEventListener("DOMContentLoaded", init);

window.addEventListener('keydown', (ev) => {
    let field = document.querySelector(".field");
    let targetSymb = ev.key;
    const virtualKey = Array.from(document.querySelectorAll(".keyboard input")).filter((e) => e.value === targetSymb);
    if (virtualKey[0]) {
        virtualKey[0].classList.add("active-key");
        setTimeout(function () { virtualKey[0].classList.remove("active-key"); }, 150);
    }
    field.focus();

    switch (targetSymb.toUpperCase()) {
        case "CAPSLOCK": {
            if (document.querySelector(".caps").dataset.on === 'false') {
                document.querySelector(".keyboard").innerHTML = "";
                generateKeyboard(true, false);
            }
            else {
                document.querySelector(".keyboard").innerHTML = "";
                generateKeyboard(false, false);
            }
            break;
        }
        case "SHIFT": {
            let cap = document.querySelector(".caps").dataset.on !== "false";
            document.querySelector(".keyboard").innerHTML = "";
            generateKeyboard(cap, true);
            if (ev.code === "ShiftLeft") {
                document.querySelector(".shift").classList.add("active-key");
            } else {
                document.querySelectorAll(".shift")[1].classList.add("active-key");
            }
            break;
        }
        case "DELETE": {
            document.querySelector(".del").classList.add("active-key");
            setTimeout(function () { document.querySelector(".del").classList.remove("active-key"); }, 150);
            break;
        }
        case "BACKSPACE": {
            document.querySelector(".BS").classList.add("active-key");
            setTimeout(function () { document.querySelector(".BS").classList.remove("active-key"); }, 150);
            break;
        }
        case "TAB": {
            document.querySelector(".tab").classList.add("active-key");
            setTimeout(function () { document.querySelector(".tab").classList.remove("active-key"); }, 150);
            break;
        }
        case "META": {
            ev.preventDefault();
            document.querySelector(".win").classList.add("active-key");
            setTimeout(function () { document.querySelector(".win").classList.remove("active-key"); }, 150);
            break;
        }
        case "CONTROL": {
            if (ev.code === "ControlLeft") {
                document.querySelector(".ctrl").classList.add("active-key");
            } else {
                document.querySelectorAll(".ctrl")[1].classList.add("active-key");
            }
            setTimeout(function () { document.querySelectorAll(".ctrl").forEach((elem) => elem.classList.remove("active-key")) }, 150);
            break;
        }
        case "ALT": {
            ev.preventDefault();
            if (ev.code === "AltLeft") {
                document.querySelector(".alt").classList.add("active-key");
            } else {
                document.querySelectorAll(".alt")[1].classList.add("active-key");
            }
            setTimeout(function () { document.querySelectorAll(".alt").forEach((elem) => elem.classList.remove("active-key")) }, 150);
            break;
        }
        case "ENTER": {
            document.querySelector(".enter").classList.add("active-key");
            setTimeout(function () { document.querySelector(".enter").classList.remove("active-key"); }, 150);
            break;
        }
        case " ": {
            document.querySelector(".space").classList.add("active-key");
            setTimeout(function () { document.querySelector(".space").classList.remove("active-key"); }, 150);
            break;
        }
    }

    switch (ev.code) {
        case "ArrowUp": {
            document.querySelector(".arrow-up").classList.add("active-key");
            setTimeout(function () { document.querySelector(".arrow-up").classList.remove("active-key"); }, 150);
            break;
        }
        case "ArrowDown": {
            document.querySelector(".arrow-down").classList.add("active-key");
            setTimeout(function () { document.querySelector(".arrow-down").classList.remove("active-key"); }, 150);
            break;
        }
        case "ArrowLeft": {
            document.querySelector(".arrow-left").classList.add("active-key");
            setTimeout(function () { document.querySelector(".arrow-left").classList.remove("active-key"); }, 150);
            break;
        }
        case "ArrowRight": {
            document.querySelector(".arrow-right").classList.add("active-key");
            setTimeout(function () { document.querySelector(".arrow-right").classList.remove("active-key"); }, 150);
            break;
        }
    }


    if ((ev.code === "ControlLeft" && ev.altKey) || (ev.code === "AltLeft" && ev.ctrlKey)) {
        changeLanguage();
    }
});

window.addEventListener('keyup', (ev) => {

    if (ev.key.toUpperCase() !== "SHIFT") return;

    let cap = document.querySelector(".caps").dataset.on !== "false";
    document.querySelector(".keyboard").innerHTML = "";
    generateKeyboard(cap, false);
    document.querySelector(".shift").classList.remove("active-key");

})

