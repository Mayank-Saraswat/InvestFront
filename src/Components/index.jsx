import Graph from "../../../client/src/Components/graph";
import SliderPanel from "./sliderPanel";
import ErrorComp from "./errorComp";
import { React, useState, useEffect } from "react";
import axios from 'axios';

export default function SIPCalculator() {
  const [monthlyInvestment, setValueMonthlyInvestment] = useState(10000);
  const [investmentPeriod, setValueInvestmentPeriod] = useState(5);
  const [rateOfReturn, setValueRateOfReturn] = useState(10);
  const [rateOfInflation, setValueRateOfInflation] = useState(2);
  const [err,setError]= useState(false);
  const [inputVal, setInputVal] = useState();
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
        default:
    }
  }

  function handleChange(event, props,type)  {
    let val = event.target.value;
    setInputVal(val);
    if (Number(val) < props.min) {
      setError({[props.field]: true});
      changeValues(props.field, props.min);
    }
    else if (Number(val) > props.max) {
      setError({[props.field]: true});
      changeValues(props.field, props.max);
    }else{
      setError({[props.field]: false});
      changeValues(props.field, Number(val))
    }
    if(type=="blur"){
      setError(false);
    }
  }

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
          setResult(res.data.fresult);
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
    
      <SliderPanel
        field="monthlyInvestment"
        sliderLabel="Monthly Investment (Rs.)"
        min={500}
        max={1000000}
        steps={500}
        value={monthlyInvestment}
        handleChange={handleChange}
        inputError={err}
        inputVal={inputVal}
      />

      <SliderPanel
        field="investmentPeriod"
        sliderLabel="Investment Period (in years)"
        min={1}
        max={30}
        steps={1}
        value={investmentPeriod}
        handleChange={handleChange}
        inputError={err}
        inputVal={inputVal}
      />

      <SliderPanel
        field="rateOfReturn"
        sliderLabel="Expected Rate of Return(%p.a)"
        min={1}
        max={30}
        steps={0.1}
        value={rateOfReturn}
        handleChange={handleChange}
        inputError={err}
        inputVal={inputVal}
      />

      <SliderPanel
        field="rateOfInflation"
        sliderLabel="Expected Rate of Inflation(%p.a)"
        min={0}
        max={30}
        steps={0.1}
        value={rateOfInflation}
        handleChange={handleChange}
        inputError={err}
        inputVal={inputVal}
      />
      </div>

      <div className="rightContainer">
      {err ? <ErrorComp  /> : <Graph result={result}/>}
      </div>

    </div>
  )
}