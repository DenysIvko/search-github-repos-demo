import axios from 'axios';

const GITHUB_HOST = 'https://api.github.com';
const REPOSITORIES_ENDPOINT = `${GITHUB_HOST}/search/repositories`;

const REPOSITORIES_LIMIT_DEFAULT = 30;
const SORT_DEFAULT = 'stars';
const ORDER_DEFAULT = 'desc';

const serializeParams = (params) => {
  return {
    q: `${params.query} in:name`,
    page: params.page,
    per_page: params.perPage,
    sort: params.sort,
    order: params.order
  };
};

const parse = (data, params) => {
  return {
    total: data.total_count,
    params,
    items: data.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        url: item.html_url,
        stargazers: item.stargazers_count
      };
    })
  };
};

export const createReguestCancellation = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};

export const fetchRepos = (params, cancelToken) => {
  const p = {
    perPage: REPOSITORIES_LIMIT_DEFAULT,
    sort: SORT_DEFAULT,
    order: ORDER_DEFAULT,
    ...params
  };

  return axios
    .get(`${REPOSITORIES_ENDPOINT}`, {
      params: serializeParams(p),
      // make request cancellable
      cancelToken
    })
    .then(({ data }) => {
      return parse(data, p);
    });
};
