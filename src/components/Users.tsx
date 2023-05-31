import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import DataGrid from './DataGrid';
import { Link } from 'react-router-dom';
import './Users.css';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [sort, setSort] = useState({ attribute: 'name', order: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers(page, pageSize, sort, '');
      setUsers(data);
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize, sort]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columnConfig = [
    { columnName: 'ID', attribute: 'id' },
    { columnName: 'Name', attribute: 'name' },
    { columnName: 'Email', attribute: 'email' },
    { columnName: 'Phone', attribute: 'phone' },
    { columnName: 'Address', attribute: 'address.street' },
  ];

  return (
    <div className="users-container">
      <h1>Welcome to AnalyticEdge</h1>
      <div className="toolbar">
        <label className="sort-label">Sort By:</label>
        <select
          className="sort-select"
          onChange={(e) =>
            setSort({ attribute: e.target.value, order: 'asc' })
          }
        >
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="address.street">Address</option>
        </select>
        <Link to="/posts" className="link-button">
          Posts
        </Link>
        <Link to="/comments" className="link-button">
          Comments
        </Link>
      </div>
      <DataGrid data={users} columnConfig={columnConfig} />
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          className="pagination-button"
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Users;
