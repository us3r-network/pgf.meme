"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  Time,
  CandlestickData,
} from "lightweight-charts";
export const mockMemeChartdata = [
  { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
  { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
  { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
  { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
  { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
  { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
  { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
  { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
  { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
  { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
] as MemeChartData;

export type MemeChartData = Array<CandlestickData<Time>>;
export default function MemeChart({ data }: { data: MemeChartData }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const createTokenChart = (container: HTMLDivElement, data: MemeChartData) => {
    const chartOptions = {
      layout: {
        textColor: "#FEFAF6",
        background: { type: ColorType.Solid, color: "#16181D" },
      },
      autoSize: true,
    };
    const chart = createChart(container, chartOptions);
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData(data || []);
    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({ width: container?.clientWidth });
    };

    return { chart, handleResize };
  };
  useEffect(() => {
    if (!chartContainerRef?.current) return;
    const { chart, handleResize } = createTokenChart(
      chartContainerRef.current,
      data
    );

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);
  return (
    <div className="w-full h-full p-2 border rounded-2xl box-border bg-[#16181D] overflow-hidden">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
