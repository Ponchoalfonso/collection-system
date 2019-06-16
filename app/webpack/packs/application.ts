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
import 'bootstrap';
import '../src/typescript/panel.users';
import '../src/typescript/panel.charges';
import '../src/typescript/charge.filters';

/* * * * * * * * *
 * User fetching *
* * * * * * * * */
export const updateObjectsView = (override, id, fields, objects, name, addCheck = false, paragraph = false, fun = null) => {
  const container = document.querySelector('#' + id);
  if (container) {
    if (override)
        container.innerHTML = "";
    if (paragraph && objects.length === 1) {
      let row = '';
      for (const field of fields) {
        const lbfl = field.split(':') // label and filed
        row += `<p>${lbfl[0]}: ${objects[0][lbfl[1]]}</p>`;
      }
      container.insertAdjacentHTML('afterbegin', row);
    } else {
      for (const obj of objects) {
        let row = `<tr class="${name}-row" id="${name}-${obj.id}"> <th>${obj.id}</th>`;
        for (const field of fields) {
          row += `<td>${obj[field]}</td>`;
        }
        if (addCheck)
          row += `<td><input class="${name}-check" type="checkbox" id="${name}-${obj.id}" value="${obj.id}"></td>`;
        row += '</tr>'
        container.insertAdjacentHTML('afterbegin', row);
        if (fun !== null)
          fun(obj);
      }
    }
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
      
      const e = seeker.evnet || 'click';
      l.addEventListener(e, (event) => {
        Rails.ajax({
          type: 'GET',
          dataType: 'json',
          url: url,
          success: data => {
            const validObjects = [];
            for (const obj of data) {
              let valid = true;
              for (const comparison of seeker.comparisons) {
                if (comparison.fun !== undefined)
                  valid = valid && comparison.fun(obj, comparison.value);
                else
                  valid = valid && (obj[comparison.key] === comparison.value);
              }
              if (valid)
                validObjects.push(obj);
            }
            if (seeker.fun === undefined)
              seeker.fun = null;
            updateObjectsView(true, seeker.tbody, seeker.fields, [...validObjects], seeker.name, seeker.checkbox, seeker.paragraph, seeker.fun)
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