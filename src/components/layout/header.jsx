import { Link, NavLink } from 'react-router-dom';
// import './header.css';
import { Menu } from 'antd';
import { UsergroupAddOutlined, HomeOutlined, FrownOutlined, AuditOutlined, SettingFilled } from '@ant-design/icons';
import { useState } from 'react';
import { Children } from 'react';
const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,

        },

        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingFilled />,
            children: [
                {
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login',
                },
                {
                    label: 'Đăng xuất',
                    key: 'logout',
                },
            ],
        },

    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />

    )
}
export default Header