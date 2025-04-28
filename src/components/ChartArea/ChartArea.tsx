import Chart from 'react-apexcharts';

interface Serie {
  name: string;
  data: number[];
  color?: string;
}

export interface ChartAreaProps {
  categories: string[];
  series: Serie[];
}

export const ChartArea: React.FC<ChartAreaProps> = ({ categories, series }) => {
  return (
    <Chart
      className="min-w-2xl md:min-w-0 md:w-full" 
      options={{
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories,
          labels: {
            show: true,
          },
        },
      }}
      series={series}
      type="area"
      width="100%"
      height={350}
      theme={{
        mode: 'light',
      }}
    />
  );
};
