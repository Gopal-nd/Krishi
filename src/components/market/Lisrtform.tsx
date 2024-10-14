'use client'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface ListItemFormProps {}

const ListItemForm: React.FC<ListItemFormProps> = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [phoneLink, setPhoneLink] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to API)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block font-medium ">Item Name</label>
          <Input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="e.g., Tomato"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium ">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Fresh tomatoes from the farm"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium ">Estimated Product Weight (kg)</label>
          <Input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 1000kg"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium ">Estimated Price Range (per kg)</label>
          <Input
            type="text"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            placeholder="e.g., 60-100/kg"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium ">Phone/WhatsApp Link</label>
          <Input
            type="text"
            value={phoneLink}
            onChange={(e) => setPhoneLink(e.target.value)}
            placeholder="e.g., https://wa.me/1234567890"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium ">Estimated Availability Date</label>
          <Input
            type="date"
            value={availabilityDate}
            onChange={(e) => setAvailabilityDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-md">
          List Item
        </button>
      </div>
    </form>
  );
};

export default ListItemForm;
