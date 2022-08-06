import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from '../App';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: '완전 좋음',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: '좋음',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: '그럭저럭',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: '나쁨',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: '끔직함',
  },
];

const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const contentRef = useRef();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.length < 5) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        //수정하기가 아닐때
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
      //뒤로가기 못하게
      navigate('/', { replace: true });
    }
  };

  //수정 요청이 오면
  useEffect(() => {
    if (isEdit) {
      //originData의 date로 날짜 업데이트
      setDate(getStringDate(new Date(parseInt(originData.date))));
      //originData의 emotion으로 감정 업데이트
      setEmotion(originData.emotion);
      //originData의 content로 내용 업데이트
      setContent(originData.content);
    }
  }, [isEdit, originData]);
  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={isEdit ? '일기 수정하기' : '새 일기쓰기'}
        leftChild={
          <MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className='input_box'>
            <input
              className='input_date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className='input_box emotion_list_wrapper'>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className='input_box content_wrapper'>
            <textarea
              ref={contentRef}
              placeholder='오늘은 어땠나요?'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='control_box'>
            <MyButton text={'취소하기'} onClick={() => navigate(-1)} />
            <MyButton
              text={'작성완료'}
              type={'positive'}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
