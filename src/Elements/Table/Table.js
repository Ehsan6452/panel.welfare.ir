import React from 'react';
import './Table.css';

function Table({ titles, data, onRowClick }) {
    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        {titles.map((title, index) => (
                            <th className='text-center' key={index}>{title}</th>
                        ))}
                        <th className='text-center'>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} onClick={() => onRowClick(row[0],'')}>
                            {row.map((cell, cellIndex) => (
                                <td className='text-center' key={cellIndex} data-label={titles[cellIndex]}>
                                    {cell}
                                </td>
                            ))}
                            <td className='text-center'>
                                <button 
                                    className="details-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRowClick(row[0]);
                                    }}
                                >
                                    مشاهده
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
