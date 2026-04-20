import React, { useEffect, useState } from "react";
import FilteredQuickView from "../../../Components/QuickView/FilteredQuickView/FilteredQuickView";
import { orderApi } from "../../../Services/Api";
import DetailModal from '../../../Components/Modal/DetailModal'

function Orders() {

    const orderTabs = ['شناسه','تاریخ','مشتری','مبلغ','وضعیت'];

    const filters = [
        { label:'همه سفارشات', status:null },
        { label:'پردازش', status:'پرداخت شده' },
        { label:'بسته بندی', status:'بسته بندی' },
        { label:'آماده ارسال', status:'آماده ارسال' },
        { label:'ارسال شده', status:'ارسال شده' }
    ];

    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    // states for modal  
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [selectedRow, setSelectedRow] = useState({});


    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await orderApi.getAll();

                setOrders(res.data || res);

            } catch(err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    },[]);

    const fetchSelectedRowData = async (id) => {
        return await orderApi.getById(id);
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

        <section className="flex-1 Orders">

            <div className="w-full flex-1">

            {loading || orders.length === 0 ? (
                <div className="text-center w-full">سفارشی ثبت نشده است</div>
            ) : (
                <FilteredQuickView
                    filters={filters}
                    titles={orderTabs}
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

export default Orders
