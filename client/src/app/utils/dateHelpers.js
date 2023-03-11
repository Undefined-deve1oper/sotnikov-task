const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
];

export function getFullYearByTimeStamp(timestamp) {
    return Math.floor(timestamp / 1000 / 60 / 60 / 24 / 365);
}
