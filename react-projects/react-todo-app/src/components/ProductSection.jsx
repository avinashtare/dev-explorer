import React from 'react';

function ProductSection() {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.map((product, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a href='/' className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={product.imageSrc}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                <h2 className="text-white title-font text-lg font-medium">{product.title}</h2>
                <p className="mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const products = [
  {
    imageSrc: 'https://dummyimage.com/420x260',
    title: 'The Catalyzer',
    price: '$16.00',
  },
  {
    imageSrc: 'https://dummyimage.com/421x261',
    title: 'Shooting Stars',
    price: '$21.15',
  },
  {
    imageSrc: 'https://dummyimage.com/422x262',
    title: 'Neptune',
    price: '$12.00',
  },
  {
    imageSrc: 'https://dummyimage.com/423x263',
    title: 'The 400 Blows',
    price: '$18.40',
  },
  {
    imageSrc: 'https://dummyimage.com/424x264',
    title: 'The Catalyzer',
    price: '$16.00',
  },
  {
    imageSrc: 'https://dummyimage.com/425x265',
    title: 'Shooting Stars',
    price: '$21.15',
  },
  {
    imageSrc: 'https://dummyimage.com/427x267',
    title: 'Neptune',
    price: '$12.00',
  },
  {
    imageSrc: 'https://dummyimage.com/428x268',
    title: 'The 400 Blows',
    price: '$18.40',
  },
];

export default ProductSection;
