interface UserFormat {
  firstName: string;
  lastName: string;
  profileImage: string;
}

function Welcome(props) {
  return (
    <section>
      <img src={props.user.profileImage} /> <br />
      <h3>Welcome, {props.user.firstName} {props.user.lastName}</h3>
    </section>
  )
}

function Clock(props) {
 return (
   <div>
     <h2>현재 한국의 시간은 {props.date.toLocaleTimeString()}입니다.</h2>
   </div>
 )
}

export default function HelloWorld() {

  const user: UserFormat = {
    firstName: '이',
    lastName: '요르',
    profileImage: 'https://post-phinf.pstatic.net/MjAxODEwMDVfMTgy/MDAxNTM4NzA2MjEwMDUz.kQGkc8nEmHCL0-NZbVEE_n_uVwOb38j8FwfvEb1ZChAg.tPTFeS8IOEXyx_o3bLBhQf2EiO2yXFv9rHy8f4XvJoMg.JPEG/%EC%9D%B4%EC%9A%94%EB%A5%B42.jpg?type=w1200'
  };
  
  // return에는 HTML만 들어가야 하는 모양이죠?
  return (
    <div>
      <Welcome user={user} />
      <Clock date={new Date}/> 
      함수형으로... state쓰는방법삽니다..
      <ul>
        <li>음악 플레이어 : youtube 주소를 입력하면... 플레이어 생성... 재생까지...?</li>
      </ul>
    </div>
  )
}