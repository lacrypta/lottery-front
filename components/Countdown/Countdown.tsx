import Counter from "./Counter";

interface ICountdownProps {
  play: boolean;
  delay?: number;
  limit?: number;
}

function generateCounters(limit: number, delay: number) {
  const res = [];
  for (let i = limit; i >= 1; i--) {
    res.push(<Counter key={i} delay={delay * (limit - i)} value={i} />);
  }
  return res;
}

const Countdown = ({ play, limit = 5, delay = 1000 }: ICountdownProps) => {
  return <>{play ? generateCounters(limit, delay) : ""}</>;
};

export default Countdown;
