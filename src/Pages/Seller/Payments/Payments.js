import React, { useEffect, useState } from "react";
import { paymentApi } from "../../../Services/Api";
import FilteredQuickView from "../../../Components/QuickView/FilteredQuickView/FilteredQuickView";
import DetailModal from "../../../Components/Modal/DetailModal";

function Payments() {

    const paymentTabs = ['شناسه', 'تاریخ', 'مبلغ', 'نوع سند', 'موجودی حساب'];

    const filters = [
        { label:'همه تراکنشات', status:null },
        { label:'واریزی', status:'واریز' },
        { label:'برداشتی', status:'برداشت' }
    ];

    const [transactions,setTransactions] = useState([]);
    const [loading,setLoading] = useState(true);
    // states for modal  
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await paymentApi.getAll();

                setTransactions(res.data || res);

            } catch(err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    },[]);

    const fetchSelectedRowData = async (id) => {
        return await paymentApi.getById(id);
    }

    const handleOpenModal = async(id) =>
    {
        const rowData = await fetchSelectedRowData(id);
        setSelectedRow(rowData);
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    return(
        <section className="flex-1 ">
            <div className="w-full flex-1">
                {loading || transactions.length === 0 ? (
                    <div className="w-full text-center">تراکنشی انجام نشده است</div>
                ) : (
                    <FilteredQuickView
                        filters={filters}
                        titles={paymentTabs}
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