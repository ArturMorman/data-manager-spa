import React from 'react'
import DigitProcessor from './digitProcessor'

const SvgDisplay = ({ value, symbNum }) => {

    const symbolsNumber = symbNum ? symbNum : 3

    const digits = value.toString().split('', 6)
    const diffNumb = (digits && digits.length > 0 && digits.length < symbolsNumber) ? symbolsNumber - digits.length : null
    let diff = []
    for (let i = 0; diffNumb > i; i++) {
        diff.push('xx')
    }

    return (
        <>
            <div className={`svgDisplay ${symbolsNumber === 2 ? 'twoDigits' : ''}`}>
                <div className="xDigits">
                    {diff && diff.map((xx, key) => {
                        return (
                            <DigitProcessor key={key} digitxx={'0'} />
                        )
                    })}
                    {digits.length > 0 && digits.map((digit, key) => {
                        return (
                            <DigitProcessor key={key} digitxx={`${digit}`} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default SvgDisplay