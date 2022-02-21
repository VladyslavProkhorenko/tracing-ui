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
            .get(`${TracingUIService.server}/tracing/entity/${key}`)
            .then(({ data }) => data)
    },

    async loadItemsForEntity(id, page = 1, query = null) {
        return await axios
            .get(`${this.server}/tracing/entity/${id}/item?page=${page}${query !== null ? `&query=${query}` : ''}`)
            .then(({ data }) => data)
    },

    async loadItemDetails(id) {
        return await axios
            .get(`${TracingUIService.server}/tracing/item/${id}`)
            .then(({ data }) => data)
    }
}

export default TracingUIService;
