import { useEffect } from "react"
import { Foot } from "../../conpoment/Foot"

export const Member = () => {
  useEffect(() => {
    console.log('Member')
  })
  return (
    <>
      <div className='contents'>
        会员
      </div>
      <Foot />
    </>

  )
}