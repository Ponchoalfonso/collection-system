import { initializeObjectSeekers } from '../../packs/application';
import { chargeDetail } from './panel.charges';

export const compareDates = (charge, date) => {
  date = date.value
  if (date === "")
    return true;
  
  const chdate = charge.fcreated_at.split('-');
  chdate[2] = chdate[2].substr(0,2);
  return (chdate.join('-') === date);
}

export const compareUser = (charge, userId) => {
  if (userId.id === '')
    return true;
  return charge.user.id === +userId.id.split('-')[1]
};

export const extractId = charge => { chargeDetail(charge.id); }

const clearFilters = (charge) => {
  const userfilter = document.querySelector('#user-target span'); 
  userfilter.id = "";
  userfilter.innerHTML = "Filtrar usuario";
  document.querySelector('input[type="date"]').value = "";
  chargeDetail(charge.id);
}

document.addEventListener("turbolinks:load", function() {
  const cs = [
    {
      event: 'input',
      name: 'charge',
      listener: 'date-filter',
      tbody: 'charges-table',
      fields: ['client', 'description', 'famount', 'fcreated_at'],
      checkbox: false,
      obj: '',
      comparisons: [
        { key: 'date', value: document.querySelector('input[type="date"]'), fun: compareDates },
        { key: 'user', value: document.querySelector('#user-target span'), fun: compareUser},
      ],
      paragraph: false,
      url: 'charges',
      fun: extractId,
    },
    {
      event: 'click',
      name: 'charge',
      listener: 'reset-target',
      tbody: 'charges-table',
      fields: ['client', 'description', 'famount', 'fcreated_at'],
      checkbox: false,
      obj: '',
      comparisons: [],
      paragraph: false,
      url: 'charges',
      fun: clearFilters,
    },
  ]
  initializeObjectSeekers(cs);
});
