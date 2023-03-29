import getDataFromStorage from '../services/getDataFromStorage';
import pressBtn from './buttonPressAnim';
import { postData, getData } from '../services/dataBaseQueries';
import { openViewBalansWindow } from './viewBalance';

let idCard = 0;

function setIdCard(id) {
  idCard = id;
}

function changePosition(btnSelector) {
  const btn = document.querySelector(btnSelector);

  btn.addEventListener('click', (e) => {
    // анимация нажатия кнопки
    pressBtn(e.target);
    // запуск функционала после анимации нажатия кнопки
    setTimeout(async () => {
      const data = getDataFromStorage();

      if (data.length === 1) {
        return;
      }

      data.sort((a, b) => a.position - b.position);

      const action = e.target.id;
      const card = data.filter((item) => item.id == idCard)[0];

      if (
        (action == 'position-up' && card.position === data[0].position) ||
        (action == 'position-down' &&
          card.position === data[data.length - 1].position)
      ) {
        return;
      }

      let changedCards = [];

      e.target.disabled = true;
      e.target.classList.add('modal-changes__position-btn-disable');

      const cardIndex = data.findIndex((item) => item.id === card.id);
      const cardPosition = card.position;

      if (action == 'position-up' && card.position > data[0].position) {
        const secondCard = data[cardIndex - 1];
        card.position = secondCard.position;
        secondCard.position = cardPosition;
        changedCards.push(card, secondCard);
      } else if (
        action === 'position-down' &&
        card.position < data[data.length - 1].position
      ) {
        const secondCard = data[cardIndex + 1];
        card.position = secondCard.position;
        secondCard.position = cardPosition;
        changedCards.push(card, secondCard);
      } else {
        return;
      }

      const json = JSON.stringify(changedCards);

      let answer = await postData('server/changePosition.php', json);
      if (answer.status === 'ok') {
        if (localStorage.getItem('balanceData')) {
          localStorage.setItem('balanceData', `${JSON.stringify(data)}`);
        } else {
          sessionStorage.setItem('balanceData', `${JSON.stringify(data)}`);
        }
        // let newData = await getData(
        //   `./server/getDataById.php?id=${card.userId}`
        // );

        // if (localStorage.getItem('balanceData')) {
        //   localStorage.setItem(
        //     'balanceData',
        //     `${JSON.stringify(newData.data)}`
        //   );
        // } else {
        //   sessionStorage.setItem(
        //     'balanceData',
        //     `${JSON.stringify(newData.data)}`
        //   );
        // }
        e.target.disabled = false;
        e.target.classList.remove('modal-changes__position-btn-disable');
        openViewBalansWindow();
      } else {
        e.target.disabled = false;
        e.target.classList.remove('modal-changes__position-btn-disable');
        console.log('Что то пошло не так');
        return;
      }
    }, 300);
  });
}

export { setIdCard, changePosition };
