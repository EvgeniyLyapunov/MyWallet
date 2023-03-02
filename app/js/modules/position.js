import getDataFromStorage from "../services/getDataFromStorage";
import pressBtn from "./buttonPressAnim";
import {postData, getData} from '../services/dataBaseQueries';
import {openViewBalansWindow} from './viewBalance';

let idCard = 0;

function setIdCard(id) {
  idCard = id;
}

function changePosition(btnSelector) {
  const btn = document.querySelector(btnSelector);

  btn.addEventListener('click', (e) => {
    pressBtn(e.target);
    const data = getDataFromStorage();
    const card = data.filter(item => (item.id == idCard))[0];
    const currentPosition = card.position;
    let changedCards = [];

    setTimeout(async () => {
      e.target.disabled = true;
      e.target.classList.add('modal-changes__position-btn-disable');
      const action = e.target.id;

      if(data.length === 1) {
        e.target.disabled = false;
        e.target.classList.remove('modal-changes__position-btn-disable');
        return;
      }

      if((action == 'position-up' && card.position == 1) ||
         (action == 'position-down' && card.position == data.length)) {
          e.target.disabled = false;
          e.target.classList.remove('modal-changes__position-btn-disable');
          return;
         }

      if(action == 'position-up' && card.position > 1) {
        const secondCard = data.filter(item => +item.position == +currentPosition - 1)[0];
        card.position = `${+currentPosition - 1}`;
        secondCard.position = currentPosition;
        changedCards.push(card, secondCard);
      }

      if(action === 'position-down' && card.position < data.length) {
        const secondCard = data.filter(item => +item.position == +currentPosition + 1)[0];
        card.position = +currentPosition + 1;
        secondCard.position = +currentPosition;
        changedCards.push(card, secondCard);
      }

      const json = JSON.stringify(changedCards);

      let answer = await postData("server/changePosition.php", json);
      if(answer.status === "ok") {
        let newData = await getData(`./server/getDataById.php?id=${card.userId}`);

        if(localStorage.getItem("balanceData")) {
          localStorage.setItem("balanceData", `${JSON.stringify(newData.data)}`);
        } else {
          sessionStorage.setItem("balanceData", `${JSON.stringify(newData.data)}`);
        }
        e.target.disabled = false;
        e.target.classList.remove('modal-changes__position-btn-disable');
        openViewBalansWindow();
      } else {
        e.target.disabled = false;
        e.target.classList.remove('modal-changes__position-btn-disable');
        console.log('Что то пошло не так');
        return;
      }
    }, 300)
  });
}

export {setIdCard, changePosition};