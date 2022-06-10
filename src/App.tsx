import FallbackExample from "./components/Example/FallbackExample";

function App() {
  const onError = ()=> console.log("出错啦");
  const onReset = ()=>{
    console.log('已重置');
    console.log("刚刚出错了,不好意思");
  }
  return (
    <div className="App">
      <h2>fallback 例子</h2>
      <FallbackExample/>
    </div>
  );
}

export default App;
