import axios from "axios";

const TracingUIService = {
    server: null,

    async auth(server) {
        server = this.parseServer(server);

        return await axios
            .get(`${server}/tracing-ui/ping`)
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
            .get(`${this.server}/tracing-ui/entities`)
            .then(({ data }) => data)
    },

    async loadItemDetails(id) {
        return await axios
            .get(`${TracingUIService.server}/tracing-ui/item/${id}`)
            .then(({ data }) => data)
    },

    async searchItems(query, entityId) {
        return await axios
            .get(`${this.server}/tracing-ui/entity/${entityId}/item?query=${query}`)
            .then(({ data }) => data)
    }
}

export default TracingUIService;