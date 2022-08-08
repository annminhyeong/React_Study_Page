import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const contentRef = useRef();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

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

  const handleRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onRemove(originData.id);
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
        rightChild={
          isEdit && (
            <MyButton
              text={'삭제하기'}
              type={'negative'}
              onClick={handleRemove}
            />
          )
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
