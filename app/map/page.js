import KakaoMap from "@/components/kakaomaps/page";

export default async function Mypage() {
 
    return (
      <div style={{backgroundColor :  'rgb(249, 250, 255)',
                  width : '100%',
                  height : '85vh',
                  padding : '1px'}}>
        <KakaoMap/>
      </div>
    )
  }