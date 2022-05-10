window.addEventListener('DOMContentLoaded', () => {
	//Табы 
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabs() {
		tabsContent.forEach((tabs) => {
			tabs.style.display = 'none';
		});
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function viewTabs(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabs();
	viewTabs();

	function viewCorrectTab() {
		tabsParent.addEventListener('click', (e) => {
			tabs.forEach((item, i) => {
				if (e.target == item && e.target.classList.contains('tabheader__item')) {
					hideTabs();
					viewTabs(i);
				};
			})

		});
	}
	viewCorrectTab();


	// Таймер
	const deadline = '2022-06-15';

	function calculateTime(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		}
		else {
			return num;
		}
	}


	function setTime(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds');

		updateTime();

		let k = setInterval(updateTime, 1000);



		function updateTime() {
			let dead = calculateTime(endtime);
			days.innerHTML = getZero(dead.days);
			hours.innerHTML = getZero(dead.hours);
			minutes.innerHTML = getZero(dead.minutes);
			seconds.innerHTML = getZero(dead.seconds);
			if (dead.total <= 0) {
				clearInterval(updateTime);
			}
		}
		updateTime();

	}

	setTime('.timer', deadline);


	//Модальное окно
	const buttonsModalOpen = document.querySelectorAll('[data-modal]'),
		buttonButtonClose = document.querySelector('[data-close]'),
		modal = document.querySelector('.modal');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}


	buttonsModalOpen.forEach((item) => {
		item.addEventListener('click', openModal);
	});




	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';

	}


	buttonButtonClose.addEventListener('click', closeModal);



	modal.addEventListener('click', (e) => {
		if (e.target && e.target.classList.contains('modal')) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	// const modalTimerId = setTimeout(openModal, 3000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// Классы для карточек 

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 70;
			this.changeToRU();
		}

		changeToRU() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			element.innerHTML = `
			<div class="menu__item">
			<img src=${this.src} alt=${this.alt}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
		</div>
			`;
			this.parent.append(element);
		}
	}

	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		"Меню \"Фитнес\"",
		"Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальнойценой и высоким качеством!",
		9,
		".menu .container",

	).render();
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		"Меню \"Фитнес\"",
		"Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальнойценой и высоким качеством!",
		9,
		".menu .container",

	).render();
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		"Меню \"Фитнес\"",
		"Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальнойценой и высоким качеством!",
		9,
		".menu .container",

	).render();
});







