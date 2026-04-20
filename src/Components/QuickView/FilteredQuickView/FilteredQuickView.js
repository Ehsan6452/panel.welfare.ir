import React, { useEffect, useState } from "react";
import QuickView from "../QuickView";

function FilteredQuickView({ filters, titles, data, statusIndex,onRowClick }) {

    const [values, setValues] = useState([]);

    useEffect(() => {

        if (!data || data.length === 0) return;

        const generated = filters.map(filter => {

            const filtered = filter.status
                ? data.filter(item => item[statusIndex] === filter.status)
                : data;

            return {
                titles: titles,
                data: filtered
            };

        });

        setValues(generated);

    }, [data, filters, titles, statusIndex]);



    // جلوگیری از رندر QuickView با values خالی
    if (values.length === 0) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <QuickView
            tabs={filters.map(f => f.label)}
            values={values}
            onRowClick={onRowClick}
        />
    );
}

export default FilteredQuickView;
