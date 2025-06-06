function BoardView(props) {
  return (
    <>
      {/* 게시판 열람 */}
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
}

const CommentBtn = () => {
  return (
    <>
      {/* 댓글 작성 버튼 */}
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentModal">
        댓글 작성
      </button>
    </>
  );
};

function ModalWindow(props) {
  return (
    <>
      {/* 댓글 작성 Modal */}
      <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">댓글 작성</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* 작성자명 입력 상자 추가 */}
              <div className="mb-3">
                <label htmlFor="commentAuthor" className="form-label">작성자명</label>
                <input type="text" className="form-control" id="commentAuthor" placeholder="이름을 입력하세요" />
              </div>
              {/* 댓글 입력 상자 */}
              <label htmlFor="commentContent" className="form-label">댓글 내용</label>
              <textarea className="form-control" id="commentContent" rows="3" placeholder="댓글을 입력하세요"></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="button" className="btn btn-primary">작성</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CommentList(props) {
  return (
    <>
      {/* 댓글 목록 출력 */}
      <ul className="list-group mt-3">
        <li className="list-group-item">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <strong>작성자명</strong> <small className="ms-2">2025-03-22 14:30</small>
            </div>
            <div>
              <button className="btn btn-outline-success btn-sm">좋아요 (0)</button>
              <button className="btn btn-outline-warning btn-sm">수정</button>
              <button className="btn btn-outline-danger btn-sm">삭제</button>
            </div>
          </div>
          <p className="mt-2 mb-0">
            댓글은 여기에 출력됩니다. 줄바꿈 처리도 해주세요. <br />
            댓글 작성과 수정은 모달창을 이용하면 됩니다.
          </p>
        </li>
      </ul>
    </>
  );
}

const App = () => {
  const [boardData, setBoardData] = useState([
    {
      idx:1 , writer:'양', postdate:'2025-05-27',
      contents : '내용 블라블라', likes : 10
    },
  ]);
  return (<>
  <div class="container mt-4">
    <BoardView />
    <CommentBtn />
    <ModalWindow />
    <CommentList />
  </div>
    </>);
};

export default App;
