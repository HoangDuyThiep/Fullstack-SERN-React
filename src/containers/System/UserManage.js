import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let reponse = await userService.getAllUsers('ALL');
        if (reponse && reponse.errCode === 0) {
            this.setState({
                arrUsers: reponse.users
            }, () => {
                //arowF check bat dong bo
                // console.log('check statr user 2', this.state.arrUsers);

            })
            // console.log('check statr user 1', this.state.arrUsers);
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        console.log('data from react >>> ', data);
        try {
            let response = await userService.createNewUserService(data);
            if (response && response.errCode !== 0) {
                console.log('response nodejs >>> ', response);
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        console.log('delete user >>> ', user);
        try {
            let res = await userService.deleteUserService(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await userService.editUserService(user)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })

                await this.getAllUserFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    isOpenModal={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {/* meo componentDidMount tu ModalEditUser */}
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpenModal={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center mt-3 mx-1'> Manage users</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    ><i className="fas fa-plus"></i> Add user</button>
                </div>
                <div className='users-table'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr> */}
                            {arrUsers && arrUsers.map((item, index) => {
                                // console.log('check map', item, index);
                                return (
                                    <tr key={item.id}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className="fas fa-user-edit"></i></button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            ><i className="fas fa-user-times"></i></button>
                                        </td>
                                    </tr>
                                )
                            })

                            }

                            {/* </tr> */}
                        </tbody>

                    </table>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
