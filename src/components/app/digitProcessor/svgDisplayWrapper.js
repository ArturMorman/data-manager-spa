import React, { useEffect, useState } from 'react'
import SvgDisplay from './svgDisplay'

const SvgDisplayWrapper = ({ value, symbNum }) => {

  const [staticValue, setStaticValue] = useState(value)
  const [isCounting, setIsCounting] = useState(false)

  // console.log('_svg display wrapper')
  // console.log(value)

  useEffect(() => {
    if (value === staticValue) return

    setIsCounting(true)

    const startValue = staticValue
    const endValue = value
    const step = endValue > startValue ? 1 : -1

    const interval = 1385
    // const stepInterval = 50

    const steps = Math.abs(endValue - startValue) + 1
    const delayPerStep = interval / steps
    // const delayPerStep = stepInterval

    let current = startValue

    const timer = setInterval(() => {
      if ((step > 0 && current >= endValue) || (step < 0 && current <= endValue)) {
        clearInterval(timer)
        setStaticValue(endValue)
        setIsCounting(false)
      } else {
        current += step
        setStaticValue(current)
      }
    }, delayPerStep)
    return () => {
      clearInterval(timer)
      setIsCounting(false)
    }
  }, [value])

  return (
    <SvgDisplay value={staticValue} symbNum={symbNum} counting={isCounting} />
  )
}
export default SvgDisplayWrapper