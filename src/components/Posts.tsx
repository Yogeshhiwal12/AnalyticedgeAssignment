import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/postService';
import './Post.css';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedPosts, setPaginatedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    setPaginatedPosts(paginatedPosts);
  }, [currentPage, itemsPerPage, posts]);

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts-container">
      <h2 className="heading">Posts</h2>
      {paginatedPosts.map((post) => (
        <div key={post.id}>{post.title}</div>
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

export default Posts;
