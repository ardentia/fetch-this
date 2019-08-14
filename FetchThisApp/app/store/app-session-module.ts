export default {
  namespaced: true,
  state: {
    viewTitle: '',
    previousViewTitle: ''
  },
  getters: {
    
  },
  mutations: {
    changeViewTitle(state, title: string) {
      state.previousViewTitle = state.viewTitle;
      state.viewTitle = title;
    },
    setPreviousViewTitle(state) {
      state.viewTitle = state.previousViewTitle;
    }
  }
};
