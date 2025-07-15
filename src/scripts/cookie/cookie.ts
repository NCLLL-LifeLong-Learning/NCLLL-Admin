export const getCookie = (name: string): string | null => {
    const cookie = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    if (cookie) {
        const expires = document.cookie.match(new RegExp(`(?:^|;)\\s*${name}\\s*:\\s*([^;]+)`));
        if (expires && new Date(expires[1]).getTime() < Date.now()) {
            removeCookie(name);
            return null;
        }
        return decodeURIComponent(cookie[2]);
    }
    return null;
};

export const setCookie = (name: string, token: string): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 1 day in milliseconds
    document.cookie = `${name}=${token}; expires=${expires.toUTCString()};`;
};

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=;`;
};