import { defineStore } from 'pinia';
import {
    SIDEBAR_COLLAPSED_WIDTH,
    SIDEBAR_EXPAND_WIDTH,
    NAV_HEIGHT,
    NAV_HEIGHT_COLLAPSED
} from '../config/app';

interface AppState {
    sidebarExpand: boolean;
    wrapperWidth: number | string;
    wrapperLeftOffset: number | string;
    navWidth: string;
    navHeight: number;
}

export const useAppStore = defineStore('useAppConfig', {
    state: (): AppState => ({
        sidebarExpand: true,
        wrapperWidth: SIDEBAR_EXPAND_WIDTH,
        wrapperLeftOffset: SIDEBAR_EXPAND_WIDTH,
        navWidth: `calc(100% - ${SIDEBAR_EXPAND_WIDTH}px)`,
        navHeight: NAV_HEIGHT,
    }),
    getters: {
        sidebarExpanded: (state): boolean => state.sidebarExpand,
    },
    actions: {
        toggleSidebar(): void {
            this.sidebarExpand = !this.sidebarExpand;
            if (window.innerWidth > 1024) {
                this.initWrapper();
            }
        },
        initWrapper(): void {
            if (window.innerWidth > 1024) {
                if (this.sidebarExpand) {
                    this.wrapperWidth = SIDEBAR_EXPAND_WIDTH;
                    this.wrapperLeftOffset = SIDEBAR_EXPAND_WIDTH;
                    this.navHeight = NAV_HEIGHT;
                } else {
                    this.wrapperWidth = SIDEBAR_COLLAPSED_WIDTH;
                    this.wrapperLeftOffset = SIDEBAR_COLLAPSED_WIDTH;
                    this.navHeight = NAV_HEIGHT_COLLAPSED;
                }
                this.navWidth = `calc(100% - ${this.wrapperWidth}px)`;
            } else {
                this.navWidth = '100%';
                this.sidebarExpand = false;
                this.wrapperWidth = '100%';
                this.wrapperLeftOffset = '100%';
            }
        },
        appUnmount(): void {
            window.removeEventListener('resize', this.initWrapper);
        },
    },
});
