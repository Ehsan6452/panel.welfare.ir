// src/pages/Payments/Payments.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { paymentApi } from "../../../Services/Api";
import FilteredQuickView from "../../../Components/QuickView/FilteredQuickView/FilteredQuickView";
import DetailModal from "../../../Components/Modal/DetailModal";
import DataFilter from '../../../Components/DataFilter/DataFilter';

function Payments() {
    const paymentColumns = ['شناسه', 'تاریخ', 'مبلغ', 'نوع سند', 'موجودی حساب'];
    
    const tabs = [
        { label: 'همه تراکنشات', status: null },
        { label: 'واریزی', status: 'واریز' },
        { label: 'برداشتی', status: 'برداشت' }
    ];

    const [transactions, setTransactions] = useState([]);
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
    
    // ref برای جلوگیری از حلقه بی‌نهایت
    const isFirstRender = useRef(true);
    const fetchingRef = useRef(false);

    const fetchFilteredTransactions = useCallback(async (filterParams) => {
        // جلوگیری از درخواست‌های همزمان
        if (fetchingRef.current) return;
        
        fetchingRef.current = true;
        setFilterLoading(true);
        
        try {
            const res = await paymentApi.getByFilter({
                search: filterParams.search || '',
                fromDate: filterParams.fromDate || '',
                toDate: filterParams.toDate || ''
            });
            setTransactions(res.data || res);
        } catch(err) {
            console.error("Error fetching filtered transactions:", err);
        } finally {
            setFilterLoading(false);
            fetchingRef.current = false;
        }
    }, []);

    const fetchTransactions = useCallback(async () => {
        if (fetchingRef.current) return;
        
        fetchingRef.current = true;
        setLoading(true);
        
        try {
            const res = await paymentApi.getAll();
            setTransactions(res.data || res);
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
                fetchFilteredTransactions(newFilters);
            } else {
                fetchTransactions();
            }
            
            return newFilters;
        });
    }, [fetchFilteredTransactions, fetchTransactions]);

    // فقط یک بار در ابتدا fetch کن
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchTransactions();
        }
    }, [fetchTransactions]);

    const fetchSelectedRowData = useCallback(async (id) => {
        return await paymentApi.getById(id);
    }, []);

    const handleOpenModal = useCallback(async(id) => {
        const rowData = await fetchSelectedRowData(id);
        setSelectedRow(rowData);
        setIsModalOpen(true);
    }, [fetchSelectedRowData]);
    
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedRow(null);
    }, []);

    return(
        <section className="flex-1 p-4 bg-background-primary">
            <DataFilter 
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                searchPlaceholder="جستجو بر اساس شناسه، نوع سند، ..."
            />

            <div className="w-full flex-1">
                {(loading || filterLoading) ? (
                    <div className="text-center w-full py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-2 text-secondary">در حال بارگذاری...</p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="text-center w-full py-8 text-muted">
                        تراکنشی انجام نشده است
                    </div>
                ) : (
                    <FilteredQuickView
                        tabs={tabs}
                        column={paymentColumns}
                        data={transactions}
                        statusIndex={3}
                        onRowClick={handleOpenModal}
                    />
                )}
            </div>

            <DetailModal isOpen={isModalOpen} data={selectedRow} onClose={handleCloseModal} parent="payments" />
        </section>
    );
}

export default Payments;