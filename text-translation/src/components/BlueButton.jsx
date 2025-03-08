import React from 'react'
import '../styles/BlueButton.css'

export default function BlueButton({loading, text}) {
    return (
        <div id="blue-button">
            <button type="submit" disabled={loading}>
                {loading ? <span className="spinner"></span> : text}
            </button>
        </div>
    )
}
