// src/pages/Support/Support.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import FilteredQuickView from "../../../Components/QuickView/FilteredQuickView/FilteredQuickView";
import { supportApi } from "../../../Services/Api";
import DetailModal from "../../../Components/Modal/DetailModal";
import DataFilter from '../../../Components/DataFilter/DataFilter';

function Support() {
    const supportColumns = ['شناسه', 'تاریخ', 'عنوان', 'دپارتمان', 'وضعیت'];
    
    const tabs = [
        { label: 'همه تیکت ها', status: null },
        { label: 'در صف پاسخگویی', status: 'در صف پاسخگویی' },
        { label: 'پاسخ داده شده', status: 'پاسخ داده شده' },
        { label: 'بسته شده', status: 'بسته شده' }
    ];

    const [supports, setSupports] = useState([]);
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

    const fetchFilteredSupports = useCallback(async (filterParams) => {
        // جلوگیری از درخواست‌های همزمان
        if (fetchingRef.current) return;
        
        fetchingRef.current = true;
        setFilterLoading(true);
        
        try {
            const res = await supportApi.getByFilter({
                search: filterParams.search || '',
                fromDate: filterParams.fromDate || '',
                toDate: filterParams.toDate || ''
            });
            setSupports(res.data || res);
        } catch(err) {
            console.error("Error fetching filtered supports:", err);
        } finally {
            setFilterLoading(false);
            fetchingRef.current = false;
        }
    }, []);

    const fetchSupports = useCallback(async () => {
        if (fetchingRef.current) return;
        
        fetchingRef.current = true;
        setLoading(true);
        
        try {
            const res = await supportApi.getAll();
            setSupports(res.data || res);
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
                fetchFilteredSupports(newFilters);
            } else {
                fetchSupports();
            }
            
            return newFilters;
        });
    }, [fetchFilteredSupports, fetchSupports]);

    // فقط یک بار در ابتدا fetch کن
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchSupports();
        }
    }, [fetchSupports]);

    const fetchSelectedRowData = useCallback(async (id) => {
        return await supportApi.getById(id);
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
                searchPlaceholder="جستجو بر اساس شناسه، عنوان، دپارتمان، ..."
            />

            <div className="w-full flex-1">
                {(loading || filterLoading) ? (
                    <div className="text-center w-full py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="mt-2 text-secondary">در حال بارگذاری...</p>
                    </div>
                ) : supports.length === 0 ? (
                    <div className="text-center w-full py-8 text-muted">
                        هیچ سابقه پشتیبانی موجود نیست
                    </div>
                ) : (
                    <FilteredQuickView
                        tabs={tabs}
                        column={supportColumns}
                        data={supports}
                        statusIndex={4}
                        onRowClick={handleOpenModal}
                    />
                )}
            </div>

            <DetailModal isOpen={isModalOpen} data={selectedRow} onClose={handleCloseModal} parent="supports" />
        </section>
    );
}

export default Support;