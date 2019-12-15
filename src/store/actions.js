import chatkit from '../chatkit';

function handleError(commit, error) {
    const message = error.message || error.info.error_description;
    commit('setError', message);
}

export default {
    async login({ commit, state }, userId) {
        try {
            commit('setError', '');
            commit('setLoading', true);

            const currentUser = await chatkit.connectUser(userId);
            commit('setUser', {
                username: currentUser.id,
                name: currentUser.name
            });
            commit('setReconnect', false);

            console.log(state.user);
        } catch (error) {
            handleError(commit, error)
        } finally {
            commit('setLoading', false);
        }
    }
}