import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    // setValue('city', shippingAddress.city);
    setValue('phone', shippingAddress.phone);
    // setValue('email', shippingAddress.email);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, phone }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, phone },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,

          phone,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address is more than 2 chars' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        {/* <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div> */}
        <div className="mb-4">
          <label htmlFor="phone">Phone Number</label>
          <input
            className="w-full"
            id="phone"
            pattern="[092]+[0-9]{6}|[0925]+[0-9]{7}|[093]+[0-9]{8}|[0940]+[0-9]{7}|[0941]+[0-9]{6}|[0942]+[0-9]{7}|[0943]+[0-9]{6}|[0944]+[0-9]{7}|[0945]+[0-9]{7}|[0946]+[0-9]{7}|[0947]+[0-9]{6}|[0948]+[0-9]{7}|[0949]+[0-9]{6}|[095]+[0-9]{6}|[0964]+[0-9]{5}|[0965]+[0-9]{7}|[0966]+[0-9]{5}|[0967]+[0-9]{5}|[0969]+[0-9]{7}|[0970]+[0-9]{7}|[0973]+[0-9]{6}|[0975]+[0-9]{7}|[0976]+[0-9]{7}|[0977]+[0-9]{7}|[0978]+[0-9]{7}|[0979]+[0-9]{7}|[0991]+[0-9]{6}|[0995]+[0-9]{7}|[0996]+[0-9]{7}|[0997]+[0-9]{7}|[98]+[0-9]{7}|[0999]+[0-9]{7}"
            {...register('phone', {
              required: 'Please enter phone number',
            })}
          />
          {errors.phone && (
            <div className="text-red-500 ">{errors.phone.message}</div>
          )}
        </div>
        {/* <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            className="w-full"
            id="email"
            {...register('email', {
              required: 'Please enter email',
            })}
          />
          {errors.email && (
            <div className="text-red-500 ">{errors.email.message}</div>
          )}
        </div> */}
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
