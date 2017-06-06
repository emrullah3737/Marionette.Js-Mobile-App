import $ from 'jquery';
import _ from 'underscore';
import Jqueryui from '../../../../bower_components/jquery-ui/jquery-ui';

class UI {

  tag(inputSelector, storeName, Model = {}, searchIndexes = []) {
    $(() => {
      window.store.set(storeName, []);
      function split(val) {
        return val.split(/,\s*/);
      }
      function extractLast(term) {
        return split(term).pop();
      }

      $(inputSelector)
        .on('keydown', (event) => {
          if (
            event.keyCode === $.ui.keyCode.TAB &&
            $(this).autocomplete('instance').menu.active
          ) {
            event.preventDefault();
          }
        })
        .autocomplete({
          minLength: 0,
          source(request, response) {
            const model = new Model();
            const arrName = [];
            let text = request.term;

            if (extractLast(text) === '' || extractLast(text) === ' ') { text = 'undefined'; }

            const queryString = {};
            _.each(searchIndexes, (v) => {
              queryString[v] = `{:like:}${extractLast(text)}`;
            });

            model.fetch({
              data: $.param(queryString),
              success(v) {
                _.each(v.toJSON().data.doc, (res) => {
                  arrName.push({ value: res.name, id: res._id });
                });
                response(arrName);
              },
              error() {
                response();
              },
            });
          },
          focus() {
            return false;
          },
          select(event, ui) {
            const terms = split(this.value);
            terms.pop();
            terms.push(ui.item.value);
            terms.push('');
            this.value = terms.join(', ');

            const arrays = window.store.get(storeName);
            const obj = {
              value: ui.item.value,
              id: ui.item.id,
            };
            arrays.push(obj);
            window.store.set(storeName, arrays);
            return false;
          },
        })
        .autocomplete('instance')._renderItem = (ul, item) =>
        $('<li style="background-color: white">')
          .append(`<div>${item.value}</div>`)
          .appendTo(ul);
    });
  }

  tagResult(inputSelector, storeName, cb) {
    let tagsInput = $(inputSelector).val();
    tagsInput = tagsInput.split(', ');
    const arr = [];
    const storeArr = window.store.get(storeName);
    _.each(tagsInput, (inputVal) => {
      _.each(storeArr, (storeObj) => {
        if (inputVal === storeObj.value) {
          arr.push(storeObj.id);
        }
      });
    });
    window.store.remove(storeName);
    cb(arr);
  }
}

export default new UI();
