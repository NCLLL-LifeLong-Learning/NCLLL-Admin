import { get, set } from '@vueuse/core';
import { defineStore } from 'pinia';

interface MainState {
    user: any
}

export const useMainStore = defineStore('useMainStore', {
    state: (): MainState => ({
        user: {},
    }),
    getters: {
        getUser: (state) => get(state.user),
    },
    actions: {
        setUser(user: any) {
            set(this.user, user);
        }
    },
});


