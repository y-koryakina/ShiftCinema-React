export const ROUTES = {
    HOME: "/",
    MOVIE_DETAIL_TEMPLATE: "/movie/:id",
    MOVIE_DETAIL: (id) => `/movie/${id}`,
    SEANCE_TEMPLATE: "/movie/:movieId/schedule",
    SEANCE: (movieId) => `/movie/${movieId}/schedule`,
    CARD: "/card",
    DATA_FORM: "/form",
    SUCCESS: "/success"
};
