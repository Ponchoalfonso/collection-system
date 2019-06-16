import { createAlert, closeModals, updateObjectsView } from '../../packs/application';

const appendPayment = payment => {
  updateObjectsView(false, 'payment-table', ['famount', 'fcreated_at'], [payment], 'payment');
}

document.addEventListener("turbolinks:load", function() {
  const payment_form = document.querySelector('#payment_form');
  if (payment_form) {
    payment_form.addEventListener("ajax:success", (event) => {
      createAlert('success', 'Pago realizado correctamente!');
      let data = event.detail[0];
      appendPayment(data);
      closeModals();
    });
    payment_form.addEventListener("ajax:error", (event) => {
      createAlert('danger', 'Eror al realizar el pago: ' + event.detail[0].message);
      closeModals();
    });
  }
});