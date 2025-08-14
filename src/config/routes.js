export const ROUTES = {
    HOME: "/",
    MOVIE_DETAIL_TEMPLATE: "/movie/:id", // для маршрутизатора
    MOVIE_DETAIL: (id) => `/movie/${id}`, // для перехода по конкретному id
    SEANCE_TEMPLATE: "/movie/:movieId/schedule",
    SEANCE: (movieId) => `/movie/${movieId}/schedule`, //почему у меня тут где-то кавычки а где то апострофы...
    DATA_FORM: "/form"
};
