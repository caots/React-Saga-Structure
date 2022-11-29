import React from 'react'
import { Button, Modal } from 'react-bootstrap-v5'
type Props = {
  isShow: boolean,
  className?: string,
  title?: string,
  description?: string,
  buttonTextLeft?: string,
  buttonTextRight?: string,
  onActionButtonLeft?: () => void,
  onActionButtonRight?: () => void,
  hiddenModal?: () => void,
}

const B8akConfirmDialog: React.FC<Props> = ({ className, isShow = false, title, description, buttonTextLeft, buttonTextRight, onActionButtonLeft, onActionButtonRight, hiddenModal}) => {
  return (
    <Modal show={isShow} onHide={hiddenModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{description}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onActionButtonLeft}>{buttonTextLeft}</Button>
        <Button variant="warning" onClick={onActionButtonRight}>{buttonTextRight}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default B8akConfirmDialog;
