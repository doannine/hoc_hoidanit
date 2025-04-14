import { Button, InputNumber, Modal, notification } from 'antd';

import { Input, Select } from "antd";
import { useState } from 'react';
import { createBookAPI, handleUploadFile } from '../../services/api.service';


const CreateBookControl = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");


    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);




    const handleSubmitBtn = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return
        }





        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded;

            const resBook = await createBookAPI(
                newThumbnail, mainText, author, price, quantity, category
            );

            if (resBook.data) {
                resetAndCloseModal()
                await loadBook();
                notification.success(
                    {
                        message: "create book",
                        description: "tao book thanh cong "
                    }
                )

            } else {
                notification.error({
                    message: " Error create book",
                    description: JSON.stringify(resBook.message)
                })
            }
        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    const resetAndCloseModal = () => {
        setIsCreateOpen(false);
        setMainText("");
        setAuthor("");
        setCategory("");
        setPrice("");
        setQuantity("");
        setSelectedFile(null);
        setPreview(null);
    }
    const handleOnChangeFIle = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file))
        }
    }
    return (
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    type="primary">
                    Create book
                </Button>
            </div>
            <Modal
                title="Create book"
                open={isCreateOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"CREATE"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu đề:</span>
                        <Input
                            style={{ width: "100%" }}
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }} />
                    </div>
                    <div>
                        <span>Tác giả:</span>
                        <Input
                            style={{ width: "100%" }}
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }} />
                    </div>

                    <div>
                        <div>Giá tiền</div>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' đ'}
                            value={price}
                            onChange={(event) => { setPrice(event) }}
                        />
                    </div>


                    <div>
                        <span>Số lượng:</span>
                        <InputNumber
                            style={{ width: "100%" }}
                            value={quantity}
                            onChange={(event) => { setQuantity(event) }} />
                    </div>
                    <div>
                        <span>Thể loại:</span>
                        <Select
                            style={{ width: "100%" }}
                            value={category}
                            onChange={(value) => { setCategory(value) }}

                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },

                            ]}

                        />
                    </div>

                    <div>
                        <div>
                            Ảnh thumbnail
                        </div>
                        <label htmlFor='btnUpload' style={{
                            display: "block",
                            with: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "15px",
                            cursor: "pointer"

                        }}>
                            Upload

                        </label>
                        <input type='file' hidden id='btnUpload'
                            onChange={(event) => handleOnChangeFIle(event)}
                            onClick={(event) => event.target.value = null} />
                    </div>
                    {preview &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "15px",
                                height: "100px", width: "150px",
                            }}>
                                <img style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "contain"
                                }} src={preview} />

                            </div>
                        </>
                    }


                </div>


            </Modal>
        </div>

    )
}

export default CreateBookControl;