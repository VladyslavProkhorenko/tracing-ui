import moment from "moment/moment";

export const formatDate = (date) => {
    if (!date) return "No date";

    return moment(date).format("HH:mm:ss DD.MM.YYYY");
}
