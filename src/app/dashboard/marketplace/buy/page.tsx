'use client'
import ItemCard from '@/components/market/ItemCard'
import SearchBar from '@/components/market/Searchbar'
import { Button } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const products = [
  {
    itemName: 'Tomato',
    description: 'Fresh tomatoes from local farms.',
    weight: '1000',
    priceRange: '60-100/kg',
    phoneLink: 'https://wa.me/1234567890',
    availabilityDate: '2024-11-01',
  },
  {
    itemName: 'Potato',
    description: 'High-quality potatoes, ideal for long storage.',
    weight: '500',
    priceRange: '30-50/kg',
    phoneLink: 'https://wa.me/+919353272203',
    availabilityDate: '2024-10-25',
  },
];

const Buy = () => {
  const router = useRouter()
  return (
    <div className=' space-y-6 '>
            <div className='flex items-center  '>
            <Button onClick={() => router.back()}><ArrowBigLeft /></Button>
    <h1 className=' flex-1 text-2xl font-semibold text-center'>Search what You need</h1>
    </div>
    <div className='max-w-3xl mx-auto'>
    <SearchBar onSearch={()=>console.log('clciked')} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <ItemCard
              key={index}
              itemName={product.itemName}
              description={product.description}
              weight={product.weight}
              priceRange={product.priceRange}
              phoneLink={product.phoneLink}
              availabilityDate={product.availabilityDate}
            />
          ))}
        </div>
  </div>
  )
}

export default Buy

 