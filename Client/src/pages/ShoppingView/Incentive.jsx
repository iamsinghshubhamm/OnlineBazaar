const incentives = [
    {
      name: 'Free Shipping',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
      description: 'We offer free shipping on all orders over $50. Get your products delivered at no extra cost.',
    },
    {
      name: '10-Year Warranty',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
      description: 'Our products come with a 10-year warranty. If anything breaks, we’ll replace it for free.',
    },
    {
      name: 'Hassle-Free Exchanges',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
      description: 'Don’t like it? Exchange it easily within 30 days with no questions asked.',
    },
  ];
  
  export default function Incentives() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-2 py-4 sm:py-14 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white px-6 py-0 sm:py-6 sm:p-16">
            <div className="mx-auto max-w-xl lg:max-w-none">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
                  Why Shop With Us?
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  We prioritize customer satisfaction and make shopping as seamless as possible.
                </p>
              </div>
              <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3">
                {incentives.map((incentive) => (
                  <div key={incentive.name} className="text-center sm:flex sm:text-left lg:block lg:text-center">
                    <div className="sm:flex-shrink-0">
                      <div className="flow-root">
                        <img src={incentive.imageSrc} alt={incentive.name} className="mx-auto h-16 w-16" />
                      </div>
                    </div>
                    <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                      <h3 className="text-lg font-medium text-gray-900">{incentive.name}</h3>
                      <p className="mt-2 text-base text-gray-500">{incentive.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  