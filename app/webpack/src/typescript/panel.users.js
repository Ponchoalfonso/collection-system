import { initializeObjectSeekers, createAlert, closeModals } from '../../packs/application';
import { compareDates, compareUser, extractId } from './charge.filters';

const getSelectedUsers = () => {
  const users = document.querySelectorAll('.user-check');
  users[0]
  const selected = [];
  for (const user of users) {
    if (user.checked)
      selected.push(user.value);
    user.checked = false;
  }

  return selected;
}; export default getSelectedUsers;

/* * * * * * * * * * * * * * * * * * * *
 *  Helping method for user filtering  * 
 * * * * * * * * * * * * * * * * * * * */
const setUserSeeker = user => {
  document.querySelector(`#usr-${user.id}`).addEventListener('click', () => {
    const ust = document.querySelector('#user-target span');
    ust.innerHTML = `Usuario: ${user.name} ${user.last_name}`;
    ust.id = "u-"+user.id;

    closeModals();
  });

   const cs = [{ 
    name: 'charge',
    listener: `usr-${user.id}`,
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
  }]

  initializeObjectSeekers(cs);
}

/* * * * * * * * * * * * * * * *
 * Updating users when needed  *
* * * * * * * * * * * * * * * */

// Users seekers
const us = [
  {
    name: 'user',
    listener: 'get-users-charge',
    tbody: 'charge-users',
    fields: [
      'name',
      'last_name',
      'phone_number',
    ],
    checkbox: true,
    obj: '',
    comparisons: [
      { key: 'role', value: 'Cliente'},
    ],
    paragraph: false,
    url: 'users'
  },
  {
    name: 'usr',
    listener: 'user-target',
    tbody: 'users-filter',
    fields: [
      'name',
      'last_name',
      'phone_number',
    ],
    checkbox: false,
    obj: '',
    comparisons: [
      { key: 'role', value: 'Cliente'},
    ],
    paragraph: false,
    url: 'users',
    fun: setUserSeeker,
  }
]

document.addEventListener("turbolinks:load", function() {
  initializeObjectSeekers(us);

  /* * * * * * * * * * * * * * * *
  * User registration response  *
  * * * * * * * * * * * * * * * */

  // Catching ajax response
  const user_form = document.querySelector("#new_user");

  if (user_form) {
    user_form.addEventListener("ajax:success", () => {
      createAlert('success', 'Usuario creado correctamente!');
      closeModals();
      user_form.reset();
    });
    user_form.addEventListener("ajax:error", (event) => {
      createAlert('danger', 'Eror al crear usuario: ' + event.detail[0].message);
      closeModals();
    });
  }
});

