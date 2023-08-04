function PercentRange({ percent }: { percent: number }) {
  return (
    <div className='percent-range relative w-full h-[24px] rounded-[20px] bg-[#bdc3c7] '>
      <div
        style={{ width: `${percent}%` }}
        className={`percent absolute h-[24px] bg-[#3498db] flex justify-center items-center rounded-[20px] text-[12px]`}
      >
        {percent}%
      </div>
    </div>
  )
}

export default PercentRange
