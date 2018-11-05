const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    _items.addEventListener('click', edit);
  }


  function formHandler(e) {
    e.preventDefault();
    const texti = e.target.childNodes[1].value;
    if (/\S/.test(texti)) {
      var newEl,child, txt;
      newEl = el('li', 'item', '');

      child = el('input', 'item__checkbox', '');
      child.type = 'checkbox';
      newEl.appendChild(child);

      child = el('span', 'item__text', '');
      txt = document.createTextNode(texti);
      child.appendChild(txt);
      newEl.appendChild(child);

      child = el('button', 'item__button', '');
      txt = document.createTextNode('Eyða');
      child.appendChild(txt);
      newEl.appendChild(child);

      add(newEl);
    }
    e.target.childNodes[1].value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    switch (e.target.className) {
    case 'item__checkbox':
      finish(e);
      break;

    case 'item__button':
      deleteItem(e);
      break;

    case 'item__text':
          var text, val;
          val = e.target
          text = val.innerHTML;

          // Create an input
          newEl = el('input','item__edit','keydown');
          newEl.type = 'text';
          newEl.value = text;

          val.parentNode.replaceChild(newEl, val);


          newEl.focus();
          break;
  }

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(e.keyCode == ENTER_KEYCODE){
      var text, val;
      val = e.target
      text = val.innerHTML;

      // Create an input
      newEl = el('span','item__text','');
      newEl.innerHTML = e.target.value;

      val.parentNode.replaceChild(newEl, val);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    items.appendChild(value)
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    items.removeChild(e.target.parentNode);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const newEl = document.createElement(type);
    newEl.classList.add(className);
    newEl.addEventListener(clickHandler, commit);
    return newEl;
  }

  return {
    init: init
  }
})();
