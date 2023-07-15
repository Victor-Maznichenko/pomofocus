// TABS
const tab1 = {
    id: "tab1",
    data: document.getElementById("tab1"),
    time: 1500,
    defaultTime: 1500,
    count: 1,
    updateCounter() {
        this.data.querySelector('.timer__count').innerHTML = "#" + this.count;
    }
};
const tab2 = {
    id: "tab2",
    data: document.getElementById("tab2"),
    counterEl: document.querySelector("#tab2 .timer__count"),
    time: 300,
    defaultTime: 300,
    count: 1,
    updateCounter() {
        this.data.querySelector('.timer__count').innerHTML = "#" + this.count;
    }
};
const tab3 = {
    id: "tab3",
    data: document.getElementById("tab3"),
    counterEl: document.querySelector("#tab3 .timer__count"),
    time: 900,
    defaultTime: 900,
    count: 1,
    updateCounter() {
        this.data.querySelector('.timer__count').innerHTML = "#" + this.count;
    }
};

let isTimerActive = false;
let activeTab = tab1;
const buttonStartTimer = document.getElementById("startBtn");
const buttonSkipTimer = document.getElementById("skipBtn");
const buttonsTabs = document.querySelectorAll(".timer__option");
let timeDisplay = activeTab.data.querySelector(".timer__string");


buttonsTabs.forEach((buttonsTab) => {
    buttonsTab.addEventListener('click', (event) => {
        switch (event.target.id) {
            case "btnTab1":
                setTabActive(tab1.id);
                break;
            case "btnTab2":
                setTabActive(tab2.id);
                break;
            case "btnTab3":
                setTabActive(tab3.id);
                break;
        }
    })
});


function setTabActive(id) {
    if (isTimerActive) {
        resetTimer();
    }
    activeTab.data.classList.remove('active');
    switch (id) {
        case tab1.id:
            activeTab = tab1;
            break;
        case tab2.id:
            activeTab = tab2;
            break;
        case tab3.id:
            activeTab = tab3;
            break;
    }
    activeTab.data.classList.add('active');
    timeDisplay = activeTab.data.querySelector(".timer__string");
}



// TIMER
buttonStartTimer.addEventListener('click', () => {
    buttonStartTimer.classList.add('disable');
    buttonSkipTimer.classList.add('active');

    startTimer(activeTab.time, activeTab.id);
});


let timerInterval;

function timeExpired() {
    activeTab.count++;
    activeTab.updateCounter();
    resetTimer();
    if (activeTab == tab1) {
        if ((tab1.count - 1) % 4 != 0) {
            setTabActive(tab2.id);
        } else if ((tab1.count - 1) % 4 == 0) {
            setTabActive(tab3.id)
        }
        tab2.count = tab1.count - 1;
        tab3.count = tab1.count - 1;
        tab2.updateCounter();
        tab3.updateCounter();
    } else if (activeTab == tab2) {
        setTabActive(tab1.id)
    } else if (activeTab == tab3) {
        setTabActive(tab1.id)
    }
}

function startTimer(time) {
    timerInterval = setInterval(updateTimer, 1000);
    isTimerActive = true;
    function updateTimer() {
        updateDisplayTime(time)
        if (time <= 0) {
            timeExpired();
        }

        time--;
    }
}


function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    updateDisplayTime(activeTab.time);
    buttonStartTimer.classList.remove('disable');
    buttonSkipTimer.classList.remove('active');
    isTimerActive = false;
}

buttonSkipTimer.addEventListener('click', timeExpired);


function updateDisplayTime(time) {
    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.innerText = minutes + ":" + seconds;
}


updateDisplayTime(activeTab.time);




// TODOS
const todoForm = document.querySelector('.todos__form'),
    todoInput = todoForm.querySelector('.todos__input .input-inner'),
    todoList = document.querySelector('.todos__list'),
    tasksLS = 'Tasks';
let tasks = [];

function loadTasks() {
    const tasksList = localStorage.getItem(tasksLS);
    if (tasksList !== null) {
        const parsedList = JSON.parse(tasksList)
        parsedList.forEach((task) => {
            showTodo(task.name);
        });
    }
}

function saveTodo() {
    localStorage.setItem(tasksLS, JSON.stringify(tasks));
}

function delTodo(e) {
    const li = e.target.parentNode.parentNode,
        cleanTask = tasks.filter(function (task) {
            return task.id !== parseInt(li.id);
        });
    todoList.removeChild(li);
    tasks = cleanTask;
    saveTodo();
}

