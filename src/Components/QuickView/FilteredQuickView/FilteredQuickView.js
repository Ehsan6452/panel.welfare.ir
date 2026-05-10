import React, { useEffect, useState } from "react";
import QuickView from "../QuickView";

function FilteredQuickView({ tabs, column, data, statusIndex,onRowClick }) {

    const [values, setValues] = useState([]);

    useEffect(() => {

        if (!data || data.length === 0) return;

        const generated = tabs.map(filter => {

            const filtered = filter.status
                ? data.filter(item => item[statusIndex] === filter.status)
                : data;

            return {
                titles: column,
                data: filtered
            };

        });

        setValues(generated);

    }, [data, tabs, column, statusIndex]);



    // جلوگیری از رندر QuickView با values خالی
    if (values.length === 0) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <QuickView
            tabs={tabs.map(f => f.label)}
            values={values}
            onRowClick={onRowClick}
        />
    );
}

export default FilteredQuickView;
