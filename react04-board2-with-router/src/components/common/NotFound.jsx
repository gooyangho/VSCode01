import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        페이지를 찾을 수 없습니다. ㅠㅠ<br/>
      </p>
      <Link to="/">홈으로</Link>
    </div>
  );
}

export default NotFound;