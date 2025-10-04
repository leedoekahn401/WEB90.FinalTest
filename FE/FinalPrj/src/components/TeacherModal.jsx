import { Avatar, Modal, Descriptions, Tag } from 'antd';
import dayjs from 'dayjs';

const TeacherModal = ({ teacher, isOpen, onClose }) => {
    if (!teacher) return null;
    return (
        <Modal open={isOpen} title="Thông tin chi tiết giáo viên" onCancel={onClose} footer={null} width={800}>
            <Descriptions bordered column={2} layout="vertical">
                <Descriptions.Item label="Ảnh đại diện" span={2}>
                     <Avatar size={80} src={teacher.avatar} />
                </Descriptions.Item>
                <Descriptions.Item label="Mã giáo viên">{teacher.code}</Descriptions.Item>
                <Descriptions.Item label="Họ tên">{teacher.name}</Descriptions.Item>
                <Descriptions.Item label="Email">{teacher.email}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{teacher.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">{dayjs(teacher.dob).format('DD/MM/YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Số CCCD">{teacher.identity}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ" span={2}>{teacher.address}</Descriptions.Item>
                <Descriptions.Item label="Vị trí công tác">{teacher.position}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái"><Tag color={teacher.isActive ? 'success' : 'error'}>{teacher.isActive ? 'Đang công tác' : 'Ngừng công tác'}</Tag></Descriptions.Item>
                {teacher.degrees?.map((degree, index) => (
                    <Descriptions.Item key={degree.key} label={`Học vị ${index + 1}`} span={2}>
                        {`${degree.level} ngành ${degree.major}, tốt nghiệp tại ${degree.school} (${degree.year})`}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        </Modal>
    );
};

export default TeacherModal;
