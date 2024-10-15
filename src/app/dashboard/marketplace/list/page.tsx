import ListItemForm from '@/components/market/Lisrtform'
import React from 'react'

const page = () => {
  return (
    <div className=' space-y-6 '>
      <h1 className='text-2xl font-semibold text-center'>List Your Item for the Sell</h1>
      <div className='max-w-3xl mx-auto'>
      <ListItemForm />
      </div>
    </div>
  )
}

export default page