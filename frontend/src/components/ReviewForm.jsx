import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm () {
    const [reviewText, setReviewText] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try{
            const response = await axios.post('http://localhost:5000/prediction', { reviewText });
            setPrediction(response.data.prediction);
        }
        catch (error) {
            console.error('Error submitting review:', error);
        }
        finally {
            setIsLoading(false);
          }
    };

    const handleReload = () => {
        setReviewText('');
        setPrediction(null);
        setIsLoading(false);
      };
    
    return (
        <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Sentiment Analysis</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="review-text" className="block text-gray-700 font-bold mb-2">Enter your review:</label>
          <textarea id="review-text" name="review-text" rows="5" className="w-full border rounded-lg p-2" value={reviewText} onChange={(e) => setReviewText(e.target.value)} required/>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
          {isLoading   
 ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <path d="M12,7a5,5,0,0,1,5,5V12a5,5,0,0,1-5,5H7a5,5,0,0,1-5-5V12a5,5,0,0,1,5-5Z" />
            </svg>
          ) : (
            'Submit Review'
          )}
        </button>
        <button type="button" onClick={handleReload} className="bg-gray-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded ml-4">
        Reload
        </button>
      </form>
      {prediction && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Predicted Sentiment:</h2>
          <p className="text-white-700">{prediction}</p>
        </div>
      )}
    </div>
    );
}

export default ReviewForm;