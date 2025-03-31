
import { Button, Row, notification, Col } from 'antd';

import { Input, Form } from "antd";
import { registerUserAPI } from '../services/api.service';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {

        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone);
        if (res.data) {
            notification.success({
                message: "register user",
                description: "dang ki thanh cong"
            });
            navigate("/login");
        } else {
            notification.error({
                message: "register user error",
                description: "dang ki khong thanh cong"
            })
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            style={{ margin: "10px" }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row justify={"center"}>
                <Col xs={24} md={8}>

                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{
                            required: true,
                            message: 'Please input your fullName!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>


            <Row justify={"center"}>
                <Col xs={24} md={8}>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Please input your email!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your password!'
                        }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>

                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[{
                            required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button
                            onClick={() => form.submit()}
                            type="primary">Register</Button>

                    </div>
                </Col>
            </Row>




        </Form>
    )
}
export default RegisterPage;