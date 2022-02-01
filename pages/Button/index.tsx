import Button from "@/Components/Button";

const imgStyle = {
  width: '14px',
  height: '11px'
}
export default function Index() {
  return (
    <>
      <div>
        <h1> Basic usage</h1>
        <div>
          <Button>Default</Button>
          <Button shape="plain">Plain</Button>
          <Button shape="round">Round</Button>
        </div>
      </div>
      <div>
        <h1> Disabled Button</h1>
        <div>
          <Button disabled>Default</Button>
          <Button shape="plain" disabled>Plain</Button>
          <Button shape="round" disabled>Round</Button>
          <Button>
            <img src="https://a.com" /> 
            {/* React.creatElement의 리턴 */}
          </Button>
        </div>
      </div>
      <div>
        <h1> Autofocus</h1>
        <Button autofocus>오토포커스</Button>
      </div>
      <div>
        <h1>Loading</h1>
      </div>
      <div>
        <h1>Size</h1>
      </div>
    </>
  );
}
