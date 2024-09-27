import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import FormHeading from './FormHeading';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice('');
        setImage(null); // Reset the file input
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='h-full flex items-center justify-center'>
      <div className=" border border-primary p-5 max-w-xl w-full rounded-xl">
        <FormHeading text={"Add New Product"} />
        <form className="flex flex-col gap-3" onSubmit={handleAddProduct}>
          <Input type={"text"} placeholder={"Enter title"} name={"title"} value={title} setValue={setTitle} />
          <Input type={"text"} placeholder={"Enter description"} name={"description"} value={description} setValue={setDescription} />
          <Input type={"text"} placeholder={"Enter category"} name={"category"} value={category} setValue={setCategory} />
          <Input type={"number"} placeholder={"Enter price"} name={"price"} value={price} setValue={setPrice} />

          {/* File Input for Image */}
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])} // Get the selected file
            accept="image/*"
            className='file-input w-full'
          />

          <Button type={"submit"} text={"Add product"} loading={loading} />
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
