import { UnderlineOutlined } from "@ant-design/icons";
import { Drawer, notification } from "antd";
import { useState } from "react";
import { UpdateUserAPI, handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewBookDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen

    } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

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
    const handleUpdateBookAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateBookAvatarAPI(
                newAvatar,
                dataDetail._id,
                dataDetail.fullName,
                dataDetail.phone
            );
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);

                notification.success({
                    message: "update book avatar ",
                    description: "cap nhat avatar thanh cong "
                })
            } else {
                notification.error({
                    message: "Erros update avatar file",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            //failed
            notification.error({
                message: "erros uploaf file",
                description: JSON.stringify(resUpload.message)
            })

        }

    }
    return (
        <Drawer
            width={"50vw"}
            title=" Chi tiết "
            onClose={() => {
                setDataDetail(null),
                    setIsDetailOpen(false);
            }}
            open={isDetailOpen}>
            {dataDetail ? <>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Id: </span>
                        {dataDetail._id}

                    </div>

                    <div>
                        <span>Tiêu đề : </span>
                        {dataDetail.mainText}
                    </div>

                    <div>
                        <span>Tác giả: </span>
                        {dataDetail.author}
                    </div>

                    <div>
                        <span>Thể loại: </span>
                        {dataDetail.category}
                    </div>
                    <div>
                        <span>Giá tiền: {
                            new Intl.NumberFormat('vi-VN',
                                {
                                    style: 'currency', currency: 'VND'
                                }).format(dataDetail.price)
                        }</span>
                    </div>
                    <div>
                        <span>Số lượng: </span>
                        {dataDetail.quantity}
                    </div>
                    <div>
                        <span>Đã bán: </span>
                        {dataDetail.sold}
                    </div>

                    <div>
                        <span>Thumbnail: </span>

                    </div>

                    <div style={{
                        marginTop: "10px",
                        height: "100px",
                        width: "150px",
                        border: "1px solid #ccc"

                    }}>
                        <img
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} />
                    </div>


                </div>

            </>
                :
                <>
                    <p>Khong co data</p>
                </>
            }

        </Drawer>
    )
}
export default ViewBookDetail;