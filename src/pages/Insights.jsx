import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerInsights } from '../context/seller.slice.js';
import Loader from '../components/Loader';
import StatCard from '../components/StatCard';
import { CircleDollarSign, ShoppingCart, Package } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const Insights = () => {
    const dispatch = useDispatch();
    const { insights, insightsStatus, insightsError } = useSelector((state) => state.seller);
    const [duration, setDuration] = useState(6);

    useEffect(() => {
        if (insightsStatus === 'idle') {
            dispatch(fetchSellerInsights());
        }
    }, [insightsStatus, dispatch]);

    if (insightsStatus === 'loading' || insightsStatus === 'idle') {
        return <Loader />;
    }

    if (insightsStatus === 'failed') {
        return <div className="w-full h-screen flex justify-center items-center text-2xl text-red-500">Error: {insightsError}</div>;
    }

    const chartLabels = insights.monthlySales.labels.slice(-duration);
    const chartValues = insights.monthlySales.values.slice(-duration);

    const eChartOption = {
        title: {
            text: `Sales Revenue (Last ${duration} Months)`,
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['Monthly Sales'],
            bottom: 10,
        },
        xAxis: {
            type: 'category',
            data: chartLabels,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Monthly Sales',
                type: 'bar',
                data: chartValues,
                itemStyle: {
                    color: 'rgba(10, 140, 222, 200)',
                },
            },
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true,
        },
    };

    return (
        <div className=" h-screen w-full bg-gray-100 p-4 sm:p-6 md:p-8 overflow-y-auto relative max-sm:pb-14">
            
<h1 className="text-3xl font- absolute TEXT-GRAY-800 w-full top-0 left-0 pl-3 pt-4  text-gray-400 mb-6">SELLER INSIGHTS.</h1>
            {/* Stats Grid */}
            <div className="w-full md:h-1/5 pt-2 sm:p-4 mt-10 flex flex-wrap gap-3 sm:gap-6 ">
            
                
                <StatCard
                    title="Orders"
                    value={insights.totalOrders}
                    icon={<ShoppingCart className="w-8 h-8 text-white" />}
                    styles="bg-gradient-to-r from-yellow-400 to-orange-500 max-sm:w-[47%] w-full flex-1"
                />
                <StatCard
                    title="Products"
                    value={insights.totalProducts}
                    icon={<Package className="w-8 h-8 text-white" />}
                    styles="bg-gradient-to-r from-purple-400 to-pink-500 max-sm:w-[47%] flex-1"
                />
                <StatCard
                    title="Total Revenue"
                    value={`Rs.${insights.totalRevenue?.toFixed(2)}`}
                    icon={<CircleDollarSign className="w-8 h-8 text-white" />}
                    styles="bg-gradient-to-r from-green-400 to-blue-500 sm:flex-1 w-full"
                />
            </div>

            {/* Monthly Sales Chart */}
            <div className=' bg-white rounded h-5/7 mt-4 sm:mx-4  flex flex-col max-md:justify-right justify-center items-center overflow-hiddenn shadow'>

                <div className="flex justify-center m-4">
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${duration === 6 ? 'bg-black text-white' : 'bg-white text-black'}`}
                        onClick={() => setDuration(6)}
                    >
                        Last 6 Months
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${duration === 12 ? 'bg-black text-white' : 'bg-white text-black'}`}
                        onClick={() => setDuration(12)}
                    >
                        Last 12 Months
                    </button>
                </div>
                <div className="p-4 backdrop-blur-2xl rounded-xs w-full md:w-3/4 h-full">
                    <ReactECharts option={eChartOption} style={{ height: '100%', width: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Insights;