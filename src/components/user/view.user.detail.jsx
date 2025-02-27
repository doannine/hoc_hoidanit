import { Drawer } from "antd";

const ViewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    return (
        <Drawer title=" Chi tiết "
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
export default ViewUserDetail;