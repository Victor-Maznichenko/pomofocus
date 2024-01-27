"use strict";

// Initialize tabs
class Tab {
	constructor(id, time) {
		this.id = id;
		this.HTMLElement = document.getElementById("tab1");
		this.counterEl = document.querySelector(`#${this.id} .timer__count`);
		this.time = time;
		this.defaultTime = time;
		this.count = 1;
	}
	updateCounter() {
		this.HTMLElement.querySelector(".timer__count").innerHTML = "#" + this.count;
	}
}
const tab1 = new Tab("tab1", 1500);
const tab2 = new Tab("tab2", 300);
const tab3 = new Tab("tab3", 900);

let isTimerActive = false;
let activeTab = tab1;
const buttonStartTimer = document.getElementById("startBtn");
const buttonSkipTimer = document.getElementById("skipBtn");
const buttonsTabs = document.querySelectorAll(".timer__option");
let timeDisplay = activeTab.HTMLElement.querySelector(".timer__string");

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
	if (isTimerActive) {
		resetTimer();
	}
	activeTab.HTMLElement.classList.remove("active");
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
	activeTab.HTMLElement.classList.add("active");
	timeDisplay = activeTab.HTMLElement.querySelector(".timer__string");
}

// Timer
buttonStartTimer.addEventListener("click", () => {
	buttonStartTimer.classList.add("disable");
	buttonSkipTimer.classList.add("active");

	startTimer(activeTab.time, activeTab.id);
});

let timerInterval;

