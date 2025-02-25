import { Input, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import { createUserAPI } from '../../services/api.service';

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, SetIsModalUpdateOpen, dataUpdate, setDataUpdate } = props;
    useEffect(() => {
        console.log("<<<checkk", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {

        const res = await createUserAPI(fullName, email, password, phone)
        if (res.data) {
            notification.success(
                {
                    message: "create user",
                    description: "tao user thanh cong "
                }
            )
            resetAndCloseModal();
            // await loadUser();

        } else {
            notification.error({
                message: " Error create user",
                description: JSON.stringify(res.message)
            })
        }
    }
    const resetAndCloseModal = () => {
        SetIsModalUpdateOpen(false);
        setFullName("");
        setPhone("");
        setId("");
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>FullName</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }} />
                </div>


                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }} />
                </div>

            </div>


        </Modal>
    )
}
export default UpdateUserModal;
