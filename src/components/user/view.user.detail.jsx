import { UnderlineOutlined } from "@ant-design/icons";
import { Drawer, notification } from "antd";
import { useState } from "react";
import { UpdateUserAPI, handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen,
        loadUser
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
    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            //success
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar,
                dataDetail._id,
                dataDetail.fullName,
                dataDetail.phone
            );
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "update user avatar ",
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
                        <span>FullName: </span>
                        {dataDetail.fullName}
                    </div>

                    <div>
                        <span>Email: </span>
                        {dataDetail.email}
                    </div>

                    <div>
                        <span>Phone number: </span>
                        {dataDetail.phone}
                    </div>

                    <div>
                        <span>Avatar: </span>

                    </div>

                    <div style={{
                        marginTop: "10px",
                        height: "100px",
                        width: "150px",
                        border: "1px solid #ccc"

                    }}>
                        <img
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                    </div>
                    <div>
                        <label htmlFor="btnUpload"
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                            Upload Avatar
                        </label>
                        <input
                            type='file' hidden id='btnUpload'
                            // onChange={handleOnChangeFIle}
                            onChange={(event) => handleOnChangeFIle(event)}
                        />
                    </div>

                </div>



                {preview &&

                    <>
                        <div style={{
                            marginTop: "10px",
                            height: "100px",
                            width: "150px"

                        }}>
                            <img
                                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>
                        <button type="primary"
                            onClick={() => handleUpdateUserAvatar()} >
                            save
                        </button>

                    </>

                }

            </>
                :
                <>
                    <p>Khong co data</p>
                </>
            }

        </Drawer>
    )
}
export default ViewUserDetail;