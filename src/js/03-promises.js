
import Notiflix from 'notiflix';

const refsForm = document.querySelector('.form');

const handleSubmitForm = e => {
  e.preventDefault();

  const { delay, step, amount } = e.target;
  let delayForPromise = Number(delay.value);
  const stepForPromise = Number(step.value);
  const amountForPromise = Number(amount.value);

  for (let i = 1; i <= amountForPromise; i += 1) {
    createPromise(i, delayForPromise)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    delayForPromise += stepForPromise;
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}

refsForm.addEventListener('submit', handleSubmitForm);