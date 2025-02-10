import { Button, Flex, notification } from 'antd';

import { Input } from "antd";
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';


const UserForm = () => {
    const [fullName, setfullName] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleClickBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone)
        if (res.data) {
            notification.success(
                {
                    message: "create user",
                    description: "tao user thanh cong "
                }
            )
        } else {
            notification.error({
                message: " Error create user",
                description: JSON.stringify(res.message)
            })
        }



    }
    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>FullName</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setfullName(event.target.value) }} />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        value={email}
                        onChange={(event) => { setemail(event.target.value) }} />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }} />
                </div>
                <div>
                    <Button
                        //onClick={() =>handleClickBtn()} giông cách dưới nhưng cách này truyền được tham số đầu vào 
                        onClick={handleClickBtn}
                        type="primary">Create User</Button>
                </div>

            </div>
        </div>
    )
}

export default UserForm;