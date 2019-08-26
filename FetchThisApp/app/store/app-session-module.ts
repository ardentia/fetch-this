export default {
  namespaced: true,
  state: {
    viewTitle: '',
    previousViewTitle: '',
    currentView: null
  },
  getters: {
    getCurrentView(state) {
      return state.currentView;
    }
  },
  mutations: {
    changeViewTitle(state, title: string) {
      state.previousViewTitle = state.viewTitle;
      state.viewTitle = title;
    },
    setPreviousViewTitle(state) {
      state.viewTitle = state.previousViewTitle;
    },
    setCurrentView(state, newView) {
      state.currentView = newView;
    }
  }
};
