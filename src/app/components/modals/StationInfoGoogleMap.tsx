import { Modal } from "react-bootstrap-v5";

type Props = {
    isShowViewModal?: boolean;
    closeModal?: () => void
}

const StationInfoGoogleMapModal: React.FC<Props> = ({
    isShowViewModal,
    closeModal
}) => {
    return (
        <>
            <Modal
                show={isShowViewModal}
                onHide={() => closeModal?.()}
                backdrop='static'
                keyboard={false}
                size='xl'
            >
                <Modal.Header closeButton className='header-primary'>
                    <Modal.Title className='fw-normal'>
                        title
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea odio, atque rem hic repellendus quis, eveniet, enim voluptatem voluptate dolorum at consectetur perferendis deserunt? Aliquam possimus culpa quos placeat aut!≈
                </Modal.Body>
            </Modal>
        </>
    )
}

export { StationInfoGoogleMapModal }