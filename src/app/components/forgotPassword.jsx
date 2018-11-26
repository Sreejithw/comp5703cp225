import React, {Component} from 'react';
import { Form, Input, Button } from 'antd';
import auth from "../services/auth/auth";
import { Link, Redirect } from 'react-router-dom'

const FormItem = Form.Item;

class LoginForm extends Component {

    state = {
        confirmDirty: false
    };

    constructor(props){
        super(props);
        this.Auth = new auth();
        this.state = {
            redirectLogin: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.Auth.forgotPassword(values.email)
                    .then(res => {
                        this.props.setStatusMessage({type: 'success', message: res.message.toString()})
                        this.setState({ redirectLogin: true })
                    })
                    .catch(err => {
                        this.props.setStatusMessage({type: 'error', message: err.toString()})
                    })
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 11,
                    offset: 6,
                },
            },
        };

        if (this.state.redirectLogin) {
            return <Redirect to='/login'/>
        } else {
            return (
                <div className="login-form">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: 'Please input your registered email address.',
                                }, {
                                    required: true, message: 'Please fill in this field.',
                                }],
                            })(
                                <Input placeholder="Email Address" />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Send Reset Email</Button>
                        </FormItem>
                    </Form>
                    <div className="p-4">
                        <div className="hint-text small"> Successfully Reset? <Link to='/login'>Login</Link> </div>
                    </div>
                </div>
            );
        }
    }
}

export default Form.create()(LoginForm);