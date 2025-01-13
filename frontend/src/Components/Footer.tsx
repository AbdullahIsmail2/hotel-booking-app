export default function Footer() {
  return (
    <div className='bg-blue-800 py-10 px-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <span className='text-xl sm:text-3xl text-white font-bold tracking-tight'>
          Radiant Resorts
        </span>
        <span className='text-white font-bold tracking-tight flex flex-col sm:flex-row gap-4'>
          <p className='cursor-pointer'>Privacy Policy</p>
          <p className='cursor-pointer'>Terms of Service</p>
        </span>
      </div>
    </div>
  )
}
