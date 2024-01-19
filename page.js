// pages/index.js
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/CurrencyConverter.module.css'
const API_KEY = 'ab01a415ddafcbc7eab02e5e';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const CurrencyConverter = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${fromCurrency}`);
        const options = Object.keys(response.data.conversion_rates);
        setCurrencyOptions(options);
      } catch (error) {
        console.error('Error fetching currency options:', error);
      }
    };

    fetchData();
  }, [fromCurrency]);

  useEffect(() => {
    const updateConvertedAmount = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${fromCurrency}`);
        const rates = response.data.conversion_rates;
        const rate = rates[toCurrency];
        const convertedAmount = amount * rate;
        setConvertedAmount(isNaN(convertedAmount) ? 0 : convertedAmount);
      } catch (error) {
        console.error('Error updating converted amount:', error);
      }
    };

    updateConvertedAmount();
  }, [fromCurrency, toCurrency, amount]);

  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.heading}>Currency Converter</h1>
    
     <div className={styles.one}>
      
      <div>
        <input className={styles.source} type="number" value={amount} onChange={handleAmountChange} placeholder='Enter Amount'/>
        <select className={styles.sourcesel}value={fromCurrency} onChange={(e) => handleFromCurrencyChange(e.target.value)}>
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>


      
      <div>
        <input className={styles.target} type="number" value={convertedAmount}placeholder='Converted Rate' readOnly />
        <select className={styles.targetsel} value={toCurrency} onChange={(e) => handleToCurrencyChange(e.target.value)}>
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>

    </div> 
  );
};

export default CurrencyConverter;
