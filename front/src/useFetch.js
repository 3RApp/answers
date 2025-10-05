import { useState, useEffect } from 'react';

export const useFetch = (url, ...dependencies) => {

  const [answers, setAnswers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
            setError(data.error);
            setAnswers(null);
            setLoading(false);
            } else {
            setAnswers(data);
            setError(null);
            setLoading(false);
            }
        });
    }, dependencies);

    return {
        answers: [answers, setAnswers],
        loading: [loading, setLoading],
        error: [error, setError]
    }
};