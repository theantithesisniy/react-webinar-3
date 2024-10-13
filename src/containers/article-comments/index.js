import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentForm from '../../components/comment-form';
import CommentHeader from '../../components/comment-header';
import CommentList from '../../components/comment-list';
import CommentLoginMessage from '../../components/comment-login-message';
import SideLayout from '../../components/side-layout';
import useInit from '../../hooks/use-init';
import useSelectorCustom from '../../hooks/use-selector';
import commentActions from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';

function Comments() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [replyTo, setReplyTo] = useState(id);
  const [newComment, setNewComment] = useState('');
  const [showLoginMessageFor, setShowLoginMessageFor] = useState(null);
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false);
  const formRef = useRef(null);
  const newCommentRef = useRef(null);

  const comments = useSelector(state => state.comments.items);
  const select = useSelectorCustom(state => ({
    exists: state.session.exists,
    name: state.session.user.profile,
  }));

  const organizedComments = useMemo(() => {
    if (comments.length === 0) return [];
    const filterComments = listToTree(comments);
    return filterComments;
  }, [comments]);

  useInit(() => {
    if (!id) return;
    const loadComments = async () => {
      try {
        await dispatch(commentActions.loadComments(id));
        setIsCommentsLoaded(true);
      } catch (e) {
        setIsCommentsLoaded(true)
        console.error('Ошибка при загрузке комментариев', e);
      }
    };

    loadComments();
  }, [id, dispatch]);

  useInit(() => {
    if (replyTo && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [replyTo]);

  useInit(() => {
    if (newCommentRef.current) {
      newCommentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [comments.length]);

  const handleReplyClick = (commentId) => {
    if (!select.exists) {
      setShowLoginMessageFor(commentId);
    } else {
      setReplyTo(commentId);
    }
  };

  const handleAddComment = () => {
    const trimmedComment = newComment.trim();
    if (trimmedComment.length === 0) {
      return;
    }
    const type = replyTo === id ? 'article' : 'comment';
    dispatch(commentActions.addComment(newComment, replyTo || id, type));
    setNewComment('');
    setReplyTo(id);
  };

  const handleCancelReply = () => {
    setReplyTo(id);
  };

  return (
    <SideLayout side="start" padding="large">
      <>
        <CommentHeader count={comments.length} />
        <CommentList
          comments={organizedComments}
          replyTo={replyTo}
          handleReplyClick={handleReplyClick}
          select={select}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCancelReply={handleCancelReply}
          handleAddComment={handleAddComment}
          showLoginMessageFor={showLoginMessageFor}
          setShowLoginMessageFor={setShowLoginMessageFor}
          LoginMessageComponent={CommentLoginMessage}
          formRef={formRef}
          newCommentRef={newCommentRef}
        />

        {/* Форма добавления комментария для товара */}
        {isCommentsLoaded && select.exists && replyTo === id && (
          <CommentForm
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            ref={newCommentRef}
          />
        )}

        {/* Если никто не выбрал комментарий для ответа, показываем LoginMessage внизу */}
        {!select.exists && showLoginMessageFor === null && (
          <CommentLoginMessage onCancel={() => setShowLoginMessageFor(null)} />
        )}
      </>
    </SideLayout>
  );
}



export default Comments;