function clearTodo() {
    todoList.innerHTML = '';
    tasks = [];
    saveTodo();
}

function showTodo(text) {
    const newId = tasks.length + 1,
        todoBtn = document.createElement('button');
    todoSettingsBtn = document.createElement('button');
    todoBtn.classList.add('todo__btn');
    todoBtn.innerHTML = '<img src="images/menu.png" alt="">';
    todoSettingsBtn.classList.add('todo__settings-save');
    todoSettingsBtn.innerText = 'Сохранить';
    todoHTML = `
    <li class="todos__item todo" id=${'todo-' + newId}>
        <div class="todo__settings hide">
            <div class="todo__settings-inner">
                <div class="todo__settings-item">
                    <p>Изменить текст:</p>
                    <label class="todo__input input"><input class="input-inner" type="text"
                            value="${text}" placeholder="Введите текст"></label>
                </div>
                <div class="todo__settings-item">
                    <p>Введите количество помодоро:</p>
                    <label class="todo__input-nubmer input-nubmer">
                        <input class="todo__pomo-time input-nubmer__inner" value="1" type="number">
                        <button class="input-nubmer__plus" type="button">+</button>
                        <button class="input-nubmer__minus" type="button">-</button>
                    </label>
                </div>
            </div>
        </div>
        <div class="todo__main">
            <div class="todo__checkbox checkbox">
                <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" />
                    <path d="M34.8732 11.1239L25.7798 36.2608C25.5067 37.0157 24.5003 37.1573 24.0295 36.5071L16.8731 26.6239" stroke="white" stroke-width="3" />
                </svg>
            </div>
            <div class="todo__text">${text}</div>
        </div>
    </li>`;
    todoList.insertAdjacentHTML('afterbegin', todoHTML)
    todoList.children[0].append(todoBtn);
    todoList.children[0].children[0].append(todoSettingsBtn);
    // const delBtn = document.createElement('button');
    // clearAll = document.querySelector('.todos__clear'),
    // delBtn.classList.add('footer__todo-close')
    // delBtn.innerHTML = '<div class="close"></div>';
    const todoObj = {
        name: text,
        id: newId
    };
    tasks.push(todoObj);
    saveTodo();
    inputNum();
    todoBtn.addEventListener('click', toggleSettings);
    todoSettingsBtn.addEventListener('click', saveSettings);
    // delBtn.addEventListener('click', delTodo);
    // clearAll.addEventListener('click', clearTodo);
}

function submitHangler(e) {
    e.preventDefault();
    const currentValue = todoInput.value;
    showTodo(currentValue);
    todoInput.value = '';
}

function toggleSettings(e) {
    btn = e.target;
    todoSettings = btn.parentNode.children[0];
    todoMain = btn.parentNode.children[1];
    btn.classList.toggle('hide');
    todoMain.classList.toggle('hide');
    todoSettings.classList.toggle('hide');
}

function saveSettings(e) {
    saveBtn = e.target;
    todoSettings = saveBtn.parentNode;
    todoMain = saveBtn.parentNode.parentNode.children[1];
    todoBtn = saveBtn.parentNode.parentNode.children[2];
    todoMain.classList.toggle('hide');
    todoBtn.classList.toggle('hide');
    todoSettings.classList.toggle('hide');
}

function init() {
    loadTasks();
    todoForm.addEventListener('submit', submitHangler);
    todoSettingsBtn = document.querySelectorAll('.todo__btn');
}
init();




// input-number
function inputNum() {
    const inputNums = document.querySelectorAll('.input-nubmer');
    inputNums.forEach((el) => {
        const plus = el.querySelector('.input-nubmer__plus'),
            minus = el.querySelector('.input-nubmer__minus'),
            input = el.querySelector('.input-nubmer__inner');
        let count = input.value;
        plus.addEventListener('click', () => {
            ++count
            input.value = input.value < 0 ? 0 : count;
            updatePomodos(count);
        })
        minus.addEventListener('click', () => {
            count > 1 ? --count : count;
            input.value = input.value < 0 ? 0 : count;
            updatePomodos(count);
        })
    });
}

