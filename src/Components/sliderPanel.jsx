import {React} from "react";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';

const mark1 = [{
    value: 50000,
    label: '50000',
},
{
    value: 240000,
    label: '240000',
},
{
    value: 430000,
    label: '430000',
},
{
    value: 620000,
    label: '620000',
},
{
    value: 810000,
    label: '810000',
},
{
    value: 1000000,
    label: '1000000',
},
];

const mark2 = [{
    value: 1,
    label: '1',
},
{
    value: 6,
    label: '6',
},
{
    value: 12,
    label: '12',
},
{
    value: 18,
    label: '18',
},
{
    value: 24,
    label: '24',
},
{
    value: 30,
    label: '30',
},
];

const Input2 = styled(MuiInput)`width: 110px;`;

export default function SliderPanel(props) {
    return (
        <>
            <br />
            <div className= "sliderPanelDiv">
                <Box sx={{ maxWidth: 570, margin: 1 }}>

                    <div className="sliderhead">
                        <h3>{props.sliderLabel}</h3>
                    </div>

                    <div className="Input">
                        <Grid className="demo" container>
                            <Input2
                                type="number"
                                value={props.value}
                                size="small"
                                onBlur={(event)=>props.handleChange(event, props)}
                                onChange={(event)=>props.handleChange(event, props)}
                                inputProps={{
                                    step: props.steps,
                                    min: props.min,
                                    max: props.max
                                }}
                            />
                        </Grid>
                    </div>
                    
                    <br />
                    {props.error && props.error && <div className="error">Invalid Input</div>}
                    <Grid className="slider">
                        <Slider
                            defaultValue={props.value}
                            min={props.min}
                            max={props.max}
                            step={props.steps}
                            marks={props.field === 'monthlyInvestment' ? mark1 : mark2}
                            onChange={(event)=>props.handleChange(event, props)}
                            valueLabelDisplay="auto"
                            value={props.value}
                        />
                    </Grid>
                </Box>
            </div>
        </>
    )
}