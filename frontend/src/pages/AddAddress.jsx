import React, { useState } from 'react'
import { assets } from '../assets/assets'

const InputField=({type,placeholder,name,handleChange,address})=>(
<input className='w-full px-2 py-2.5 border border-gray-500/30 rounded-md outline-none focus:border-green-500'
     type={type}
     placeholder={placeholder}
     name={name}
     value={address[name]}
     onChange={handleChange}   
     required 
 />
)


const AddAddress = () => {

    const [address, setAddress]= useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    })
    const handleChange= (e) => {
        const {name, value} = e.target;
        setAddress({
            ...address,
            [name]: value
        })
    }

  const onSubmitHandler= (e) => {
    e.preventDefault();
  }

  return (
    <div className='mt-16 pb-16 '>
        <p className='text-2x1 md:text-3x1 text-gray-500 ' >Add Shipping
             <spam className="font-semibold text-green-500"> Address</spam></p>
        <div className='mt-10 flex flex-col-reverse md:flex-row justify-between'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm '>
                    
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            address={address}
                            handleChange={handleChange}
                        />
                        <InputField
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            address={address}
                            handleChange={handleChange}
                        />
                    </div>
                    <InputField
                        type="email"
                        placeholder="Email"
                        name="email"
                        address={address}
                        handleChange={handleChange}
                    />
                    <InputField
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        address={address}
                        handleChange={handleChange}
                    />
                    <InputField
                        type="text"
                        placeholder="Street Address"
                        name="streetAddress"
                        address={address}
                        handleChange={handleChange}
                    />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            type="text"
                            placeholder="City"
                            name="city"
                            address={address}
                            handleChange={handleChange}
                        />
                        <InputField
                            type="text"
                            placeholder="State"
                            name="state"
                            address={address}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                            type="number"
                            placeholder="Zip Code"
                            name="zipCode"
                            address={address}
                            handleChange={handleChange}     
                        />      
                        <InputField
                            type="text"
                            placeholder="Country"
                            name="country"
                            address={address}
                            handleChange={handleChange}     
                        />      
                    </div>
                    <button type="submit" className='w-full bg-green-500 text-white py-2.5 rounded-md
                     hover:bg-green-600 transition font-medium mt-4'>
                        Save Address
                    </button>




                </form>

            </div>
            <img src={assets.add_address_iamge} alt="add address" className="md:mr-16 mb-16 md:mt-0"/>
        </div>

    </div>
  )
}

export default AddAddress