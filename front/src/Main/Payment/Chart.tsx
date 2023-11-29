import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  DoughnutController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  DoughnutController
);

export function Chartex(props : any) {
  const options = {
    // 옵션 (1)
    responsive: true,
    // 옵션 (2)
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    // 옵션 (3)
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#E3E3E3",
        },
      },
    },
  };
  return <Chart type='bar' data={props.data} options={options}/>;
}

