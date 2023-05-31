import React, { useState, useEffect } from 'react';
import { getComments } from '../services/commentService';
import './Comments.css';

const Comments: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedComments, setPaginatedComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getComments();
      setComments(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedComments = comments.slice(startIndex, endIndex);
    setPaginatedComments(paginatedComments);
  }, [currentPage, itemsPerPage, comments]);

  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comments-container">
      <h2 className="heading">Comments</h2>
      {paginatedComments.map((comment) => (
        <div key={comment.id}>{comment.name}</div>
      ))}

      <div className="pagination">
        <button
          className="button-previous"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {currentPage > 1 && (
          <button
            className="button-number"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button className="button-number" disabled>
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            className="button-number"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        <button
          className="button-next"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Comments;
