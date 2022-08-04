import { useParams } from 'react-router-dom';

const Diary = () => {
  //pathVarable 받기 (useParams 사용)
  //pathVarable로 받은 값과 동일한 이름으로 받아야함
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지 입니다</p>
    </div>
  );
};

export default Diary;
