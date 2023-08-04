function CardItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col w-[24%] p-4 h-[200px] bg-white rounded-[12px] font-bold gap-7'>
      {children}
    </div>
  )
}

export default CardItem
