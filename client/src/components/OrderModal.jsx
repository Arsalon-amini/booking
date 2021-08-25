import { Modal } from "antd";

const OrderModal = ({ session, orderedBy, setShowModal, showModal }) => {
  return (
    <Modal
      visible={showModal}
      title='Order Payment Popup'
      onCancel={() => setShowModal(!showModal)}
    >
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </Modal>
  );
};

export default OrderModal;
