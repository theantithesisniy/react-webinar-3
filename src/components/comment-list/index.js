import React, { useMemo } from 'react';
import formatDate from '../../utils/format-date';
import './style.css';
function CommentList({
	comments,
	replyTo,
	handleReplyClick,
	select,
	newComment,
	setNewComment,
	handleAddComment,
	handleCancelReply,
	showLoginMessageFor,
	setShowLoginMessageFor,
	LoginMessageComponent,
}) {
	if (!Array.isArray(comments) || comments.length === 0) {
		return <p>Загрузка комментариев...</p>;
	}


	const renderedComments = useMemo(() => {
		const renderedCommentsSet = new Set();
		const renderComments = (commentsList, level = 0) => {
			return commentsList.map(comment => {
				const formattedDate = formatDate(comment.dateCreate);
				if (!comment || !comment._id || comment.invalid) {
					return null;
				}
				if (renderedCommentsSet.has(comment._id)) {
					return null;
				}
				renderedCommentsSet.add(comment._id);

				return (
					<div key={comment._id} className="comment-item" style={{ paddingLeft: `${level}px` }}>
						<div className="comment-item-data">
							<strong className="comment-item-name">
								{comment?.author?.profile?.name || `${select.name.name}`}
							</strong>
							<em>{formattedDate}</em>
							<div className="comment-item-text">{comment.text}</div>

							{select.exists ? (
								<button onClick={() => handleReplyClick(comment._id)} className="coment-item-data-btn">
									Ответить
								</button>
							) : (
								<button
									onClick={() => setShowLoginMessageFor(comment._id)}
									className="coment-item-data-btn"
								>
									Ответить
								</button>
							)}

							{!select.exists && showLoginMessageFor === comment._id && (
								<LoginMessageComponent onCancel={() => setShowLoginMessageFor(null)} />
							)}
						</div>

						{/* Форма для ответа на комментарий */}
						{replyTo === comment._id && (
							<div className="new-comment-form">
								<h4>Новый комментарий</h4>
								<textarea
									value={newComment}
									onChange={e => setNewComment(e.target.value)}
								/>
								<button onClick={handleAddComment}>Отправить</button>
								<button className="new-comment-form-btn" onClick={handleCancelReply}>Отменить</button>
							</div>
						)}

						{comment.children && comment.children.length > 0 && (
							<div className="children-comments">
								{renderComments(comment.children, level + 1)}
							</div>
						)}
					</div>
				);
			});
		};

		return renderComments(comments);
	}, [comments, replyTo, select.exists, showLoginMessageFor, newComment, handleReplyClick, setShowLoginMessageFor, LoginMessageComponent]);

	return <div>{renderedComments}</div>;
}

export default CommentList;