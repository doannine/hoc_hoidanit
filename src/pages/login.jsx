import { Button, Row, notification, Col, Divider, message } from 'antd';
import { Input, Form } from "antd";
import { loginAPI } from '../services/api.service';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true)

        const res = await loginAPI(

            values.email,
            values.password
        );

        if (res.data) {
            message.success("dang nhap thanh cong")
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");

        } else {
            notification.error({
                message: "dang nhap khong thanh cong",
                description: JSON.stringify(res.message)

            })
        }
        setLoading(false)
    }
    return (

        <Row justify={"center"} style={{ margin: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >




                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    type: "email",
                                    message: "Email không đúng định dạng",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>



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

                        <Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    loading={loading}
                                    type="primary" onClick={() => form.submit()}>
                                    Login
                                </Button>
                                <Link to="/">Go to Homepage <ArrowDownOutlined /></Link>
                            </div>
                        </Form.Item>








                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>Chưa có tài khoản? <Link to={"/register"}> Đăng kí tại đây</Link></div>
                </fieldset>
            </Col>

        </Row>
    )
}
export default LoginPage;