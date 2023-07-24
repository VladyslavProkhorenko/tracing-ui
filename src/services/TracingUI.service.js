import axios from "axios";

const TracingUIService = {
    server: null,

    async auth(server) {
        server = this.parseServer(server);

        return await axios
            .get(`${server}/tracing/ping`)
            .then( () => {
                this.server = server
                return true;
            })
            .catch( () => false )
    },

    parseServer(server) {
        if (!new RegExp(/^http[s]?:\/\/g/).test(server)) {
            return `//${server}`;
        }

        return server;
    },

    async loadEntities() {
        return await axios
            .get(`${this.server}/tracing/entity`)
            .then(({ data }) => data)
    },

    async loadEntityDetails(key) {
        return await axios
            .get(`${this.server}/tracing/entity/${key}`)
            .then(({ data }) => data)
    },

    async loadItemsForEntity(id, page = 1, query = null, filterType = null, filterSteps = null) {
        const params = {
            page,
            query: query && query.length ? query : null,
            filterType,
            filterSteps: filterSteps && filterSteps.length ? filterSteps.join(',') : null
        }

        return await axios
            .get(`${this.server}/tracing/entity/${id}/item`, {
                params
            })
            .then(({ data }) => data)
    },

    async loadStepsForEntity(id) {
        return await axios
            .get(`${this.server}/tracing/entity/${id}/step`)
            .then(({ data }) => data)
    },

    async loadItemDetails(key) {
        key = encodeURIComponent(key);
        return await axios
            .get(`${this.server}/tracing/item/${key}`)
            .then(({ data }) => data)
    }
}

export default TracingUIService;
