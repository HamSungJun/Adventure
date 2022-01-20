import Button from "@/Components/Button";

export default function Index() {
  return (
    <>
      <div>
        <h1> Basic usage</h1>
        <div>
          <Button>Default</Button>
          <Button type="round">Round</Button>
          <Button type="circle">
            <div
              style={{
                width: 14 + "px",
                height: 14 + "px",
                backgroundColor: "black",
              }}
            ></div>
            {/* <i className="fas"></i> */}
          </Button>
        </div>
      </div>
      <div>
        <h1> Disabled Button</h1>
      </div>
      <div>
        <h1> Text Button</h1>
      </div>
      <div>
        <h1> Icon Button</h1>
      </div>
    </>
  );
}
