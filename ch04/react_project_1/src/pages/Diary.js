import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const Diary = () => {
  //pathVarable 받기 (useParams 사용)
  //pathVarable로 받은 값과 동일한 이름으로 받아야함
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState();

  //상세페이지에 들어왔을때
  useEffect(() => {
    if (diaryList.length > 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        //상세페이지 존재함
        setData(targetDiary);
      } else {
        //상세페이지 존재안함
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className='Diary'>로딩중입니다...</div>;
  } else {
    //현재 감정데이터
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className='Diary'>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={'수정하기 >'}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                'diary_img_wrapper',
                `diary_img_wrapper_${data.emotion}`,
              ].join(' ')}
            >
              <img src={curEmotionData.emotion_img} />
              <div className='emotion_descript'>
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className='diary_content_wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
