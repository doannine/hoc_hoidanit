import { Drawer } from "antd";

const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

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

                    <div>
                        <img
                            height={100} width={130} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
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
                        <input type='file' hidden id="btnUpload" />
                    </div>

                </div>
                {/* <button type="primary">Upload Avatar</button> */}
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