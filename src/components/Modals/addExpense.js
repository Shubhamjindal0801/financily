import React from "react";
import './styles.css'
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd'

function AddExpense({
    isExpenseModal,
    handleExpenseCancel,
    onFinish
}) {
    const [form] = Form.useForm()
    function handleExpenseCancelTask(){
        handleExpenseCancel()
    }
    return (
        <Modal
            className="my-modal"
            style={{ fontWeight: 600}}
            title="Add Expense"
            visible={isExpenseModal}
            onCancel={handleExpenseCancelTask}
            footer={null}
        >
            <Form
                style={{height:'400px'}}
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, 'expense')
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Name"
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of the transaction'
                        }
                    ]}
                >
                    <Input type="text" className="custom-input" value=''/>
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Amount"
                    name='amount'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the expense amount!'
                        }
                    ]}
                >
                    <Input type="number" className="custom-input" />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Date"
                    name='date'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the expense date!'
                        }
                    ]}
                >
                    <DatePicker format='YYYY-MM-DD' className="custom-input" />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Tag"
                    name='tag'
                    rules={[
                        {
                            required: true,
                            message: 'Please select a tag!'
                        }
                    ]}
                >
                    <Select>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='office'>Office</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className="btn btn-blue btn-modal" type='primary' htmlType="submit">
                        Add Expense
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpense