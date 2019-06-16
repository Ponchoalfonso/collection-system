// Importing images
const importAll = (r) => r.keys().map(r);
importAll(require.context('../images', true, /\.(png|jpe?g|svg)$/));
// TypeScript
import Rails from 'rails-ujs';
import Turbolinks from 'turbolinks';

Rails.start();
Turbolinks.start();

import 'popper.js';
import 'jquery'
import {$} from 'jquery';
import 'bootstrap';
import '../src/typescript/panel.users';
import '../src/typescript/panel.charges';



/* * * * * * * * *
 * User fetching *
* * * * * * * * */
export const updateObjectsView = (override, id, fields, objects, name, addCheck = false, paragraph = false) => {
  const container = document.querySelector('#' + id);
  if (container) {
    let rows = '';
    if (paragraph && objects.length === 1) {
      for (const field of fields) {
        const lbfl = field.split(':') // label and filed
        rows += `<p>${lbfl[0]}: ${objects[0][lbfl[1]]}</p>`;
      }
    } else {
      for (const obj of objects) {
        rows += `<tr class="${name}-row"> <th>${obj.id}</th>`;
        for (const field of fields) {
          rows += `<td>${obj[field]}</td>`;
        }
        if (addCheck)
          rows += `<td><input class="${name}-check" type="checkbox" id="${name}-${obj.id}" value="${obj.id}"></td>`;
        rows += '</tr>'
      }
    }

    if (override)
      container.innerHTML = rows;
    else
      container.innerHTML = rows + container.innerHTML;
  } else { console.warn('Table not found!') }
}

export const initializeObjectSeekers = seekers => {
  for (const seeker of seekers) {
    const l = document.querySelector('#' + seeker.listener); // Element listening click
    if (l) {
      
      let url = seeker.url;
      if (!isNaN(seeker.obj)) {
        url = `${seeker.url}/${seeker.obj}`
      }
      l.addEventListener('click', (event) => {
        Rails.ajax({
          type: 'GET',
          dataType: 'json',
          url: url,
          success: data => {
            const validObjects = [];
            for (const obj of data) {
              let valid = true;
              for (const comparison of seeker.comparisons) {
                valid = valid && (obj[comparison.key] === comparison.value);
              }
              if (valid)
              validObjects.push(obj);
            }
            updateObjectsView(true, seeker.tbody, seeker.fields, [...validObjects], seeker.name, seeker.checkbox, seeker.paragraph) 
          }
        });
      });
    }
  }
};

/* * * * * * * * *
 * Alert creator *
 * * * * * * * * */

 export const createAlert = (type, message) => {
   const alert = `
   <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      ${message}
    </div>
  `
  document.querySelector('header').insertAdjacentHTML('afterend', alert);
 }

 export const closeModals = () => { 
  // get modals
  const modals = document.getElementsByClassName('modal');

  // on every modal change state like in hidden modal
  for(let i=0; i<modals.length; i++) {
    modals[i].classList.remove('show');
    modals[i].setAttribute('aria-hidden', 'true');
    modals[i].setAttribute('style', 'display: none');
  }

  // get modal backdrops
  const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

  // remove every modal backdrop
  for(let i=0; i<modalsBackdrops.length; i++) {
    document.body.removeChild(modalsBackdrops[i]);
  }
}