export default {
  state: {
    user: null
  },

  setAuthAction(user) {
    if (!user) {return false}
    this.state.user = user;
  },

  clearAuthAction() {
    this.state.user = null
  }
}
