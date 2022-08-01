import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formRef: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.formRef.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    delay += step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
      })
      .catch(({ position, delay }) => { 
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
      });
  };
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve(objectPromise);
      } else {
        return reject(objectPromise);
      };
    }, delay)
  });
  };
