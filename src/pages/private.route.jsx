import { useContext } from "react";
import { AuthContext } from '../components/context/auth.context';
import { Navigate } from "react-router-dom";
import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    //return (<Navigate to="/login" replace />);
    return (
        <Result
            status="403"
            title="Unauthourize!"
            subTitle={"Bạn cần đăng nhập để truy cập nguồn tài nguyên "}
            extra={<Button type="primary"><Link to="/">
                <span>Back to homePage</span>
            </Link></Button>}
        />
    )
}
export default PrivateRoute;