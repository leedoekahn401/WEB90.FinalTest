import { Form, Modal, Button, Input, Switch, message } from 'antd';
import { useState } from 'react';


const AddPositionModal = ({ isOpen, onCancel, onCreate }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setIsSubmitting(true);
            await onCreate(values);
            form.resetFields();
        } catch (error) {
            console.error('Validation Failed:', error);
            message.error("Vui lòng điền đầy đủ các trường bắt buộc!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            open={isOpen}
            title="Tạo mới vị trí công tác"
            onCancel={onCancel}
            confirmLoading={isSubmitting}
            footer={[
                <Button key="back" onClick={onCancel} disabled={isSubmitting}>Hủy</Button>,
                <Button key="submit" type="primary" loading={isSubmitting} onClick={handleOk}>Lưu</Button>
            ]}
        >
            <Form form={form} layout="vertical" initialValues={{ isActive: true }}>
                <Form.Item name="code" label="Mã" rules={[{ required: true, message: 'Vui lòng nhập mã vị trí!' }]}>
                    <Input placeholder="VD: GV" />
                </Form.Item>
                <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên vị trí!' }]}>
                    <Input placeholder="VD: Giáo viên" />
                </Form.Item>
                <Form.Item name="des" label="Mô tả">
                    <Input.TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
                </Form.Item>
                <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
                    <Switch checkedChildren="Hoạt động" unCheckedChildren="Ngừng" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddPositionModal;