import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

interface BetHistoryChartProps {
  bets: any[];
}

export function BetHistoryChart({ bets }: BetHistoryChartProps) {
  const sortedBets = [...bets].sort((a, b) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  let runningBalance = 0;
  const balanceHistory = sortedBets.map(bet => {
    runningBalance += bet.profit_loss || 0;
    return runningBalance;
  });

  const data = {
    labels: sortedBets.map(bet => format(new Date(bet.created_at), 'MMM d, yyyy')),
    datasets: [
      {
        label: 'Balance History',
        data: balanceHistory,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Balance: $${context.raw.toFixed(2)}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value}`
        }
      }
    }
  };

  return (
    <div className="h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}