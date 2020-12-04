import React from 'react';
import { useSelector } from 'react-redux';

import { speedThroughWaterSelector } from '../duck';

import { DisplayContainer, Value, Unit, TextContainer } from './styles';

const Screen = () => {
    const speedThroughWater = useSelector(speedThroughWaterSelector);

    let displayValue = (speedThroughWater.value * 1.9438444924406)
        .toFixed(2)
        .split('.');

    displayValue = [
        displayValue[0].length === 1 ? `0${displayValue[0]}` : displayValue[0],
        displayValue[1].length === 1 ? `${displayValue[1]}0` : displayValue[1],
    ];

    displayValue = displayValue.join('.')

    return (
        <DisplayContainer>
            <TextContainer>
                <Value>{displayValue}</Value>
                <Unit>kt</Unit>
            </TextContainer>
        </DisplayContainer>
    )
};

export default Screen;
