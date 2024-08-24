import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm () {
    const [reiewText, setReviewText] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('/prediction', { reviewText });
            setPrediction(response.data.prediction);
        }
        catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Product Review and Sentiment Analysis</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="review-text" className="block text-gray-700 font-bold mb-2">Enter your review:</label>
                <textarea id="review-text" name="review-text" rows="5" className="w-full border rounded-lg p-2" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit   
            Review</button>
        </form>
        {prediction && (
            <div className="mt-4">
                <h2 className="text-xl font-bold">Predicted Sentiment:</h2>
                <p className="text-gray-700">{prediction}</p>
            </div>
        )}
        </div>
    );
}

export default ReviewForm;