export default {
  UPDATEWEBTYPES (state, webTypes) {
    state.webTypes = webTypes;
  },
  ADDWEBTYPE (state, webType) {
    state.webTypes.push(webType);
  },
  UPDATEWEBTYPE (state, type) {
    for (let i = 0; i < state.webTypes.length; i++) {
      if (state.webTypes[i].id === type.id) {
        state.webTypes.splice(i, 1, {id: type.id, name: type.name});
      }
    }
  },
  DELWEBTYPE (state, type) {
    for (let i = 0; i < state.webTypes.length; i++) {
      if (state.webTypes[i].id === type.id) {
        state.webTypes.splice(i, 1);
      }
    }
  },
}
