import { Table, notification, Popconfirm, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import UpdateUserModal from './update.user.modal';
import { useEffect, useState } from 'react';
import ViewBookDetail from './view.book.detail';
import { deleteUserAPI, fetchAllBookAPI } from '../../services/api.service';
import BookForm from './create.book.control';
import CreateBookControl from './create.book.control';


const BookTable = () => {
    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);


    const [isModalUpdateOpen, SetIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        loadBook();
    }, [current, pageSize])
    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data) {
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }





    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {
                            (index + 1) + (current - 1) * pageSize
                        }
                    </>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',

        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN',
                        {
                            style: 'currency', currency: 'VND'
                        }).format(text)
            }

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',

        },
        {
            title: 'Tác giả ',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            SetIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        title="Delete boook"
                        description="Are you sure to delete book?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined
                            style={{ cursor: "pointer", color: "red" }}
                        />
                    </Popconfirm>
                </div>


            ),
        },

    ];

    const handleDeleteBook = async (id) => {
        // const res = await deleteUserAPI(id);
        // if (res.data) {
        //     notification.success({
        //         message: "Delete book",
        //         description: " xóa book thành công "
        //     })
        //     await loadUser();

        // } else {
        //     notification.error({
        //         message: "Error delete book",
        //         description: "Xóa book k thành công"
        //     })
        // }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        //setCurrent,setPageSize
        //nếu thay đổi trang : current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }


        //nếu thay đổi tổng số phần tử  : pagesixe
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }





    };

    return (
        <>
            {/* <div style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <h3>Table Book</h3>
                <Button type="primary">Create Book</Button>
            </div> */}
            <CreateBookControl
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook} />

            <Table
                columns={columns}
                dataSource={dataBook}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />
            {/* <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                SetIsModalUpdateOpen={SetIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            /> */}
            <ViewBookDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
        </>
    )
}

export default BookTable;