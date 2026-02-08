import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Stat } from '../../../domain/stat';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface Props {
    stats: Stat[];
}

export function PokemonRadarChart({ stats }: Props) {
    const data = {
        labels: stats.map(s => s.name.toUpperCase()),
        datasets: [
            {
                label: 'Stats',
                data: stats.map(s => s.value),
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.3)',
                },
                pointLabels: {
                    color: 'white',
                    font: {
                        size: 10
                    }
                },
                ticks: {
                    display: false,
                    backdropColor: 'transparent'
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false
    };

    return <Radar data={data} options={options} />;
}
