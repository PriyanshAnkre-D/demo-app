// import CandleSticks from "../components/candleSticks";
import dynamic from "next/dynamic";

export default function Home() {
  const CandleSticks = dynamic(import('../components/candleSticks'), { ssr: false });
  return (
    <>
      <CandleSticks />
    </>
  )
}
