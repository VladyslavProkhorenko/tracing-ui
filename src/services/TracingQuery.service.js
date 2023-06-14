const TracingQueryService = {
    set(key, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, "", url.toString());
    },

    get(key, defaultValue = null) {
        const url = new URL(window.location.href);
        return url.searchParams.get(key) || defaultValue;
    }
}

export default TracingQueryService;
