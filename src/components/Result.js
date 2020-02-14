import React from 'react'

function Result ({ result, openPopup }) {
    console.log('result: ', result);
    return (
        <div className="result" onClick={() => openPopup(result.imdbID)}>
            <img src={result.Poster} />
            <h3>{result.Title}</h3>
        </div>
    )
}

export default Result;