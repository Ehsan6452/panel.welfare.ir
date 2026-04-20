import React, { useEffect, useState } from "react";
import FilteredQuickView from "../../../Components/QuickView/FilteredQuickView/FilteredQuickView";
import { supportApi } from "../../../Services/Api";
import DetailModal from "../../../Components/Modal/DetailModal";

function Support() {

    const supportTabs = ['شناسه', 'تاریخ', 'عنوان', 'دپارتمان', 'وضعیت'];

    const filters = [
        { label:'همه تیکت ها', status:null },
        { label:'در صف پاسخگویی', status:'در صف پاسخگویی' },
        { label:'پاسخ داده شده', status:'پاسخ داده شده' },
        { label:'بسته شده', status:'بسته شده' }
    ]

    const [supports,setSupports] = useState([]);
    const [loading,setLoading] = useState(true);
    // states for modal  
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await supportApi.getAll();

                setSupports(res.data || res);

            } catch(err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    },[]);

    const fetchSelectedRowData = async (id) => {
        return await supportApi.getById(id);
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
        <section className="flex-1">
            <div className="w-full flex-1">
                {loading || supports.length === 0 ? (
                    <div className="w-full text-center">هیچ سابقه پشتیبانی موجود نیست</div>
                ) : (
                    <FilteredQuickView
                        filters={filters}
                        titles={supportTabs}
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