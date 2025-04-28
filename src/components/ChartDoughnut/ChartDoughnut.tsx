import React from 'react';
import Chart from 'react-apexcharts';

export interface ChartDoughnutProps {
  colors: string[];
  labels: string[];
  series: number[];
  width?: number;
}

export const ChartDoughnut: React.FC<ChartDoughnutProps> = ({
  colors,
  labels,
  series,
  width = 450,
}) => {
  return (
    <Chart
      className="max-h-64"
      type="donut"
      series={series}
      width={width}
      height={260}
      options={{
        chart: {
          type: 'donut',
          background: 'none',
        },
        dataLabels: {
          enabled: false,
          dropShadow: {
            enabled: false,
          },
          textAnchor: 'end',
        },
        legend: {
          show: true,
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            startAngle: -90,
            endAngle: 270,
            donut: {
              size: '70%',
            },
            dataLabels: {
              offset: 27,
              minAngleToShowLabel: -5,
            },
          },
        },
        labels,
        colors,
        grid: {
          padding: {
            top: 5,
            bottom: 10,
            right: -10,
            left: -10,
          },
        },
      }}
    />
  );
};
