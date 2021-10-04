import { DownOutlined } from "@ant-design/icons";
import { AutoComplete, Dropdown, Menu } from "antd";
import useSearch from "hooks/useSearch";
import { debounce } from "lodash";
import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logoutAction } from "store/features/auth.slice";
import { persistor, useAppDispatch, useAppSelector } from "store/store";
import { ROUTES } from "utils/constant";
import "../../styles/components/_header.scss";
import { Loading } from "./loading";
import Logo from "./logo";

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="https://www.antgroup.com">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="https://www.aliyun.com">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

const Header: React.FC = () => {
    const { credential } = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { onSearch, options, loading } = useSearch();
    const [value, setValue] = React.useState<any>(undefined);

    const handleLogout = () => {
        persistor.purge();
        dispatch(logoutAction());
        localStorage.clear();
    };

    const onSelect = (value: string, options: any) => {
        const { label, key } = options;
        history.push(`${ROUTES.MOVIEDETAIL}/${key}`);
        setValue(value);
    };

    return (
        <div className="header">
            <Container style={{ height: "100%" }}>
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />

                        <AutoComplete
                            options={options}
                            className="search-input"
                            onSelect={onSelect}
                            onSearch={debounce(onSearch, 500)}
                            placeholder="Search movie"
                            allowClear={true}
                            notFoundContent={loading ? <Loading /> : options.length === 0 && "No data"}
                        />
                    </div>

                    <div className="header__right">
                        <div className="header__right__userInfo">
                            {Object.keys(credential).length === 0 ? (
                                <Link to={ROUTES.LOGIN}>
                                    {/* <img
                                        src={credential.user?.avatar}
                                        alt="avatar"
                                        className="header__right__userInfo--avatar"
                                    /> */}
                                    <p className="header__right__userInfo--name">Login</p>
                                </Link>
                            ) : (
                                <>
                                    <img
                                        src={credential.user?.avatar}
                                        alt="avatar"
                                        className="header__right__userInfo--avatar"
                                    />
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item
                                                    key="0"
                                                    onClick={() =>
                                                        history.push(`${ROUTES.PROFILE}/${credential.user?._id}`)
                                                    }
                                                >
                                                    Profile
                                                </Menu.Item>
                                                <Menu.Item key="1" onClick={() => handleLogout()}>
                                                    Logout
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={["click"]}
                                    >
                                        <p className="header__right__userInfo--name" style={{ cursor: "pointer" }}>
                                            {credential.user?.username}
                                        </p>
                                    </Dropdown>
                                </>
                            )}
                        </div>
                        <div className="header__right__location">
                            <i className="fa fa-map-marker-alt"></i>
                            <Dropdown overlay={menu} trigger={["click"]}>
                                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                    VIETNAM <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header;
