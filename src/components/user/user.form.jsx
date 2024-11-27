import { Button, Flex } from 'antd';

import { Input } from "antd";
import { useState } from 'react';


const UserForm = () => {
    const [fullName, setfullName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const handleClickBtn = () => {

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
                        onChange={(event) => { setpassword(event.target.value) }} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phoneNumber}
                        onChange={(event) => { setphoneNumber(event.target.value) }} />
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