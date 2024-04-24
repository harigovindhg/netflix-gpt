export const NETFLIX_LOGO = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const USER_AVATAR = "https://occ-0-1946-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABR0fXUL7bceg4qHsYxYtSr7saR4_r1rkB6HzKAOQbjKGA0UMGsrpwBMCzaJg7DLz2GsU8mFMu0eVhXOCcoOyr59bYPQo2kc.png?r=213";

export const IMAGE_CDN = "https://image.tmdb.org/t/p/w440_and_h660_face";

export const IMAGE_CDN_LQ = "https://image.tmdb.org/t/p/h30";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`
    }
};

export const GPT_KEY = process.env.REACT_APP_OPENAI_KEY;