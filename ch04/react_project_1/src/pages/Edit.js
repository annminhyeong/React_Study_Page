import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
  //리엑트에서 페이지를 이동시킬때 사용 (useNavigate 사용)
  const navigate = useNavigate();

  //Query String 받기 (useSearchParams 사용)
  //searchParams : 현재의 QueryString 얻기
  //setSearchParams : 실시간으로 QueryString 상태 변경
  const [searchParams, setSearchParams] = useSearchParams();

  //id 추출
  const id = searchParams.get('id');
  console.log('id:', id);

  //mode 추출
  const mode = searchParams.get('mode');
  console.log('mode:', mode);
  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지 입니다</p>
      <button onClick={() => setSearchParams({ who: 'winterlood' })}>
        QS 바꾸기
      </button>
      <button onClick={() => navigate('/')}>홈으로가기</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default Edit;
