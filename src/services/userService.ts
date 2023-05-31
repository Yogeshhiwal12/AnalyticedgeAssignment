import axios from 'axios';

export const getUsers = async (page: number, pageSize: number, sort: { attribute: string, order: string }, filter: string) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
    params: {
      _page: page,
      _limit: pageSize,
      _sort: sort.attribute,
      _order: sort.order,
      q: filter
    }
  });
  
  return response.data;
}
