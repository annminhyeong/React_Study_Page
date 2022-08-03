import React, { useRef, useState } from 'react';

//props 받기
const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  created_date,
  onRemove,
  onEdit,
}) => {
  //Update
  //useEffect(() => console.log(`${id}번째 아이템 update`));

  //useState 생성, 초기값은 false로 설정
  //수정중인지 아닌지 체크함
  const [isEdit, setIsEdit] = useState(false);

  //isEdit의 토글기능
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //일기내용을 useState에 저장
  const [localContent, setLocalContent] = useState(content);

  //수정된 일기내용 유효성 체크
  const localContentInput = useRef();

  //수정취소
  const handleQuitEdit = () => {
    setIsEdit(!isEdit);
    //바뀐 일기내용을 다시 원래 일기내용으로 덮어쓰기
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      //해당 Dom 요소를 focus 해줌
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      //수정폼 닫기
      toggleIsEdit();
    }
  };

  //App.js의 onRemove() 함수에 파라미터 전달
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <div className='DiaryItem'>
      <div className='info'>
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className='date'>
          {/*  toLocaleDateString : 밀리세컨드를 문자열로 바꿔줌*/}
          {new Date(created_date).toLocaleString()}
        </span>
      </div>
      <div className='content'>
        {isEdit ? (
          <>
            {/* 수정중 */}
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>
            {/* 수정중아님 */}
            {content}
          </>
        )}
      </div>
      {isEdit ? (
        <>
          {/* 수정중 */}
          <button onClick={handleEdit}>수정완료</button>
          <button onClick={handleQuitEdit}>수정취소</button>
        </>
      ) : (
        <>
          {/* 수정중아님 */}
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

//export 할때 React.memo를 적용해도 됨
//React.memo : 부모에게 전달 받은 props와 자신의 props가 같을때 재랜더링 안되게 함
export default React.memo(DiaryItem);
