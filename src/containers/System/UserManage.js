import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import userService from '../../services/userService';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
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


    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className='title text-center mt-3 mx-1'> Manage users</div>
                <div className='users-table'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {/* <tr> */}
                        {arrUsers && arrUsers.map((item, index) => {
                            // console.log('check map', item, index);
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-user-edit"></i></button>
                                        <button className='btn-delete'><i className="fas fa-user-times"></i></button>
                                    </td>
                                </tr>
                            )
                        })

                        }

                        {/* </tr> */}
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
