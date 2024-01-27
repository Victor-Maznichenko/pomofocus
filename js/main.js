class Tab {
	constructor(id, defaultTime) {
		this.id = id;
		this.data = document.getElementById(this.id);
		this.counterEl = document.querySelector(`#${this.id} .timer__count`);
		this.defaultTime = defaultTime;
		this.time = defaultTime;
		this.count = 1;
	}
	updateCounter() {
		this.data.querySelector(".timer__count").innerHTML = "#" + this.count;
	}
}

// TABS
const tab1 = new Tab("tab1", 1500);
const tab2 = new Tab("tab2", 300);
const tab3 = new Tab("tab3", 900);

let isTimerActive = false;
let activeTab = tab1;
const buttonStartTimer = document.getElementById("startBtn");
const buttonSkipTimer = document.getElementById("skipBtn");
const buttonsTabs = document.querySelectorAll(".timer__option");
let timeDisplay = activeTab.data.querySelector(".timer__string");

buttonsTabs.forEach(buttonsTab => {
	buttonsTab.addEventListener("click", event => {
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
	});
});

function setTabActive(id) {
	console.log(id);
	if (isTimerActive) {
		resetTimer();
	}
	activeTab.data.classList.remove("active");
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
	activeTab.data.classList.add("active");
	timeDisplay = activeTab.data.querySelector(".timer__string");
}

// TIMER
buttonStartTimer.addEventListener("click", () => {
	buttonStartTimer.classList.add("disable");
	buttonSkipTimer.classList.add("active");

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
			setTabActive(tab3.id);
		}
		tab2.count = tab1.count - 1;
		tab3.count = tab1.count - 1;
		tab2.updateCounter();
		tab3.updateCounter();
	} else if (activeTab == tab2) {
		setTabActive(tab1.id);
	} else if (activeTab == tab3) {
		setTabActive(tab1.id);
	}
}

function startTimer(time) {
	timerInterval = setInterval(updateTimer, 1000);
	isTimerActive = true;
	function updateTimer() {
		updateDisplayTime(time);
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
	buttonStartTimer.classList.remove("disable");
	buttonSkipTimer.classList.remove("active");
	isTimerActive = false;
}

buttonSkipTimer.addEventListener("click", timeExpired);

function updateDisplayTime(time) {
	let minutes = Math.floor(time / 60);
	minutes = minutes < 10 ? "0" + minutes : minutes;

	let seconds = time % 60;
	seconds = seconds < 10 ? "0" + seconds : seconds;

	timeDisplay.innerText = minutes + ":" + seconds;
}

updateDisplayTime(activeTab.time);

// TODOS
const todoForm = document.querySelector(".todos__form"),
	todoInput = todoForm.querySelector(".todos__input .input-inner"),
	todoList = document.querySelector(".todos__list"),
	tasksLS = "Tasks";
let tasks = [];

function loadTasks() {
	const tasksList = localStorage.getItem(tasksLS);
	if (tasksList !== null) {
		const parsedList = JSON.parse(tasksList);
		parsedList.forEach(task => {
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
	todoList.innerHTML = "";
	tasks = [];
	saveTodo();
}

function showTodo(text) {
	const newId = tasks.length + 1,
		todoBtn = document.createElement("button");
	todoSettingsBtn = document.createElement("button");
	todoBtn.classList.add("todo__btn");
	todoBtn.innerHTML = '<img src="../images/menu.png" alt="">';
	todoSettingsBtn.classList.add("todo__settings-save");
	todoSettingsBtn.innerText = "Сохранить";
	todoHTML = `
    <li class="todos__item todo" id=${"todo-" + newId}>
        <div class="todo__settings hide">
            <div class="todo__settings-inner">
                <div class="todo__settings-item">
                    <p>Изменить текст:</p>
                    <label class="todo__input input">
                    <input class="input-inner" type="text" name="changeTodo" value="${text}" placeholder="Введите текст"></label>
                </div>
                <div class="todo__settings-item">
                    <p>Введите количество помодоро:</p>
                    <label class="todo__input-nubmer input-nubmer">
                        <input class="todo__pomo-time input-nubmer__inner" name="time" value="1" type="number">
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
                    <path
                        d="M34.8732 11.1239L25.7798 36.2608C25.5067 37.0157 24.5003 37.1573 24.0295 36.5071L16.8731 26.6239"
                        stroke="white" stroke-width="3" />
                </svg>
            </div>
            <div class="todo__text">${text}</div>
        </div>
    </li>`;
	todoList.insertAdjacentHTML("afterbegin", todoHTML);
	todoList.children[0].append(todoBtn);
	todoList.children[0].children[0].append(todoSettingsBtn);
	// const delBtn = document.createElement('button');
	// clearAll = document.querySelector('.todos__clear'),
	// delBtn.classList.add('footer__todo-close')
	// delBtn.innerHTML = '<div class="close"></div>';
	const todoObj = {
		name: text,
		id: newId,
	};
	tasks.push(todoObj);
	saveTodo();
	inputNum();
	todoBtn.addEventListener("click", toggleSettings);
	todoSettingsBtn.addEventListener("click", saveSettings);
	// delBtn.addEventListener('click', delTodo);
	// clearAll.addEventListener('click', clearTodo);
}

function submitHangler(e) {
	e.preventDefault();
	const currentValue = todoInput.value;
	showTodo(currentValue);
	todoInput.value = "";
}

function toggleSettings(e) {
	btn = e.target;
	todoSettings = btn.parentNode.children[0];
	todoMain = btn.parentNode.children[1];
	btn.classList.toggle("hide");
	todoMain.classList.toggle("hide");
	todoSettings.classList.toggle("hide");
}

function saveSettings(e) {
	saveBtn = e.target;
	todoSettings = saveBtn.parentNode;
	todoMain = saveBtn.parentNode.parentNode.children[1];
	todoBtn = saveBtn.parentNode.parentNode.children[2];
	todoMain.classList.toggle("hide");
	todoBtn.classList.toggle("hide");
	todoSettings.classList.toggle("hide");
}

function init() {
	loadTasks();
	todoForm.addEventListener("submit", submitHangler);
	todoSettingsBtn = document.querySelectorAll(".todo__btn");
}
init();

// input-number
function inputNum() {
	const inputNums = document.querySelectorAll(".input-nubmer");
	inputNums.forEach(el => {
		const plus = el.querySelector(".input-nubmer__plus"),
			minus = el.querySelector(".input-nubmer__minus"),
			input = el.querySelector(".input-nubmer__inner");
		let count = input.value;

		plus.addEventListener("click", () => {
			++count;
			input.value = input.value < 0 ? 0 : count;
			updatePomodos(count);
		});

		minus.addEventListener("click", () => {
			count > 1 ? --count : count;
			input.value = input.value < 0 ? 0 : count;
			updatePomodos(count);
		});
	});
}

function updatePomodos(count) {
	tab1.time = tab1.defaultTime * count;
	updateDisplayTime(tab1.time);
}
