import React, { useState, useEffect } from 'react';

const BoardView = () => {
  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">댓글 작성 구현하기</h5>
          <p className="card-text">
            구현할 기능은 댓글작성, 좋아요, 수정, 삭제입니다. <br />
            기능 구현은 아래 댓글 작성부터 하면 됩니다.
          </p>
        </div>
      </div>
    </>
  );
};

const CommentBtn = () => {
  return (
    <>
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
        댓글 작성
      </button>
    </>
  );
};

function ModalWindow({ author, setAuthor, content, setContent, onSubmit }) {
  return (
    <>
      <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <label htmlFor="commentContent" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="button" className="btn btn-primary" onClick={onSubmit}>작성</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CommentList = ({ comments, onLike, onEdit, onDelete }) => {
  return (
    <>
      <ul className="list-group mt-3">
        {comments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center">
                <strong>{comment.author}</strong>
                <small className="ms-2">{comment.date}</small>
              </div>
              <div>
                <button className="btn btn-outline-success btn-sm me-1" onClick={() => onLike(comment.id)}>
                  좋아요({comment.likes})
                </button>
                <button className="btn btn-outline-warning btn-sm" onClick={() => onEdit(comment)}>수정</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDelete(comment.id)}>삭제</button>
              </div>
            </div>
            <p className="mt-2 mb-0">{comment.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

const App = () => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [username, setUsername] = useState(''); // 
  const [password, setPassword] = useState(''); // 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 

  useEffect(() => { // 
    const savedUser = localStorage.getItem('loginUser');
    if (savedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLike = (id) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    setComments(updated);
  }

  const handleEditStart = (comment) => {
    setAuthor(comment.author);
    setContent(comment.content);
    setEditingId(comment.id);

    const modal = new window.bootstrap.Modal(document.getElementById('commentModal'));
    modal.show();
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setComments(comments.filter((c) => c.id !== id));
    }
  };

  const handleSubmitComment = () => {
    if (!author.trim() || !content.trim()) {
      alert('작성자명과 댓글을 입력하세요');
      return;
    }

    const now = new Date();
    const date = now.toISOString().slice(0, 16).replace('T', ' ');

    if (editingId) {
      const updated = comments.map((c) =>
        c.id === editingId ? { ...c, author, content, date } : c
      );
      setComments(updated);
      setEditingId(null);
    } else {
      const newComment = {
        id: Date.now(),
        author,
        content,
        date,
        likes: 0,
      };
      setComments([...comments, newComment]);
    }

    setAuthor('');
    setContent('');

    const modal = document.getElementById('commentModal');
    const modalInstance = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
    modalInstance.hide();
  };

  const handleLogin = () => { //
    if (username.trim() === '' || password.trim() === '') {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }
    localStorage.setItem('loginUser', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => { // 
    localStorage.removeItem('loginUser');
    setIsLoggedIn(false);
  };

  return (
    <div className="container mt-4">
      {!isLoggedIn ? ( //  로그인 안 했을 때
        <div className="card p-4">
          <h4>로그인</h4>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary" onClick={handleLogin}>로그인</button>
        </div>
      ) : ( // 로그인 했을 때
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>환영합니다, {localStorage.getItem('loginUser')}님</h5>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>로그아웃</button>
          </div>
          <BoardView />
          <CommentBtn />
          <ModalWindow
            author={author}
            setAuthor={setAuthor}
            content={content}
            setContent={setContent}
            onSubmit={handleSubmitComment}
          />
          <CommentList
            comments={comments}
            onLike={handleLike}
            onEdit={handleEditStart}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default App;
