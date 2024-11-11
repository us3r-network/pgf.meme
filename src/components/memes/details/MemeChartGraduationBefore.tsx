"use client";

import useLoadMemeOhlct from "@/hooks/trade/useLoadMemeOhlct";
import { MemeData } from "@/services/meme/types";
import { useEffect, useRef, memo, useState } from "react";
import {
  createChart,
  ColorType,
  Time,
  CandlestickData,
} from "lightweight-charts";

export type MemeChartData = Array<CandlestickData<Time>>;
function MemeChart({ data }: { data: MemeChartData }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const createTokenChart = (container: HTMLDivElement, data: MemeChartData) => {
    const chart = createChart(container, {
      layout: {
        textColor: "#FEFAF6",
        background: { type: ColorType.Solid, color: "#16181D" },
      },
      autoSize: true,
      localization: {
        priceFormatter: (price: number) => {
          return price.toFixed(6);
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        // minBarSpacing: 0.05,
        rightOffset: 12,
      },
      // rightPriceScale: {
      //   scaleMargins: {
      //     top: 0.1,
      //     bottom: 0.1,
      //   },
      // },
    });
    const candlestickSeries = chart.addCandlestickSeries({
      borderVisible: false,
      upColor: "green",
      downColor: "red",
      wickUpColor: "green",
      wickDownColor: "red",
      borderDownColor: "red",
      borderUpColor: "green",
    });

    candlestickSeries.setData(data || []);

    // // 找到最高价
    // const highestPrice = Math.max(...data.map((d) => d.high));

    // // 在价格轴显示最高价
    // const priceLine = candlestickSeries.createPriceLine({
    //   price: highestPrice,
    //   // lineWidth: 2,
    //   // lineStyle: 1, // 实线
    //   // axisLabelVisible: true,
    //   // title: `${highestPrice}`,
    // });

    const handleResize = () => {
      chart.applyOptions({ width: container?.clientWidth });
    };

    return { chart, handleResize };
  };
  useEffect(() => {
    if (!chartContainerRef?.current || data.length === 0) return;
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

function MemeChartGraduationBefore({ meme }: { meme: MemeData }) {
  const { address } = meme;
  const { ohlct, pending, loadMemeOhlct } = useLoadMemeOhlct({
    address: address,
  });
  useEffect(() => {
    loadMemeOhlct();
  }, []);
  if (pending) {
    return (
      <div className="flex justify-center items-start gap-6">Loading...</div>
    );
  }

  return <MemeChart data={ohlct as MemeChartData} />;
}

export default memo(MemeChartGraduationBefore);
