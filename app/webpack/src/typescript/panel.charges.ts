import getSelectedUsers from './panel.users';
import Rails from 'rails-ujs';
import { updateObjectsView, createAlert, closeModals, initializeObjectSeekers } from '../../packs/application';

/* * * * * * * * *
* Charge create  *
* * * * * * * * */
const chargeHandler = (form) => {
  const f = document.querySelector(`#${form.id}`);
  if (f) {
    const btn = f.querySelector('#fetch-charges');

    btn.addEventListener('click', () => {

      const usersId = getSelectedUsers();
      for (const userId of usersId) {
        const charge = {};
        for (const input of form.inputs) {
          const inp = document.querySelector(`#${input.id}`);
          if (input["function"])
            charge[input.name] = input.function(inp.value)
          else
            charge[input.name] = inp.value;
        }
        charge["user_id"] = +userId;

        var fd = new FormData();
        fd.append("charge", JSON.stringify(charge));


        Rails.ajax({
          type: 'POST',
          url: '/charges',
          data: fd,
          headers: {
            'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
          },
          success: data => {
            updateObjectsView(
              false,
              'charges-table',
              ['client', 'description', 'famount', 'fcreated_at'],
              [data],
              'charge'
            );
            chargeDetail(data.id);
          }
        });
      }

      createAlert('success', 'Cargos generados correctamente.');
      closeModals();
    });
  }
}

export const chargeDetail = (id) => {
  const row = document.querySelector(`#charge-${id}`);
  if (row) {
    const ps = [{  // payment seeker
      event: 'click',
      name: 'payment',
      listener: `charge-${id}`,
      tbody: 'payment-table',
      fields: ['famount', 'fcreated_at'],
      checkbox: false,
      obj: '',
      comparisons: [{ key: 'charge_id', value: +id}],
      paragraph: false,
      url: 'payments',
    }];
    initializeObjectSeekers(ps);
    row.addEventListener('click', () => {
      const f = document.querySelector('#selected-charge');
      const npb  = document.querySelector('#to-new-payment'); // New payment button
      if (f && npb) {
        f.value = id;
        npb.dataset.target = '#new-payment';
      }
      Rails.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/charges/' + id,
        success: data => {
          updateObjectsView(
            true,
            'detail-display',
            [
              'Cliente:client',
              'Descripción:description',
              'Monto:famount',
              'Total pagado:ftpayed',
              'Deuda restante:fttpay',
              'Fecha:fcreated_at',
            ],
            [data],
            'charge',
            false,
            true
          )
        }
      });
    });
  }
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const chargeForm = {
  id: 'charge-form',
  inputs: [
    { name: 'amount', id: 'amount-in', function: parseInt },
    { name: 'description', id: 'description-in' },
  ],
}

document.addEventListener("turbolinks:load", function() {
  chargeHandler(chargeForm);
  const rows = document.querySelectorAll('.charge-row');
  for (const row of rows) {
    chargeDetail(row.id.split('-')[1]);
  }
});