import axios from 'axios';
import parseLinkHeader from 'parse-link-header';

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

const parse = ({ data, headers }) => {
  return {
    total: data.total_count,
    // Github insists on using Link Header for pagination instead of constructing own URLs
    paginate: parseLinkHeader(headers.link),
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

export const fetchRepos = (params) => {
  return axios
    .get(`${REPOSITORIES_ENDPOINT}`, {
      params: serializeParams({
        perPage: REPOSITORIES_LIMIT_DEFAULT,
        sort: SORT_DEFAULT,
        order: ORDER_DEFAULT,
        ...params
      })
    })
    .then((response) => {
      return parse(response);
    });
};
