import { initializeObjectSeekers, createAlert, closeModals } from '../../packs/application';

const getSelectedUsers = () => {
  const users = document.querySelectorAll('.user-check');
  const selected = [];
  for (const user of users) {
    if (user.checked)
      selected.push(user.value);
      user.checked = false;
  }

  return selected;
}; export default getSelectedUsers;

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
      { key: 'role', value: 'Cliente'}
    ],
    paragraph: false,
    url: 'users'
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

