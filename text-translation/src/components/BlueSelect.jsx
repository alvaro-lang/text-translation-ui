import React from 'react'
import '../styles/BlueSelect.css'

export default function BlueSelect({defaultOption, arrayOptions, submited, translationDataAtribute, onChangeFunction}) {
    return (
        <select id='blue-select' className={submited && !translationDataAtribute ? 'blinking' : ""} onChange={onChangeFunction} defaultValue="">
            <option value="" disabled>
                {defaultOption}
            </option>
            {arrayOptions.map((item, index) => (
                <option key={index} value={item}>
                {item}
                </option>
            ))}
        </select>
    )
}
