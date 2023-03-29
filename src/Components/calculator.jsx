import React from "react";
import SliderPanel from "./sliderPanel";

export default function Calculator(props) {
  return (
    <div>
      <SliderPanel
        field="monthlyInvestment"
        sliderLabel="Monthly Investment (Rs.)"
        min={10000}
        max={1000000}
        steps={500}
        value={props.monthlyInvestment}
        handleChange={props.handleChange}
        error={props.error}
      />

      <SliderPanel
        field="investmentPeriod"
        sliderLabel="Investment Period (in years)"
        min={1}
        max={30}
        steps={1}
        value={props.investmentPeriod}
        handleChange={props.handleChange}
        error={props.error}
      />

      <SliderPanel
        field="rateOfReturn"
        sliderLabel="Expected Rate of Return(%p.a)"
        min={1}
        max={30}
        steps={0.1}
        value={props.rateOfReturn}
        handleChange={props.handleChange}
        error={props.error}
      />

      <SliderPanel
        field="rateOfInflation"
        sliderLabel="Expected Rate of Inflation(%p.a)"
        min={0}
        max={30}
        steps={0.1}
        value={props.rateOfInflation}
        handleChange={props.handleChange}
        error={props.error}
      />
    </div>
  );
}
