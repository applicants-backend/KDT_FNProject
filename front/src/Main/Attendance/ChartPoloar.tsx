import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
const options = {
  // 옵션 (1)
  // responsive: true,
  // 옵션 (2)
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  maintainAspectRatio : true
};

export function ChartPolar(props : any) {
  return <PolarArea data={props.data} options={options}/>;
}
