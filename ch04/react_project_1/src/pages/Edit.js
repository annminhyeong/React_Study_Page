import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  //pathVariable 받기
  const { id } = useParams();
  const dirayList = useContext(DiaryStateContext);

  //id, dirayList가 변할때 실행
  useEffect(() => {
    if (dirayList.length >= 1) {
      const targetDiary = dirayList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);

      //해당 id의 수정페이지 있을때
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        //해당 id 상세보기가 없을때 홈으로 이동
        navigate('/', { replace: true });
      }
    }
  }, [id, dirayList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
