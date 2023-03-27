import Calculator from "./calculator";
import Graph from "../../../client/src/Components/graph";
import ErrorComp from "../../../client/src/Components/errorComp";
import { React, useState, useEffect } from "react";
import axios from 'axios';

export default function SIPCalculator() {
  const [monthlyInvestment, setValueMonthlyInvestment] = useState(10000);
  const [investmentPeriod, setValueInvestmentPeriod] = useState(5);
  const [rateOfReturn, setValueRateOfReturn] = useState(10);
  const [rateOfInflation, setValueRateOfInflation] = useState(2);
  const [err,setError]= useState(false);
  const [result, setResult] = useState();
  
  function changeValues(name, val) {
    switch (name) {
      case "monthlyInvestment": 
        setValueMonthlyInvestment(val);
        break;
      case "investmentPeriod":
        setValueInvestmentPeriod(val);
        break;
      case "rateOfReturn":
        setValueRateOfReturn(val);
        break;
      case "rateOfInflation":
        setValueRateOfInflation(val);
        break;
    }
  }

  function handleSliderChange(event, newValue, field){
    changeValues(field, newValue)
  };

  function handleInputChange(event, newValue, props){
    let val = newValue


    if (Number(val) < props.min) {
      changeValues(props.field, props.min);
    }

    if (Number(val) > props.max) {
        changeValues(props.field, props.max);
    }
    changeValues(props.field, event.target.value === '' ? '' : Number(event.target.value))
  };

  function handleBlur(event, newValue, props){
    let val = newValue 
    console.log(props.min)
    if (val <= 0) {
        alert("Please enter valid value greater than zero");
        changeValues(props.field, props.min);
        return;
    }

    if (Number(val) < props.min) {
        changeValues(props.field, props.min);
        return;
    }
    if (Number(val) > props.max) {
        changeValues(props.field, props.max);
        return;
    }
  };


  useEffect(() => {   
    axios.get('/api', {
      params: {
        monthlyInvestment: monthlyInvestment,
        investmentPeriod: investmentPeriod,
        rateOfReturn: rateOfReturn,
        rateOfInflation: rateOfInflation,
      },
    })
    .then((res) =>{
        if(res.data && res.data.status == -1){
          setError(true);
        }
        else{
          setResult(res.data && res.data.fresult);
          setError(false);
          }    
      }
    )
    
  }, [monthlyInvestment, investmentPeriod, rateOfReturn, rateOfInflation]);


  return (
    <div className='rightMain'>
      <br />
      <div className="calculatorText">
        <h2>SIP Calculator</h2>
        <p>It tells you how much wealth you can create by making monthly investment</p>
      </div>

      <div className="leftContainer">
        <Calculator
          monthlyInvestment={monthlyInvestment}
          investmentPeriod ={investmentPeriod}
          rateOfReturn ={rateOfReturn}
          rateOfInflation ={rateOfInflation}
          handleSliderChange={handleSliderChange}
          handleInputChange={handleInputChange}
          handleBlur={handleBlur}
          />
      </div>

      <div className="rightContainer">
        {err ? <ErrorComp/> : <Graph result={result}/>}
      </div>

    </div>
  )
}