function updatePomodos(count) {
    tab1.time = tab1.defaultTime * count;
    updateDisplayTime(tab1.time);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRBQlNcbmNvbnN0IHRhYjEgPSB7XG4gICAgaWQ6IFwidGFiMVwiLFxuICAgIGRhdGE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFiMVwiKSxcbiAgICB0aW1lOiAxNTAwLFxuICAgIGRlZmF1bHRUaW1lOiAxNTAwLFxuICAgIGNvdW50OiAxLFxuICAgIHVwZGF0ZUNvdW50ZXIoKSB7XG4gICAgICAgIHRoaXMuZGF0YS5xdWVyeVNlbGVjdG9yKCcudGltZXJfX2NvdW50JykuaW5uZXJIVE1MID0gXCIjXCIgKyB0aGlzLmNvdW50O1xuICAgIH1cbn07XG5jb25zdCB0YWIyID0ge1xuICAgIGlkOiBcInRhYjJcIixcbiAgICBkYXRhOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYjJcIiksXG4gICAgY291bnRlckVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RhYjIgLnRpbWVyX19jb3VudFwiKSxcbiAgICB0aW1lOiAzMDAsXG4gICAgZGVmYXVsdFRpbWU6IDMwMCxcbiAgICBjb3VudDogMSxcbiAgICB1cGRhdGVDb3VudGVyKCkge1xuICAgICAgICB0aGlzLmRhdGEucXVlcnlTZWxlY3RvcignLnRpbWVyX19jb3VudCcpLmlubmVySFRNTCA9IFwiI1wiICsgdGhpcy5jb3VudDtcbiAgICB9XG59O1xuY29uc3QgdGFiMyA9IHtcbiAgICBpZDogXCJ0YWIzXCIsXG4gICAgZGF0YTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YWIzXCIpLFxuICAgIGNvdW50ZXJFbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YWIzIC50aW1lcl9fY291bnRcIiksXG4gICAgdGltZTogOTAwLFxuICAgIGRlZmF1bHRUaW1lOiA5MDAsXG4gICAgY291bnQ6IDEsXG4gICAgdXBkYXRlQ291bnRlcigpIHtcbiAgICAgICAgdGhpcy5kYXRhLnF1ZXJ5U2VsZWN0b3IoJy50aW1lcl9fY291bnQnKS5pbm5lckhUTUwgPSBcIiNcIiArIHRoaXMuY291bnQ7XG4gICAgfVxufTtcblxubGV0IGlzVGltZXJBY3RpdmUgPSBmYWxzZTtcbmxldCBhY3RpdmVUYWIgPSB0YWIxO1xuY29uc3QgYnV0dG9uU3RhcnRUaW1lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRCdG5cIik7XG5jb25zdCBidXR0b25Ta2lwVGltZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraXBCdG5cIik7XG5jb25zdCBidXR0b25zVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGltZXJfX29wdGlvblwiKTtcbmxldCB0aW1lRGlzcGxheSA9IGFjdGl2ZVRhYi5kYXRhLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3N0cmluZ1wiKTtcblxuXG5idXR0b25zVGFicy5mb3JFYWNoKChidXR0b25zVGFiKSA9PiB7XG4gICAgYnV0dG9uc1RhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5pZCkge1xuICAgICAgICAgICAgY2FzZSBcImJ0blRhYjFcIjpcbiAgICAgICAgICAgICAgICBzZXRUYWJBY3RpdmUodGFiMS5pZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYnRuVGFiMlwiOlxuICAgICAgICAgICAgICAgIHNldFRhYkFjdGl2ZSh0YWIyLmlkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJidG5UYWIzXCI6XG4gICAgICAgICAgICAgICAgc2V0VGFiQWN0aXZlKHRhYjMuaWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSlcbn0pO1xuXG5cbmZ1bmN0aW9uIHNldFRhYkFjdGl2ZShpZCkge1xuICAgIGlmIChpc1RpbWVyQWN0aXZlKSB7XG4gICAgICAgIHJlc2V0VGltZXIoKTtcbiAgICB9XG4gICAgYWN0aXZlVGFiLmRhdGEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgc3dpdGNoIChpZCkge1xuICAgICAgICBjYXNlIHRhYjEuaWQ6XG4gICAgICAgICAgICBhY3RpdmVUYWIgPSB0YWIxO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGFiMi5pZDpcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9IHRhYjI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0YWIzLmlkOlxuICAgICAgICAgICAgYWN0aXZlVGFiID0gdGFiMztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBhY3RpdmVUYWIuZGF0YS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB0aW1lRGlzcGxheSA9IGFjdGl2ZVRhYi5kYXRhLnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3N0cmluZ1wiKTtcbn1cblxuXG5cbi8vIFRJTUVSXG5idXR0b25TdGFydFRpbWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGJ1dHRvblN0YXJ0VGltZXIuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZScpO1xuICAgIGJ1dHRvblNraXBUaW1lci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICAgIHN0YXJ0VGltZXIoYWN0aXZlVGFiLnRpbWUsIGFjdGl2ZVRhYi5pZCk7XG59KTtcblxuXG5sZXQgdGltZXJJbnRlcnZhbDtcblxuZnVuY3Rpb24gdGltZUV4cGlyZWQoKSB7XG4gICAgYWN0aXZlVGFiLmNvdW50Kys7XG4gICAgYWN0aXZlVGFiLnVwZGF0ZUNvdW50ZXIoKTtcbiAgICByZXNldFRpbWVyKCk7XG4gICAgaWYgKGFjdGl2ZVRhYiA9PSB0YWIxKSB7XG4gICAgICAgIGlmICgodGFiMS5jb3VudCAtIDEpICUgNCAhPSAwKSB7XG4gICAgICAgICAgICBzZXRUYWJBY3RpdmUodGFiMi5pZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHRhYjEuY291bnQgLSAxKSAlIDQgPT0gMCkge1xuICAgICAgICAgICAgc2V0VGFiQWN0aXZlKHRhYjMuaWQpXG4gICAgICAgIH1cbiAgICAgICAgdGFiMi5jb3VudCA9IHRhYjEuY291bnQgLSAxO1xuICAgICAgICB0YWIzLmNvdW50ID0gdGFiMS5jb3VudCAtIDE7XG4gICAgICAgIHRhYjIudXBkYXRlQ291bnRlcigpO1xuICAgICAgICB0YWIzLnVwZGF0ZUNvdW50ZXIoKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZVRhYiA9PSB0YWIyKSB7XG4gICAgICAgIHNldFRhYkFjdGl2ZSh0YWIxLmlkKVxuICAgIH0gZWxzZSBpZiAoYWN0aXZlVGFiID09IHRhYjMpIHtcbiAgICAgICAgc2V0VGFiQWN0aXZlKHRhYjEuaWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdGFydFRpbWVyKHRpbWUpIHtcbiAgICB0aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwodXBkYXRlVGltZXIsIDEwMDApO1xuICAgIGlzVGltZXJBY3RpdmUgPSB0cnVlO1xuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xuICAgICAgICB1cGRhdGVEaXNwbGF5VGltZSh0aW1lKVxuICAgICAgICBpZiAodGltZSA8PSAwKSB7XG4gICAgICAgICAgICB0aW1lRXhwaXJlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZS0tO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBwYXVzZVRpbWVyKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcbiAgICB1cGRhdGVEaXNwbGF5VGltZShhY3RpdmVUYWIudGltZSk7XG4gICAgYnV0dG9uU3RhcnRUaW1lci5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlJyk7XG4gICAgYnV0dG9uU2tpcFRpbWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGlzVGltZXJBY3RpdmUgPSBmYWxzZTtcbn1cblxuYnV0dG9uU2tpcFRpbWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGltZUV4cGlyZWQpO1xuXG5cbmZ1bmN0aW9uIHVwZGF0ZURpc3BsYXlUaW1lKHRpbWUpIHtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IodGltZSAvIDYwKTtcbiAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gXCIwXCIgKyBtaW51dGVzIDogbWludXRlcztcblxuICAgIGxldCBzZWNvbmRzID0gdGltZSAlIDYwO1xuICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMTAgPyBcIjBcIiArIHNlY29uZHMgOiBzZWNvbmRzO1xuXG4gICAgdGltZURpc3BsYXkuaW5uZXJUZXh0ID0gbWludXRlcyArIFwiOlwiICsgc2Vjb25kcztcbn1cblxuXG51cGRhdGVEaXNwbGF5VGltZShhY3RpdmVUYWIudGltZSk7XG5cblxuXG5cbi8vIFRPRE9TXG5jb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvc19fZm9ybScpLFxuICAgIHRvZG9JbnB1dCA9IHRvZG9Gb3JtLnF1ZXJ5U2VsZWN0b3IoJy50b2Rvc19faW5wdXQgLmlucHV0LWlubmVyJyksXG4gICAgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kb3NfX2xpc3QnKSxcbiAgICB0YXNrc0xTID0gJ1Rhc2tzJztcbmxldCB0YXNrcyA9IFtdO1xuXG5mdW5jdGlvbiBsb2FkVGFza3MoKSB7XG4gICAgY29uc3QgdGFza3NMaXN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGFza3NMUyk7XG4gICAgaWYgKHRhc2tzTGlzdCAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBwYXJzZWRMaXN0ID0gSlNPTi5wYXJzZSh0YXNrc0xpc3QpXG4gICAgICAgIHBhcnNlZExpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgICAgc2hvd1RvZG8odGFzay5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzYXZlVG9kbygpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YXNrc0xTLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xufVxuXG5mdW5jdGlvbiBkZWxUb2RvKGUpIHtcbiAgICBjb25zdCBsaSA9IGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgY2xlYW5UYXNrID0gdGFza3MuZmlsdGVyKGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICByZXR1cm4gdGFzay5pZCAhPT0gcGFyc2VJbnQobGkuaWQpO1xuICAgICAgICB9KTtcbiAgICB0b2RvTGlzdC5yZW1vdmVDaGlsZChsaSk7XG4gICAgdGFza3MgPSBjbGVhblRhc2s7XG4gICAgc2F2ZVRvZG8oKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJUb2RvKCkge1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIHRhc2tzID0gW107XG4gICAgc2F2ZVRvZG8oKTtcbn1cblxuZnVuY3Rpb24gc2hvd1RvZG8odGV4dCkge1xuICAgIGNvbnN0IG5ld0lkID0gdGFza3MubGVuZ3RoICsgMSxcbiAgICAgICAgdG9kb0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRvZG9TZXR0aW5nc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRvZG9CdG4uY2xhc3NMaXN0LmFkZCgndG9kb19fYnRuJyk7XG4gICAgdG9kb0J0bi5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIuLi9pbWFnZXMvbWVudS5wbmdcIiBhbHQ9XCJcIj4nO1xuICAgIHRvZG9TZXR0aW5nc0J0bi5jbGFzc0xpc3QuYWRkKCd0b2RvX19zZXR0aW5ncy1zYXZlJyk7XG4gICAgdG9kb1NldHRpbmdzQnRuLmlubmVyVGV4dCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnO1xuICAgIHRvZG9IVE1MID0gYFxuICAgIDxsaSBjbGFzcz1cInRvZG9zX19pdGVtIHRvZG9cIiBpZD0keyd0b2RvLScgKyBuZXdJZH0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvX19zZXR0aW5ncyBoaWRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fc2V0dGluZ3MtaW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fc2V0dGluZ3MtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD7QmNC30LzQtdC90LjRgtGMINGC0LXQutGB0YI6PC9wPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0b2RvX19pbnB1dCBpbnB1dFwiPjxpbnB1dCBjbGFzcz1cImlucHV0LWlubmVyXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPVwiJHt0ZXh0fVwiIHBsYWNlaG9sZGVyPVwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRglwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZG9fX3NldHRpbmdzLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+0JLQstC10LTQuNGC0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0L/QvtC80L7QtNC+0YDQvjo8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cInRvZG9fX2lucHV0LW51Ym1lciBpbnB1dC1udWJtZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRvZG9fX3BvbW8tdGltZSBpbnB1dC1udWJtZXJfX2lubmVyXCIgdmFsdWU9XCIxXCIgdHlwZT1cIm51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImlucHV0LW51Ym1lcl9fcGx1c1wiIHR5cGU9XCJidXR0b25cIj4rPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaW5wdXQtbnVibWVyX19taW51c1wiIHR5cGU9XCJidXR0b25cIj4tPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvX19tYWluXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fY2hlY2tib3ggY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIyNVwiIGN5PVwiMjVcIiByPVwiMjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0zNC44NzMyIDExLjEyMzlMMjUuNzc5OCAzNi4yNjA4QzI1LjUwNjcgMzcuMDE1NyAyNC41MDAzIDM3LjE1NzMgMjQuMDI5NSAzNi41MDcxTDE2Ljg3MzEgMjYuNjIzOVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjNcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fdGV4dFwiPiR7dGV4dH08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9saT5gO1xuICAgIHRvZG9MaXN0Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHRvZG9IVE1MKVxuICAgIHRvZG9MaXN0LmNoaWxkcmVuWzBdLmFwcGVuZCh0b2RvQnRuKTtcbiAgICB0b2RvTGlzdC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hcHBlbmQodG9kb1NldHRpbmdzQnRuKTtcbiAgICAvLyBjb25zdCBkZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAvLyBjbGVhckFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2Rvc19fY2xlYXInKSxcbiAgICAvLyBkZWxCdG4uY2xhc3NMaXN0LmFkZCgnZm9vdGVyX190b2RvLWNsb3NlJylcbiAgICAvLyBkZWxCdG4uaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJjbG9zZVwiPjwvZGl2Pic7XG4gICAgY29uc3QgdG9kb09iaiA9IHtcbiAgICAgICAgbmFtZTogdGV4dCxcbiAgICAgICAgaWQ6IG5ld0lkXG4gICAgfTtcbiAgICB0YXNrcy5wdXNoKHRvZG9PYmopO1xuICAgIHNhdmVUb2RvKCk7XG4gICAgaW5wdXROdW0oKTtcbiAgICB0b2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2V0dGluZ3MpO1xuICAgIHRvZG9TZXR0aW5nc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNhdmVTZXR0aW5ncyk7XG4gICAgLy8gZGVsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsVG9kbyk7XG4gICAgLy8gY2xlYXJBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhclRvZG8pO1xufVxuXG5mdW5jdGlvbiBzdWJtaXRIYW5nbGVyKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdG9kb0lucHV0LnZhbHVlO1xuICAgIHNob3dUb2RvKGN1cnJlbnRWYWx1ZSk7XG4gICAgdG9kb0lucHV0LnZhbHVlID0gJyc7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNldHRpbmdzKGUpIHtcbiAgICBidG4gPSBlLnRhcmdldDtcbiAgICB0b2RvU2V0dGluZ3MgPSBidG4ucGFyZW50Tm9kZS5jaGlsZHJlblswXTtcbiAgICB0b2RvTWFpbiA9IGJ0bi5wYXJlbnROb2RlLmNoaWxkcmVuWzFdO1xuICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgdG9kb01haW4uY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgIHRvZG9TZXR0aW5ncy5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG59XG5cbmZ1bmN0aW9uIHNhdmVTZXR0aW5ncyhlKSB7XG4gICAgc2F2ZUJ0biA9IGUudGFyZ2V0O1xuICAgIHRvZG9TZXR0aW5ncyA9IHNhdmVCdG4ucGFyZW50Tm9kZTtcbiAgICB0b2RvTWFpbiA9IHNhdmVCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuWzFdO1xuICAgIHRvZG9CdG4gPSBzYXZlQnRuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlblsyXTtcbiAgICB0b2RvTWFpbi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgdG9kb0J0bi5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgdG9kb1NldHRpbmdzLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGUnKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsb2FkVGFza3MoKTtcbiAgICB0b2RvRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdWJtaXRIYW5nbGVyKTtcbiAgICB0b2RvU2V0dGluZ3NCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kb19fYnRuJyk7XG59XG5pbml0KCk7XG5cblxuXG5cbi8vIGlucHV0LW51bWJlclxuZnVuY3Rpb24gaW5wdXROdW0oKSB7XG4gICAgY29uc3QgaW5wdXROdW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LW51Ym1lcicpO1xuICAgIGlucHV0TnVtcy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBwbHVzID0gZWwucXVlcnlTZWxlY3RvcignLmlucHV0LW51Ym1lcl9fcGx1cycpLFxuICAgICAgICAgICAgbWludXMgPSBlbC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtbnVibWVyX19taW51cycpLFxuICAgICAgICAgICAgaW5wdXQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtbnVibWVyX19pbm5lcicpO1xuICAgICAgICBsZXQgY291bnQgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgcGx1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICsrY291bnRcbiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaW5wdXQudmFsdWUgPCAwID8gMCA6IGNvdW50O1xuICAgICAgICAgICAgdXBkYXRlUG9tb2Rvcyhjb3VudCk7XG4gICAgICAgIH0pXG4gICAgICAgIG1pbnVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY291bnQgPiAxID8gLS1jb3VudCA6IGNvdW50O1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBpbnB1dC52YWx1ZSA8IDAgPyAwIDogY291bnQ7XG4gICAgICAgICAgICB1cGRhdGVQb21vZG9zKGNvdW50KTtcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUG9tb2Rvcyhjb3VudCkge1xuICAgIHRhYjEudGltZSA9IHRhYjEuZGVmYXVsdFRpbWUgKiBjb3VudDtcbiAgICB1cGRhdGVEaXNwbGF5VGltZSh0YWIxLnRpbWUpO1xufSJdLCJmaWxlIjoibWFpbi5qcyJ9
