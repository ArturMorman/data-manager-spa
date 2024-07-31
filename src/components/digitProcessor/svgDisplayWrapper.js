import React, { useEffect, useState } from 'react'
import SvgDisplay from './svgDisplay'

const SvgDisplayWrapper = ({ value, symbNum }) => {

  const [staticValue, setStaticValue] = useState(value)

  useEffect(() => {
    if (value === staticValue) return

    const startValue = staticValue
    const endValue = value
    const step = endValue > startValue ? 1 : -1

    const interval = 777
    // const stepInterval = 50

    const steps = Math.abs(endValue - startValue) + 1
    const delayPerStep = interval / steps
    // const delayPerStep = stepInterval


    let current = startValue

    const timer = setInterval(() => {
      if ((step > 0 && current >= endValue) || (step < 0 && current <= endValue)) {
        clearInterval(timer)
        setStaticValue(endValue)
      } else {
        current += step
        setStaticValue(current)
      }
    }, delayPerStep)

    return () => clearInterval(timer)
  }, [value, staticValue])

  return (
    <SvgDisplay value={staticValue} symbNum={symbNum} />
  )
}
export default SvgDisplayWrapper