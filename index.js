import { formatAmount } from "./utils.js"
import "./index.css";
//2. Получаем элементы, с которыми будем работать:
const form = document.querySelector('.donate-form');
const input = form.querySelector('.donate-form__donate-input');
const totalAmount = document.querySelector('#total-amount');
const donatesContainer = document.querySelector('.donates-container__donates');
//3. Создаем функцию для добавления нового доната:
function addDonation(event) {
  event.preventDefault();
   // Получаем значение из поля ввода и очищаем его
  const amount = input.value;
  const date = new Date();
  const formattedDate = date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
   // Создаем новый элемент списка донатов
  const donateItem = document.createElement('div');
  donateItem.classList.add('donate-item');
  donateItem.textContent = `${formattedDate} - `;
  const donateAmount = document.createElement('b');
  donateAmount.textContent = formatAmount(amount);
  donateItem.appendChild(donateAmount);
   // Добавляем новый элемент в список донатов
  donatesContainer.appendChild(donateItem);
  input.value = '';
   // Обновляем общую сумму донатов
  const total = calculateTotal();
  totalAmount.textContent = formatAmount(total);
}

function calculateTotal() {
  const donateItems = donatesContainer.querySelectorAll('.donate-item');
  let total = 0;
  donateItems.forEach((donateItem) => {
    const amount = donateItem.querySelector('b').textContent.replace('$', '');
    total += parseInt(amount);
  });
  return total;
}
//Добавляем обработчик события для отправки формы:
form.addEventListener('submit', addDonation);
// Этот обработчик отменяет стандартное поведение формы при отправке и вызывает функцию addDonation для добавления нового доната.



