// src/Components/DataFilter/DataFilter.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';

const DataFilter = ({ 
    onFilterChange, 
    initialFilters = {},
    showSearch = true,
    showDateRange = true,
    showPresets = true,
    searchPlaceholder = "جستجو...",
    className = "",
    datePresets = null
}) => {
    const [searchTerm, setSearchTerm] = useState(initialFilters.search || "");
    const [fromDate, setFromDate] = useState(initialFilters.fromDate || "");
    const [toDate, setToDate] = useState(initialFilters.toDate || "");
    const [dateRangePreset, setDateRangePreset] = useState(initialFilters.dateRangePreset || "");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    
    // جلوگیری از فراخوانی اولیه
    const isInitialMount = useRef(true);

    const defaultPresets = [
        { label: "امروز", value: "today" },
        { label: "دیروز", value: "yesterday" },
        { label: "این هفته", value: "thisWeek" },
        { label: "هفته جاری", value: "currentWeek" },
        { label: "این ماه", value: "thisMonth" },
        { label: "ماه جاری", value: "currentMonth" },
        { label: "سه ماه اخیر", value: "last3Months" },
        { label: "شش ماه اخیر", value: "last6Months" },
        { label: "یک سال اخیر", value: "lastYear" },
        { label: "سفارشی", value: "custom" }
    ];

    const presets = datePresets || defaultPresets;

    const calculateDateRange = useCallback((preset) => {
        const today = new Date();
        let start = new Date();
        let end = new Date();

        switch(preset) {
            case "today":
                start = new Date(today.setHours(0, 0, 0, 0));
                end = new Date(today.setHours(23, 59, 59, 999));
                break;
            case "yesterday":
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                start = new Date(yesterday.setHours(0, 0, 0, 0));
                end = new Date(yesterday.setHours(23, 59, 59, 999));
                break;
            case "thisWeek":
                const firstDayOfWeek = today.getDate() - today.getDay();
                start = new Date(today.setDate(firstDayOfWeek));
                start.setHours(0, 0, 0, 0);
                end = new Date(today.setDate(firstDayOfWeek + 6));
                end.setHours(23, 59, 59, 999);
                break;
            case "currentWeek":
                const currentWeekStart = new Date(today);
                currentWeekStart.setDate(today.getDate() - today.getDay());
                currentWeekStart.setHours(0, 0, 0, 0);
                start = currentWeekStart;
                end = new Date();
                break;
            case "thisMonth":
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                start.setHours(0, 0, 0, 0);
                end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                end.setHours(23, 59, 59, 999);
                break;
            case "currentMonth":
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                start.setHours(0, 0, 0, 0);
                end = new Date();
                break;
            case "last3Months":
                start = new Date();
                start.setMonth(today.getMonth() - 3);
                start.setHours(0, 0, 0, 0);
                end = new Date();
                break;
            case "last6Months":
                start = new Date();
                start.setMonth(today.getMonth() - 6);
                start.setHours(0, 0, 0, 0);
                end = new Date();
                break;
            case "lastYear":
                start = new Date();
                start.setFullYear(today.getFullYear() - 1);
                start.setHours(0, 0, 0, 0);
                end = new Date();
                break;
            default:
                return { fromDate: "", toDate: "" };
        }

        return {
            fromDate: start.toISOString().split('T')[0],
            toDate: end.toISOString().split('T')[0]
        };
    }, []);

    const handlePresetChange = useCallback((e) => {
        const preset = e.target.value;
        setDateRangePreset(preset);
        
        if (preset !== "custom") {
            const { fromDate: newFromDate, toDate: newToDate } = calculateDateRange(preset);
            setFromDate(newFromDate);
            setToDate(newToDate);
        } else {
            setFromDate("");
            setToDate("");
        }
    }, [calculateDateRange]);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Notify parent when filters change (بعد از mount اولیه)
    useEffect(() => {
        // رد کردن فراخوانی اولیه
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        
        if (onFilterChange) {
            onFilterChange({
                search: debouncedSearchTerm,
                fromDate: fromDate,
                toDate: toDate,
                dateRangePreset: dateRangePreset
            });
        }
    }, [debouncedSearchTerm, fromDate, toDate, dateRangePreset, onFilterChange]);

    const resetFilters = useCallback(() => {
        setSearchTerm("");
        setFromDate("");
        setToDate("");
        setDateRangePreset("");
    }, []);

    const removeFilter = useCallback((filterName) => {
        switch(filterName) {
            case 'search':
                setSearchTerm("");
                break;
            case 'fromDate':
                setFromDate("");
                if (dateRangePreset) setDateRangePreset("");
                break;
            case 'toDate':
                setToDate("");
                if (dateRangePreset) setDateRangePreset("");
                break;
            default:
                break;
        }
    }, [dateRangePreset]);

    return (
        <div className={`bg-background-secondary rounded-lg shadow-sm p-4 mb-4 border border-default ${className}`}>
            <div className="flex flex-wrap gap-4 items-end">
                {showSearch && (
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium text-secondary mb-1">
                            جستجو
                        </label>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 bg-background-primary text-primary border border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                            dir="rtl"
                        />
                    </div>
                )}

                {showPresets && showDateRange && (
                    <div className="w-48">
                        <label className="block text-sm font-medium text-secondary mb-1">
                            بازه زمانی سریع
                        </label>
                        <select
                            value={dateRangePreset}
                            onChange={handlePresetChange}
                            className="w-full px-3 py-2 bg-background-primary text-primary border border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                        >
                            <option value="" className="bg-background-primary">انتخاب بازه</option>
                            {presets.map(preset => (
                                <option key={preset.value} value={preset.value} className="bg-background-primary">
                                    {preset.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {showDateRange && (
                    <div className="w-44">
                        <label className="block text-sm font-medium text-secondary mb-1">
                            از تاریخ
                        </label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            disabled={dateRangePreset && dateRangePreset !== "custom"}
                            className="w-full px-3 py-2 bg-background-primary text-primary border border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        />
                    </div>
                )}

                {showDateRange && (
                    <div className="w-44">
                        <label className="block text-sm font-medium text-secondary mb-1">
                            تا تاریخ
                        </label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            disabled={dateRangePreset && dateRangePreset !== "custom"}
                            className="w-full px-3 py-2 bg-background-primary text-primary border border-default rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        />
                    </div>
                )}

                <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-background-tertiary text-primary rounded-md hover:bg-background-hover transition-colors duration-200 active:bg-background-active"
                >
                    حذف فیلترها
                </button>
            </div>

            {(searchTerm || fromDate || toDate) && (
                <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-sm text-secondary">فیلترهای فعال:</span>
                    {searchTerm && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-lighter text-white-custom">
                            جستجو: {searchTerm}
                            <button
                                onClick={() => removeFilter('search')}
                                className="mr-1 hover:text-active transition-colors"
                            >
                                ✕
                            </button>
                        </span>
                    )}
                    {fromDate && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-lighter text-white-custom">
                            از: {fromDate}
                            <button
                                onClick={() => removeFilter('fromDate')}
                                className="mr-1 hover:text-active transition-colors"
                            >
                                ✕
                            </button>
                        </span>
                    )}
                    {toDate && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-lighter text-white-custom">
                            تا: {toDate}
                            <button
                                onClick={() => removeFilter('toDate')}
                                className="mr-1 hover:text-active transition-colors"
                            >
                                ✕
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataFilter;