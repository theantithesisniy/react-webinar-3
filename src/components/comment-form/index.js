import React from 'react';
import './style.css';

function CommentForm({ newComment, setNewComment, handleAddComment }) {

	return (
		<div className="new-comment-form">
			<h4>Новый комментарий</h4>
			<textarea
				value={newComment}
				onChange={e => setNewComment(e.target.value)}
				placeholder="Текст"
			/>
			<button onClick={handleAddComment} disabled={!newComment.trim()}>Отправить</button>

		</div>
	);
};

export default CommentForm;
