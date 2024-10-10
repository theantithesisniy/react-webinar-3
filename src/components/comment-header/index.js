import React from 'react';
import './style.css';
function CommentHeader({ count }) {
	return <h3 className="CommentHeader">Комментарии ({count})</h3>;
}

export default CommentHeader;
