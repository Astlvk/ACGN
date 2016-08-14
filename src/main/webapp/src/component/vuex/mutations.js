export const mutations = {
  UPDATEWEBTYPES (state, webTypes) {
    state.webTypes = webTypes;
  },
  ADDWEBTYPE (state, webType) {
    state.webTypes.push(webType);
  },
  UPDATEWEBTYPE (state, id, value) {
    for (let i = 0; i < state.webTypes.length; i++) {
      if (state.webTypes[i].id === id) {
        state.webTypes.$set(i, {id, name: value});
      }
    }
  },
  DELWEBTYPE (state, type) {
    state.webTypes.$remove(type);
  }
}
