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
	formRef,
	newCommentRef,
}) {

	const renderedComments = useMemo(() => {
		const renderedCommentsSet = new Set();
		const renderComments = (commentsList, level = 0) => {
			return commentsList.map((comment, index) => {
				const formattedDate = formatDate(comment.dateCreate);
				if (!comment || !comment._id || comment.invalid) {
					return null;
				}
				if (renderedCommentsSet.has(comment._id)) {
					return null;
				}
				renderedCommentsSet.add(comment._id);

				const visualLevel = level > 3 ? 3 : level;

				return (
					<div
						key={comment._id}
						ref={index === commentsList.length - 1 ? newCommentRef : null}
						className="comment-item"
						style={{ paddingLeft: `${visualLevel + 30}px` }}
					>
						<div className="comment-item-data">
							<strong
								className={select.exists && comment?.author?.profile?.name === select.name?.name
									? 'comment-item-name comment-item-name--current-user'
									: 'comment-item-name'}>
								{comment?.author?.profile?.name || (select.name?.name ? select.name.name : 'Гость')}
							</strong>
							<em className="comment-item-date">{formattedDate}</em>
							<div className="comment-item-text">{comment.text}</div>

							{select.exists ? (
								<button onClick={() => handleReplyClick(comment._id)} className="coment-item-data-btn">
									Ответить
								</button>
							) : (
								<button
									onClick={() => setShowLoginMessageFor(comment._id)}
									className="coment-item-data-btn">
									Ответить
								</button>
							)}

							{!select.exists && showLoginMessageFor === comment._id && (
								<LoginMessageComponent onCancel={() => setShowLoginMessageFor(null)} />
							)}
						</div>

						{/* Отображаем дочерние комментарии если они есть */}
						{comment.children && comment.children.length > 0 && level <= visualLevel && (
							<div className="children-comments">
								{renderComments(comment.children, level + 1)}
							</div>
						)}

						{/* Форма для ответа на комментарий */}
						{select.exists && replyTo === comment._id && (
							<div className="new-comment-form" ref={formRef}>
								<h4>Новый комментарий</h4>
								<textarea
									placeholder={`Мой ответ для ${comment?.author?.profile?.name}`}
									value={newComment}
									onChange={e => setNewComment(e.target.value)}
								/>
								<button onClick={handleAddComment} disabled={!newComment.trim()}>Отправить</button>
								<button className="new-comment-form-btn" onClick={handleCancelReply}>Отменить</button>
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