function timeExpired() {
	++activeTab.count;
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
	let todoSettingsBtn = document.createElement("button");
	todoBtn.classList.add("todo__btn");
	todoBtn.innerHTML = '<img src="../images/menu.png" alt="">';
	todoSettingsBtn.classList.add("todo__settings-save");
	todoSettingsBtn.innerText = "Сохранить";
	let todoHTML = `
    <li class="todos__item todo" id=${"todo-" + newId}>
        <div class="todo__settings hide">
            <div class="todo__settings-inner">
                <div class="todo__settings-item">
                    <p>Изменить текст:</p>
                    <label class="todo__input input">
                    <input class="input-inner" type="text" name="changeInput"
                    value="${text}" placeholder="Введите текст"></label>
                </div>
                <div class="todo__settings-item">
                    <p>Введите количество помодоро:</p>
                    <label class="todo__input-nubmer input-nubmer">
                        <input class="todo__pomo-time input-nubmer__inner" name="countPomo" value="1" type="number">
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
	const btn = e.target;
	const todoSettings = btn.parentNode.children[0];
	const todoMain = btn.parentNode.children[1];
	btn.classList.toggle("hide");
	todoMain.classList.toggle("hide");
	todoSettings.classList.toggle("hide");
}

function saveSettings(e) {
	const saveBtn = e.target;
	const todoSettings = saveBtn.parentNode;
	const todoMain = saveBtn.parentNode.parentNode.children[1];
	const todoBtn = saveBtn.parentNode.parentNode.children[2];
	todoMain.classList.toggle("hide");
	todoBtn.classList.toggle("hide");
	todoSettings.classList.toggle("hide");
}

function init() {
	loadTasks();
	todoForm.addEventListener("submit", submitHangler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vLyBJbml0aWFsaXplIHRhYnNcbmNsYXNzIFRhYiB7XG5cdGNvbnN0cnVjdG9yKGlkLCB0aW1lKSB7XG5cdFx0dGhpcy5pZCA9IGlkO1xuXHRcdHRoaXMuSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhYjFcIik7XG5cdFx0dGhpcy5jb3VudGVyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLmlkfSAudGltZXJfX2NvdW50YCk7XG5cdFx0dGhpcy50aW1lID0gdGltZTtcblx0XHR0aGlzLmRlZmF1bHRUaW1lID0gdGltZTtcblx0XHR0aGlzLmNvdW50ID0gMTtcblx0fVxuXHR1cGRhdGVDb3VudGVyKCkge1xuXHRcdHRoaXMuSFRNTEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fY291bnRcIikuaW5uZXJIVE1MID0gXCIjXCIgKyB0aGlzLmNvdW50O1xuXHR9XG59XG5jb25zdCB0YWIxID0gbmV3IFRhYihcInRhYjFcIiwgMTUwMCk7XG5jb25zdCB0YWIyID0gbmV3IFRhYihcInRhYjJcIiwgMzAwKTtcbmNvbnN0IHRhYjMgPSBuZXcgVGFiKFwidGFiM1wiLCA5MDApO1xuXG5sZXQgaXNUaW1lckFjdGl2ZSA9IGZhbHNlO1xubGV0IGFjdGl2ZVRhYiA9IHRhYjE7XG5jb25zdCBidXR0b25TdGFydFRpbWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ0blwiKTtcbmNvbnN0IGJ1dHRvblNraXBUaW1lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2tpcEJ0blwiKTtcbmNvbnN0IGJ1dHRvbnNUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50aW1lcl9fb3B0aW9uXCIpO1xubGV0IHRpbWVEaXNwbGF5ID0gYWN0aXZlVGFiLkhUTUxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZXJfX3N0cmluZ1wiKTtcblxuYnV0dG9uc1RhYnMuZm9yRWFjaChidXR0b25zVGFiID0+IHtcblx0YnV0dG9uc1RhYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4ge1xuXHRcdHN3aXRjaCAoZXZlbnQudGFyZ2V0LmlkKSB7XG5cdFx0XHRjYXNlIFwiYnRuVGFiMVwiOlxuXHRcdFx0XHRzZXRUYWJBY3RpdmUodGFiMS5pZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImJ0blRhYjJcIjpcblx0XHRcdFx0c2V0VGFiQWN0aXZlKHRhYjIuaWQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJidG5UYWIzXCI6XG5cdFx0XHRcdHNldFRhYkFjdGl2ZSh0YWIzLmlkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9KTtcbn0pO1xuXG5mdW5jdGlvbiBzZXRUYWJBY3RpdmUoaWQpIHtcblx0aWYgKGlzVGltZXJBY3RpdmUpIHtcblx0XHRyZXNldFRpbWVyKCk7XG5cdH1cblx0YWN0aXZlVGFiLkhUTUxFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cdHN3aXRjaCAoaWQpIHtcblx0XHRjYXNlIHRhYjEuaWQ6XG5cdFx0XHRhY3RpdmVUYWIgPSB0YWIxO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSB0YWIyLmlkOlxuXHRcdFx0YWN0aXZlVGFiID0gdGFiMjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgdGFiMy5pZDpcblx0XHRcdGFjdGl2ZVRhYiA9IHRhYjM7XG5cdFx0XHRicmVhaztcblx0fVxuXHRhY3RpdmVUYWIuSFRNTEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblx0dGltZURpc3BsYXkgPSBhY3RpdmVUYWIuSFRNTEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lcl9fc3RyaW5nXCIpO1xufVxuXG4vLyBUaW1lclxuYnV0dG9uU3RhcnRUaW1lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRidXR0b25TdGFydFRpbWVyLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlXCIpO1xuXHRidXR0b25Ta2lwVGltZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuXHRzdGFydFRpbWVyKGFjdGl2ZVRhYi50aW1lLCBhY3RpdmVUYWIuaWQpO1xufSk7XG5cbmxldCB0aW1lckludGVydmFsO1xuXG5mdW5jdGlvbiB0aW1lRXhwaXJlZCgpIHtcblx0KythY3RpdmVUYWIuY291bnQ7XG5cdGFjdGl2ZVRhYi51cGRhdGVDb3VudGVyKCk7XG5cdHJlc2V0VGltZXIoKTtcblx0aWYgKGFjdGl2ZVRhYiA9PSB0YWIxKSB7XG5cdFx0aWYgKCh0YWIxLmNvdW50IC0gMSkgJSA0ICE9IDApIHtcblx0XHRcdHNldFRhYkFjdGl2ZSh0YWIyLmlkKTtcblx0XHR9IGVsc2UgaWYgKCh0YWIxLmNvdW50IC0gMSkgJSA0ID09IDApIHtcblx0XHRcdHNldFRhYkFjdGl2ZSh0YWIzLmlkKTtcblx0XHR9XG5cdFx0dGFiMi5jb3VudCA9IHRhYjEuY291bnQgLSAxO1xuXHRcdHRhYjMuY291bnQgPSB0YWIxLmNvdW50IC0gMTtcblx0XHR0YWIyLnVwZGF0ZUNvdW50ZXIoKTtcblx0XHR0YWIzLnVwZGF0ZUNvdW50ZXIoKTtcblx0fSBlbHNlIGlmIChhY3RpdmVUYWIgPT0gdGFiMikge1xuXHRcdHNldFRhYkFjdGl2ZSh0YWIxLmlkKTtcblx0fSBlbHNlIGlmIChhY3RpdmVUYWIgPT0gdGFiMykge1xuXHRcdHNldFRhYkFjdGl2ZSh0YWIxLmlkKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzdGFydFRpbWVyKHRpbWUpIHtcblx0dGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKHVwZGF0ZVRpbWVyLCAxMDAwKTtcblx0aXNUaW1lckFjdGl2ZSA9IHRydWU7XG5cdGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xuXHRcdHVwZGF0ZURpc3BsYXlUaW1lKHRpbWUpO1xuXHRcdGlmICh0aW1lIDw9IDApIHtcblx0XHRcdHRpbWVFeHBpcmVkKCk7XG5cdFx0fVxuXHRcdHRpbWUtLTtcblx0fVxufVxuXG5mdW5jdGlvbiBwYXVzZVRpbWVyKCkge1xuXHRjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xufVxuXG5mdW5jdGlvbiByZXNldFRpbWVyKCkge1xuXHRjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xuXHR1cGRhdGVEaXNwbGF5VGltZShhY3RpdmVUYWIudGltZSk7XG5cdGJ1dHRvblN0YXJ0VGltZXIuY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVcIik7XG5cdGJ1dHRvblNraXBUaW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXHRpc1RpbWVyQWN0aXZlID0gZmFsc2U7XG59XG5cbmJ1dHRvblNraXBUaW1lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGltZUV4cGlyZWQpO1xuXG5mdW5jdGlvbiB1cGRhdGVEaXNwbGF5VGltZSh0aW1lKSB7XG5cdGxldCBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lIC8gNjApO1xuXHRtaW51dGVzID0gbWludXRlcyA8IDEwID8gXCIwXCIgKyBtaW51dGVzIDogbWludXRlcztcblxuXHRsZXQgc2Vjb25kcyA9IHRpbWUgJSA2MDtcblx0c2Vjb25kcyA9IHNlY29uZHMgPCAxMCA/IFwiMFwiICsgc2Vjb25kcyA6IHNlY29uZHM7XG5cblx0dGltZURpc3BsYXkuaW5uZXJUZXh0ID0gbWludXRlcyArIFwiOlwiICsgc2Vjb25kcztcbn1cblxudXBkYXRlRGlzcGxheVRpbWUoYWN0aXZlVGFiLnRpbWUpO1xuXG4vLyBUT0RPU1xuY29uc3QgdG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG9zX19mb3JtXCIpLFxuXHR0b2RvSW5wdXQgPSB0b2RvRm9ybS5xdWVyeVNlbGVjdG9yKFwiLnRvZG9zX19pbnB1dCAuaW5wdXQtaW5uZXJcIiksXG5cdHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2Rvc19fbGlzdFwiKSxcblx0dGFza3NMUyA9IFwiVGFza3NcIjtcbmxldCB0YXNrcyA9IFtdO1xuXG5mdW5jdGlvbiBsb2FkVGFza3MoKSB7XG5cdGNvbnN0IHRhc2tzTGlzdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRhc2tzTFMpO1xuXHRpZiAodGFza3NMaXN0ICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgcGFyc2VkTGlzdCA9IEpTT04ucGFyc2UodGFza3NMaXN0KTtcblx0XHRwYXJzZWRMaXN0LmZvckVhY2godGFzayA9PiB7XG5cdFx0XHRzaG93VG9kbyh0YXNrLm5hbWUpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNhdmVUb2RvKCkge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0YXNrc0xTLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xufVxuXG5mdW5jdGlvbiBkZWxUb2RvKGUpIHtcblx0Y29uc3QgbGkgPSBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUsXG5cdFx0Y2xlYW5UYXNrID0gdGFza3MuZmlsdGVyKGZ1bmN0aW9uICh0YXNrKSB7XG5cdFx0XHRyZXR1cm4gdGFzay5pZCAhPT0gcGFyc2VJbnQobGkuaWQpO1xuXHRcdH0pO1xuXHR0b2RvTGlzdC5yZW1vdmVDaGlsZChsaSk7XG5cdHRhc2tzID0gY2xlYW5UYXNrO1xuXHRzYXZlVG9kbygpO1xufVxuXG5mdW5jdGlvbiBjbGVhclRvZG8oKSB7XG5cdHRvZG9MaXN0LmlubmVySFRNTCA9IFwiXCI7XG5cdHRhc2tzID0gW107XG5cdHNhdmVUb2RvKCk7XG59XG5cbmZ1bmN0aW9uIHNob3dUb2RvKHRleHQpIHtcblx0Y29uc3QgbmV3SWQgPSB0YXNrcy5sZW5ndGggKyAxLFxuXHRcdHRvZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRsZXQgdG9kb1NldHRpbmdzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0dG9kb0J0bi5jbGFzc0xpc3QuYWRkKFwidG9kb19fYnRuXCIpO1xuXHR0b2RvQnRuLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi4uL2ltYWdlcy9tZW51LnBuZ1wiIGFsdD1cIlwiPic7XG5cdHRvZG9TZXR0aW5nc0J0bi5jbGFzc0xpc3QuYWRkKFwidG9kb19fc2V0dGluZ3Mtc2F2ZVwiKTtcblx0dG9kb1NldHRpbmdzQnRuLmlubmVyVGV4dCA9IFwi0KHQvtGF0YDQsNC90LjRgtGMXCI7XG5cdGxldCB0b2RvSFRNTCA9IGBcbiAgICA8bGkgY2xhc3M9XCJ0b2Rvc19faXRlbSB0b2RvXCIgaWQ9JHtcInRvZG8tXCIgKyBuZXdJZH0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvX19zZXR0aW5ncyBoaWRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fc2V0dGluZ3MtaW5uZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fc2V0dGluZ3MtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD7QmNC30LzQtdC90LjRgtGMINGC0LXQutGB0YI6PC9wPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJ0b2RvX19pbnB1dCBpbnB1dFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1pbm5lclwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImNoYW5nZUlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCIke3RleHR9XCIgcGxhY2Vob2xkZXI9XCLQktCy0LXQtNC40YLQtSDRgtC10LrRgdGCXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fc2V0dGluZ3MtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8cD7QktCy0LXQtNC40YLQtSDQutC+0LvQuNGH0LXRgdGC0LLQviDQv9C+0LzQvtC00L7RgNC+OjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwidG9kb19faW5wdXQtbnVibWVyIGlucHV0LW51Ym1lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidG9kb19fcG9tby10aW1lIGlucHV0LW51Ym1lcl9faW5uZXJcIiBuYW1lPVwiY291bnRQb21vXCIgdmFsdWU9XCIxXCIgdHlwZT1cIm51bWJlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImlucHV0LW51Ym1lcl9fcGx1c1wiIHR5cGU9XCJidXR0b25cIj4rPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaW5wdXQtbnVibWVyX19taW51c1wiIHR5cGU9XCJidXR0b25cIj4tPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2RvX19tYWluXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fY2hlY2tib3ggY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIyNVwiIGN5PVwiMjVcIiByPVwiMjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0zNC44NzMyIDExLjEyMzlMMjUuNzc5OCAzNi4yNjA4QzI1LjUwNjcgMzcuMDE1NyAyNC41MDAzIDM3LjE1NzMgMjQuMDI5NSAzNi41MDcxTDE2Ljg3MzEgMjYuNjIzOVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJ3aGl0ZVwiIHN0cm9rZS13aWR0aD1cIjNcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kb19fdGV4dFwiPiR7dGV4dH08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9saT5gO1xuXHR0b2RvTGlzdC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIHRvZG9IVE1MKTtcblx0dG9kb0xpc3QuY2hpbGRyZW5bMF0uYXBwZW5kKHRvZG9CdG4pO1xuXHR0b2RvTGlzdC5jaGlsZHJlblswXS5jaGlsZHJlblswXS5hcHBlbmQodG9kb1NldHRpbmdzQnRuKTtcblx0Ly8gY29uc3QgZGVsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdC8vIGNsZWFyQWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG9zX19jbGVhcicpLFxuXHQvLyBkZWxCdG4uY2xhc3NMaXN0LmFkZCgnZm9vdGVyX190b2RvLWNsb3NlJylcblx0Ly8gZGVsQnRuLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiY2xvc2VcIj48L2Rpdj4nO1xuXHRjb25zdCB0b2RvT2JqID0ge1xuXHRcdG5hbWU6IHRleHQsXG5cdFx0aWQ6IG5ld0lkLFxuXHR9O1xuXHR0YXNrcy5wdXNoKHRvZG9PYmopO1xuXHRzYXZlVG9kbygpO1xuXHRpbnB1dE51bSgpO1xuXHR0b2RvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVTZXR0aW5ncyk7XG5cdHRvZG9TZXR0aW5nc0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2F2ZVNldHRpbmdzKTtcblx0Ly8gZGVsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsVG9kbyk7XG5cdC8vIGNsZWFyQWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJUb2RvKTtcbn1cblxuZnVuY3Rpb24gc3VibWl0SGFuZ2xlcihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0Y29uc3QgY3VycmVudFZhbHVlID0gdG9kb0lucHV0LnZhbHVlO1xuXHRzaG93VG9kbyhjdXJyZW50VmFsdWUpO1xuXHR0b2RvSW5wdXQudmFsdWUgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTZXR0aW5ncyhlKSB7XG5cdGNvbnN0IGJ0biA9IGUudGFyZ2V0O1xuXHRjb25zdCB0b2RvU2V0dGluZ3MgPSBidG4ucGFyZW50Tm9kZS5jaGlsZHJlblswXTtcblx0Y29uc3QgdG9kb01haW4gPSBidG4ucGFyZW50Tm9kZS5jaGlsZHJlblsxXTtcblx0YnRuLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuXHR0b2RvTWFpbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcblx0dG9kb1NldHRpbmdzLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xufVxuXG5mdW5jdGlvbiBzYXZlU2V0dGluZ3MoZSkge1xuXHRjb25zdCBzYXZlQnRuID0gZS50YXJnZXQ7XG5cdGNvbnN0IHRvZG9TZXR0aW5ncyA9IHNhdmVCdG4ucGFyZW50Tm9kZTtcblx0Y29uc3QgdG9kb01haW4gPSBzYXZlQnRuLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlblsxXTtcblx0Y29uc3QgdG9kb0J0biA9IHNhdmVCdG4ucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuWzJdO1xuXHR0b2RvTWFpbi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcblx0dG9kb0J0bi5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcblx0dG9kb1NldHRpbmdzLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuXHRsb2FkVGFza3MoKTtcblx0dG9kb0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBzdWJtaXRIYW5nbGVyKTtcbn1cbmluaXQoKTtcblxuLy8gaW5wdXQtbnVtYmVyXG5mdW5jdGlvbiBpbnB1dE51bSgpIHtcblx0Y29uc3QgaW5wdXROdW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pbnB1dC1udWJtZXJcIik7XG5cdGlucHV0TnVtcy5mb3JFYWNoKGVsID0+IHtcblx0XHRjb25zdCBwbHVzID0gZWwucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1udWJtZXJfX3BsdXNcIiksXG5cdFx0XHRtaW51cyA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtbnVibWVyX19taW51c1wiKSxcblx0XHRcdGlucHV0ID0gZWwucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1udWJtZXJfX2lubmVyXCIpO1xuXHRcdGxldCBjb3VudCA9IGlucHV0LnZhbHVlO1xuXHRcdHBsdXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdCsrY291bnQ7XG5cdFx0XHRpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlIDwgMCA/IDAgOiBjb3VudDtcblx0XHRcdHVwZGF0ZVBvbW9kb3MoY291bnQpO1xuXHRcdH0pO1xuXHRcdG1pbnVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRjb3VudCA+IDEgPyAtLWNvdW50IDogY291bnQ7XG5cdFx0XHRpbnB1dC52YWx1ZSA9IGlucHV0LnZhbHVlIDwgMCA/IDAgOiBjb3VudDtcblx0XHRcdHVwZGF0ZVBvbW9kb3MoY291bnQpO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUG9tb2Rvcyhjb3VudCkge1xuXHR0YWIxLnRpbWUgPSB0YWIxLmRlZmF1bHRUaW1lICogY291bnQ7XG5cdHVwZGF0ZURpc3BsYXlUaW1lKHRhYjEudGltZSk7XG59XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
