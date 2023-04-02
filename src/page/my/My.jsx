import { Foot } from "../../conpoment/Foot"
import { useEffect } from "react"

export const My = () => {

  useEffect(() => {
    console.log('my')
  })
  return (
    <>
      <div className='contents'>
        我的
      </div>
      <Foot />
    </>

  )
}