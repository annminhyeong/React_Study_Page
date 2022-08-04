import { useContext } from 'react';
import DiaryItem from './DiaryItem';
import { DiaryStateContext } from './App';

//props 받기
const DiaryList = () => {
  //useContext() 함수는 Context Provider가 전달한 값을 받는다.
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className='DiaryList'>
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* List의 자식들은 고유한 key props를 가지고 있어야 한다 */}
        {/* List의 고유한 key값이 없는 경우 map의 두번째인자의 index를 사용해도 된다 */}
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
