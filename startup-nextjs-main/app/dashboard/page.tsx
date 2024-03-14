"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const dashboard = () => {
    const [purchasedStocks, setPurchasedStocks] = useState([]);
    const [investedValue, setInvestedValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    
  useEffect(() => {
    const fetchStockData = async () => {

      try {

        const token = Cookies.get('token');
        const stockValuesResponse = await axios.post('http://localhost:5000/api/get-stock-values',{token});
        // console.log(stockValuesResponse);

        let invested = 0;
        let current = 0;
        stockValuesResponse.data.forEach(stock => {
          invested += stock.purchasedValue; 
          current += stock.currentPrice;
        });

        setPurchasedStocks(stockValuesResponse.data);
        setInvestedValue(invested);
        setCurrentValue(current);
        console.log(purchasedStocks);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData(); 
  },[]);
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
              Ka-ching! Those dividends are stacking up like pancakes
              </h2>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Invested
                      </label>
                      <p
                        placeholder="Invested"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      >{investedValue}</p>
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Current
                      </label>
                      <p
                        placeholder="Current"
                        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      >{currentValue}</p>
                    </div>
                  </div>
                  <div className="w-full px-4">
                  <div className="mb-8">
  <label
    htmlFor="stocks-table" // Adjust the 'for' attribute if needed
    className="mb-3 block text-sm font-medium text-dark dark:text-white"
  >
     Your Stocks
  </label>

  {/* Table Structure */}
  <table className="w-full table-auto"> {/* Adjust styling as needed */}
    <thead>
      <tr>
        <th className="px-4 py-2">Stock Name</th>
        <th className="px-4 py-2">Value</th>
      </tr>
    </thead>
    <tbody>
      {/* Map through your purchased stocks */}
      {purchasedStocks.map((stock, index) => (
        <tr key={index}> 
          <td className="px-4 py-2">{stock.stockName}</td>
          <td className="px-4 py-2">{stock.value}</td> 
        </tr>
      ))}
    </tbody>
  </table>

</div>

                  </div>
                  <div className="w-full px-4">
                    <button className="shadow-submit dark:shadow-submit-dark rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90">
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default dashboard;
