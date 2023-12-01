import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React,{FC} from 'react';
import withObservables from '@nozbe/with-observables';
import {LineChart} from 'react-native-chart-kit';

import { observeWeights,WeightType } from '../data/helpers';

const windowDim = Dimensions.get('window');
const windowWidth = windowDim.width;
const primaryColor ='#FB8C00';
const Chart: FC<{weights: WeightType[]}> = ({weights}) => {
    if(weights.length<1){
        return null;
    }
    const labels: string[] = [];
  const data: number[] = [];
  weights.forEach((w:WeightType) => {
    labels.push(`${w?.createdAt.getDate()}/${w?.createdAt.getMonth() + 1}`);
    data.push(w?.weight);
  });
  return (
    <LineChart
    bezier
    height={250}
    width={windowWidth - 30}
    chartConfig={chartConfig}
    style={chartStyles.chart}
    data={{labels, datasets: [{data}]}}
  />
  )
}

const enhanceWithWeights = withObservables([], () => ({
    weights: observeWeights(),
  }));
  
export default enhanceWithWeights(Chart);

const chartStyles = StyleSheet.create({
    chart: {
      marginLeft: 15,
      borderRadius: 10,
    },
  });
  
  export const chartConfig = {
    backgroundColor: primaryColor,
    backgroundGradientFrom: primaryColor,
    backgroundGradientTo: '#FFA726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };