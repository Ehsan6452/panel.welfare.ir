import React, { useEffect, useState, useRef } from "react";
import { useDeviceType } from "../../../Hooks/useDeviceType";
import ReportCard from "../../../Components/ReportCard/Report-card";
import QuickView from "../../../Components/QuickView/QuickView";
import { reportApi, orderApi, commentApi, paymentApi, supportApi } from '../../../Services/Api';
import './style.css';
import DetailModal from "../../../Components/Modal/DetailModal";

function Dashboard() {

    // states for modal  
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [modalType, setModalType] = useState('');
    //
    const [saleReport, setSaleReport] = useState({});
    const [viewReport, setViewReport] = useState({});
    const [inventoryReport, setInventoryReport] = useState({});
    const [accountReport, setAccountReport] = useState({});
    // ── اسلایدر ──
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderTrackRef = useRef(null);
    const {deviceType} = useDeviceType();
    // Quick View states
    const [quickViewTabs] = useState(['سفارشات', 'نظرات مشتریان', 'مدیریت مالی', 'پشتیبانی'])
    const [quickViewOrders , setQuickViewOrders] = useState([]);
    const [quickViewComments , setQuickViewComments] = useState([]);
    const [quickViewPayments , setQuickViewPayments] = useState([]);
    const [quickViewSupport , setQuickViewSupport] = useState([]);
    const [quickViewValues , setQuickViewValues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const totalSlides = deviceType === "mobile" ? 4 : deviceType === "tablet" ? 2 : 1;

    useEffect(() => {
    setCurrentSlide(0);
    }, [deviceType]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goNext = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const goPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const generateQuickViewValues = (
        ordersData,
        commentsData,
        paymentsData,
        supportData
    ) => {
        const quickViewOrdersTabs = ['شناسه', 'تاریخ', 'مشتری', 'مبلغ', 'وضعیت'];
        const quickViewCommentsTabs = ['شناسه', 'تاریخ', 'محصول', 'مشتری', 'متن', 'وضعیت'];
        const quickViewPaymentsTabs = ['شناسه', 'تاریخ', 'مبلغ', 'نوع سند', 'موجودی حساب'];
        const quickViewSupportTabs = ['شناسه', 'تاریخ', 'عنوان', 'دپارتمان', 'وضعیت'];

        setQuickViewValues([
            {
                titles: quickViewOrdersTabs,
                data: ordersData // از پارامترها استفاده می‌کنیم
            },
            {
                titles: quickViewCommentsTabs,
                data: commentsData
            },
            {
                titles: quickViewPaymentsTabs,
                data: paymentsData
            },
            {
                titles: quickViewSupportTabs,
                data: supportData
            }
        ]);
        // console.log('Quick view values generated:', quickViewValues); // این لاگ هم باید بعد از state آپدیت شود
    };

   
    useEffect(() => {
        const fetchSaleReport = async () => {
            try {
                const data = await reportApi.getSaleReport();
                setSaleReport(data);
            } catch (error) {
                console.error('Error fetching sale reports', error);
            }
        };
        fetchSaleReport();
        const intervalId = setInterval(fetchSaleReport, 300000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchViewReport = async () => {
            try {
                const data = await reportApi.getViewReport();
                setViewReport(data);
            } catch (error) {
                console.error('Error fetching view reports', error);
            }
        };
        fetchViewReport();
        const intervalId = setInterval(fetchViewReport, 300000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchInventoryReport = async () => {
            try {
                const data = await reportApi.getInventoryReport();
                setInventoryReport(data);
            } catch (error) {
                console.error('Error fetching inventory reports', error);
            }
        };
        fetchInventoryReport();
        const intervalId = setInterval(fetchInventoryReport, 300000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchAccountReport = async () => {
            try {
                const data = await reportApi.getAccountReport();
                setAccountReport(data);
            } catch (error) {
                console.error('Error fetching accountant reports', error);
            }
        };
        fetchAccountReport();
        const intervalId = setInterval(fetchAccountReport, 300000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setIsLoading(true); 
                const [
                    ordersData,
                    commentsData,
                    paymentsData,
                    supportData
                ] = await Promise.all([ 
                    orderApi.getAll(),
                    commentApi.getAll(),
                    paymentApi.getAll(),
                    supportApi.getAll()
                ]);

                setQuickViewOrders(ordersData);
                setQuickViewComments(commentsData);
                setQuickViewPayments(paymentsData);
                setQuickViewSupport(supportData);

                generateQuickViewValues(
                    ordersData,
                    commentsData,
                    paymentsData,
                    supportData
                );

            } catch (error) {
                console.log('Fetch quick view data failed:', error);

            } finally {
                setIsLoading(false); 
            }
        };

        fetchAllData();
    },[]);

    useEffect(()=>{
        generateQuickViewValues();
    },[])
    
    const cards = [
        <ReportCard tabs={saleReport.tabs} values={saleReport.values} info={saleReport.info} />,
        <ReportCard tabs={viewReport.tabs} values={viewReport.values} info={viewReport.info} />,
        <ReportCard tabs={inventoryReport.tabs} values={inventoryReport.values} info={inventoryReport.info} />,
        <ReportCard tabs={accountReport.tabs} values={accountReport.values} info={accountReport.info} />,
    ];
 
    const buildSlides = () => {
        if (deviceType === "desktop") {
            // همه 4 کارت در یک ردیف
            return (
                <div className="dt-slide">
                    {cards.map((card, i) => (
                        <div key={i} className="dt-card-wrapper">{card}</div>
                    ))}
                </div>
            );
        }

        if (deviceType === "tablet") {
            // 2 اسلاید، هر اسلاید 2 کارت
            return [0, 1].map((slideIndex) => (
                <div key={slideIndex} className="slider-slide">
                    <div className="dt-card-wrapper">{cards[slideIndex * 2]}</div>
                    <div className="dt-card-wrapper">{cards[slideIndex * 2 + 1]}</div>
                </div>
            ));
        }

        // mobile: 4 اسلاید، هر اسلاید 1 کارت
        return cards.map((card, i) => (
            <div key={i} className="slider-slide">
                <div className="dt-card-wrapper">{card}</div>
            </div>
        ));
    };

    //modal
    const onRowClickHandler = (id , activeTab) =>{

        const fetchOrderById = async (id) =>
        {
            const res = await orderApi.getById(id);
            setSelectedRow(res);
        }
        const fetchCommentsById = async (id) =>
        {
            const res = await commentApi.getById(id);
            setSelectedRow(res);
        }
        const fetchPaymentsById = async (id) => 
        {
            const res = await paymentApi.getById(id);
            setSelectedRow(res);
        }
        const fetchSupportsById = async (id) => 
        {
            const res =  await supportApi.getById(id);
            setSelectedRow(res);
        }


        switch (activeTab) {
            case 'سفارشات':
                fetchOrderById(id);
                setModalType('orders');
                break;
            case 'نظرات مشتریان':
                fetchCommentsById(id);
                setModalType('comments');
                break;
            case 'مدیریت مالی':
                fetchPaymentsById(id);
                setModalType('payments');
                break;
            case 'پشتیبانی':
                fetchSupportsById(id);
                setModalType('supports');
                break;
            default:
                break;
        }

        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };
    
    return (
        <section className="seller-dashboard flex-1">

            {/* ── dashboard-top ── */}
            <div className="dashboard-top">

                {deviceType === "desktop" ? (
                    // دسکتاپ: بدون اسلایدر
                    <div className="dt-desktop-grid">
                        {cards.map((card, i) => (
                            <div key={i} className="dt-card-wrapper">{card}</div>
                        ))}
                    </div>
                ) : (
                    // تبلت و موبایل: اسلایدر
                    <div className="dt-slider-container">
                        {/* دکمه راست - نمایش اسلاید بعدی */}
                        <button
                            className="dt-slider-arrow dt-arrow-next"
                            onClick={goNext}
                            aria-label="اسلاید بعدی"
                        >
                            &#8250;  {/* › */}
                        </button>

                        {/* viewport */}
                        <div className="dt-slider-viewport">
                            <div
                                ref={sliderTrackRef}
                                className="dt-slider-track"
                                style={{ transform: `translateX(${currentSlide * 100}%)` }}
                            >
                                {buildSlides()}
                            </div>
                        </div>

                        {/* دکمه چپ - برگشت به اسلاید قبلی */}
                        <button
                            className="dt-slider-arrow dt-arrow-prev"
                            onClick={goPrev}
                            aria-label="اسلاید قبلی"
                        >
                            &#8249;  {/* ‹ */}
                        </button>


                        {/* Pagination */}
                        <div className="dt-pagination">
                            {Array.from({ length: totalSlides }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`dt-dot ${i === currentSlide ? "dt-dot--active" : ""}`}
                                    onClick={() => goToSlide(i)}
                                    aria-label={`رفتن به اسلاید ${i + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                )}
            </div>

            {/* ── dashboard-bottom ── */}
            <div className="dashboard-bottom w-full h-full">
                <div>
                    {isLoading ? (
                        <div>در حال بارگذاری...</div> // نمایش پیام لودینگ
                    ) : (
                        // وقتی isLoading false است و quickViewValues آماده است، کامپوننت را نمایش بده
                        <QuickView tabs={quickViewTabs} values={quickViewValues} onRowClick={onRowClickHandler}/>
                    )}
                </div>
            </div>

            <DetailModal isOpen={isModalOpen} data={selectedRow} onClose={handleCloseModal} parent={modalType} />

        </section>
    );
}

export default Dashboard;
