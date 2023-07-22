import { useState, useEffect } from "react";
import axios from "axios";

export const Quote = () => {
  const [quote, setQuote] = useState([]);

  const getQuote = async () => {
    const res = await axios("https://dummyjson.com/quotes/random");
    setQuote(res.data);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="absolute z-10 top-5 sm:top-20 left-5 sm:left-20 w-3/5 sm:w-2/5 text-slate-50">
      <p className="text-3xl font-poppins">{quote?.quote}</p>
      <p className="text-lg mt-3">{quote?.author}</p>
    </div>
  );
};
