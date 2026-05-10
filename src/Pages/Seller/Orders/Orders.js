// src/pages/Orders/Orders.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import FilteredQuickView from "../../../Components/QuickView/FilteredQuickView/FilteredQuickView";
import { orderApi } from "../../../Services/Api";
import DetailModal from '../../../Components/Modal/DetailModal';
import DataFilter from '../../../Components/DataFilter/DataFilter';

function Orders() {
    const orderColumns = ['شناسه', 'تاریخ', 'مشتری', 'مبلغ', 'وضعیت'];
    
    const tabs = [
        { label: 'همه سفارشات', status: null },
        { label: 'پردازش', status: 'پرداخت شده' },
        { label: 'بسته بندی', status: 'بسته بندی' },
        { label: 'آماده ارسال', status: 'آماده ارسال' },
        { label: 'ارسال شده', status: 'ارسال شده' }
    ];

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const [filters, setFilters] = useState({
        search: '',
        fromDate: '',
        toDate: '',
        dateRangePreset: ''
    });
    
    // استفاده از ref برای جلوگیری از حلقه بی‌نهایت
    const isFirstRender = useRef(true);
    const fetchingRef = useRef(false);

    const fetchFilteredOrders = useCallback(async (filterParams) => {
        // جلوگیری از درخواست‌های همزمان
        if (fetchingRef.current) return;
        
        fetchingRef.current = true;
        setFilterLoading(true);
        
        try {
            const res = await orderApi.getByFilter({
                search: filterParams.search || '',
                fromDate: filterParams.fromDate || '',
                toDate: filterParams.toDate || ''
            });
            setOrders(res.data || res);
        } catch(err) {
            console.error("Error fetching filtered orders:", err);
        } finally {
            setFilterLoading(false);
            fetchingRef.current = false;
        }
    }, []);

    const fetchOrders = useCallback(async () => {
        if (fetchingRef.current) return;
        
        fetchingRef.current = true;
        setLoading(true);
        
        try {
            const res = await orderApi.getAll();
            setOrders(res.data || res);
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
            fetchingRef.current = false;
        }
    }, []);

    const handleFilterChange = useCallback((newFilters) => {
        // فقط در صورت تغییر واقعی فیلترها، state را به‌روز کن
        setFilters(prevFilters => {
            const hasChanged = 
                prevFilters.search !== newFilters.search ||
                prevFilters.fromDate !== newFilters.fromDate ||
                prevFilters.toDate !== newFilters.toDate ||
                prevFilters.dateRangePreset !== newFilters.dateRangePreset;
            
            if (!hasChanged) return prevFilters;
            
            // اگر فیلترها تغییر کرده‌اند، دیتا را fetch کن
            const hasActiveFilters = newFilters.search || newFilters.fromDate || newFilters.toDate;
            if (hasActiveFilters) {
                fetchFilteredOrders(newFilters);
            } else {
                fetchOrders();
            }
            
            return newFilters;
        });
    }, [fetchFilteredOrders, fetchOrders]);

    // فقط یک بار در ابتدا fetch کن
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchOrders();
        }
    }, [fetchOrders]);

    const fetchSelectedRowData = async (id) => {
        return await orderApi.getById(id);
    }

    const handleOpenModal = async(id) => {
        const rowData = await fetchSelectedRowData(id);
        setSelectedRow(rowData);
        setIsModalOpen(true);
    }
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    return(
        <section className="flex-1 Orders p-4 bg-background-primary">
            <DataFilter 
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                searchPlaceholder="جستجو بر اساس شناسه، مشتری، ..."
            />

            <div className="w-full flex-1">
                {(loading || filterLoading) ? (
                    <div className="text-center w-full py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-2 text-secondary">در حال بارگذاری...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center w-full py-8 text-muted">
                        سفارشی ثبت نشده است
                    </div>
                ) : (
                    <FilteredQuickView
                        tabs={tabs}
                        column={orderColumns}
                        data={orders}
                        statusIndex={4}
                        onRowClick={handleOpenModal}
                    />
                )}
            </div>

            <DetailModal isOpen={isModalOpen} data={selectedRow} onClose={handleCloseModal} parent="orders" />
        </section>
    )
}

export default Orders;