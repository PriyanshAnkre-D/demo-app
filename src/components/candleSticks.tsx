import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { TimeFrameContainer } from './timeFrameContainer'


function CandleSticks() {
  const [data,setData] = useState([])
  const [ohlcVal,setOhlcVal] = useState([])
  const [timerValue, setTimerValue] = useState<string>('1m')
  const options:ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      events:{
        mouseMove(e, chart, config) {
          const isData = config?.config?.series[0].data[config.dataPointIndex]?.y || []
          if (isData.length) {
            setData(isData)
          }     
        },
      }
    },
      title: {
        text: `BTC/USD O:${data[0] || ''} H:${data[1] || ''} L:${data[2] || ''} C:${data[3] || ''}`,
        align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      opposite:true,
      labels:{
        formatter(val) {
          return parseInt(val.toString()).toString()
        },
      }
    },
    tooltip:{
      enabled:true,
      fixed:{
        enabled:true,
        position:'topLeft'
      },
      custom() {
        return(
          '<div style={{display:"none"}}></div>'
        )
      },
    },
    grid:{
      show:true,
      xaxis:{
        lines:{
          show: true,
        }
      },
      yaxis:{
        lines:{
          show: true,
        }
      }
    },
  }
  useEffect(() => {
    fetch(`candles/trade:${timerValue}:tBTCUSD/hist?end=${new Date().getTime()}&limit=50`)
    .then((res)=>res.json())
    .then(res=>{
      const updatedRes = (res || []).map((item:number[])=>{
        const [isTime,...rest] = item
        return({
          x : new Date(isTime),
          y : rest
        })
      })
      setOhlcVal(updatedRes)
    })
  }, [timerValue])
  

  return (
    <>
      <Chart options={options} series={[{data : ohlcVal}]} type="candlestick" height={350} />
      <TimeFrameContainer onClick={(val:string)=>setTimerValue(val)} />
    </>
  )
}

export default CandleSticks