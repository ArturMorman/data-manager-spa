import React from 'react'
import Digit from './digitSvg'

const DigitProcessor = ({ digitxx }) => {

    const colorOff = "rgba(4, 21, 27, 0.84)"
    const opacityOff = "0.1"

    const digit = digitxx
    var opacitys = {}
    opacitys.opacity1 = { opacity: opacityOff, fill: colorOff }
    if (digit < "5" || digit > "6") { opacitys.opacity1 = { opacity: "1" } }
    opacitys.opacity2 = { opacity: opacityOff, fill: colorOff }
    if ((digit < "1" || digit > "3") && digit !== "7") { opacitys.opacity2 = { opacity: "1" } }
    opacitys.opacity3 = { opacity: opacityOff, fill: colorOff }
    if (digit !== "1" && digit !== "4") { opacitys.opacity3 = { opacity: "1" } }
    opacitys.opacity4 = { opacity: opacityOff, fill: colorOff }
    if (digit > "1" && digit !== "7") { opacitys.opacity4 = { opacity: "1" } }
    opacitys.opacity5 = { opacity: "1", }
    if (digit === "2") { opacitys.opacity5 = { opacity: opacityOff, fill: colorOff } }
    opacitys.opacity6 = { opacity: opacityOff, fill: colorOff }
    if (digit === "0" || digit === "2" || digit === "6" || digit === "8") { opacitys.opacity6 = { opacity: "1" } }
    opacitys.opacity7 = { opacity: opacityOff, fill: colorOff }
    if (digit !== "1" && digit !== "4" && digit !== "7") { opacitys.opacity7 = { opacity: "1" } }
    return (
        <>
            <Digit {...opacitys} />
        </>
    )
}

export default DigitProcessor