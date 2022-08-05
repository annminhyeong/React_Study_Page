import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';
import DiaryItem from './DiaryItem';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된순' },
];

const filterOptionList = [
  { value: 'all', name: '전부다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '나쁜 감정만' },
];

const DiaryList = ({ dirayList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');
  const getProcessedDiaryList = () => {
    //감정필터
    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        //최신순(내림차순)
        return parseInt(b.date) - parseInt(a.date);
      } else {
        //오래된순(오름차순)
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(dirayList));

    //감정별 필터
    const filterList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filterList.sort(compare);

    return sortedList;
  };
  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_col'>
          {/* 시간순 정렬 */}
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          {/* 감정별 정렬 */}
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className='right_col'>
          {/* 글쓰기버튼 */}
          <MyButton
            type={'positive'}
            text={'새 일기쓰기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>

      {/* 일기 리스트 */}
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

//자식 컴포넌트
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
