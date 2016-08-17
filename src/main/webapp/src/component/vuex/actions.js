import Vue from 'vue';
export default {
  initInfo ({commit}) {
    Vue.http.get('/ACGN/mapi/api.getAllType.acgn').then(
      (response) => {
        commit('UPDATEWEBTYPES', response.json().webTypes);
      },
      (response) => {
        alert('WebType Module initInfo() Error: ' + response.statusText);
      }
    )
  },
  add ({commit}, name) {
    if (name) {
      return Vue.http.post(
        '/ACGN/mapi/api.addWebType.acgn',
        {name: name}
      ).then(
        function (response) {
          response.json().infoFlag == 'addFailed' ? alert(response.json().infoFlag) :
              commit('ADDWEBTYPE', {id: response.json().id, name: name})
        },
        function (response) {
          alert('WebType Module add() Error: ' + response.statusText)
        });
    } else {
      alert('not null');
    }
  },
  update ({commit}, type) {
    Vue.http.post(
      '/ACGN/mapi/api.updateWebTypeById.acgn',
      {id: type.id, name: type.name}
    ).then(
      function (response) {
        response.text() == 'updateFailed' ? alert(response.text()) :
        commit('UPDATEWEBTYPE', type);
      },
      function (response) {
        alert("WebType Module update() Error: " + response.statusText);
      }
    )
  },
  del ({commit}, type) {
    return Vue.http.post(
      '/ACGN/mapi/api.delWebTypeById.acgn',
      {id: type.id}
    ).then(
      function (response) {
        response.text() == 'delFailed' ? alert(response.text()) :
        commit('DELWEBTYPE', type)
      },
      function (response) {
        alert("WebType Module del() Error: " + response.statusText);
      }
    )
  },
}
