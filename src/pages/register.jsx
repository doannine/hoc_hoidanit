
import { Button } from 'antd';

import { Input, Form } from "antd";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log("checkk>>", values);
    }
    return (
        <Form
            form={form}
            layout="vertical"
            name="basic"

            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div style={{
                // display: "flex",
                margin: "50px",
                // flexDirection: "column"
            }}>



                <Form.Item
                    label="Full Name"
                    name="fullName"
                //rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                //rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>



                <Form.Item
                    label="Password"
                    name="password"
                //rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    label="Phone number"
                    name="phone"
                //rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <div>
                    <Button
                        onClick={() => form.submit()}
                        type="primary">Register</Button>
                </div>

            </div>
        </Form>
    )
}
export default RegisterPage;