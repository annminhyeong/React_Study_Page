//자식 요소로 배치된 엘리먼트는 무조건 children 이라는 이름의 props으로 전달된다
const Container = ({ children }) => {
  console.log(children);
  return (
    <div style={{ margin: 20, padding: 20, border: '1px solid gray' }}>
      {children}
    </div>
  );
};

export default Container;
