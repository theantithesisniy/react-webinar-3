import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import ModalContent from '../modal-content/index';

function BasketButton(props) {
	const { showModal = false, openModal = () => { }, closeModal = () => { }, basket = [] } = props;
	return (
		<>
			<button onClick={openModal}>Перейти</button>
			{showModal && createPortal(
				<ModalContent
					onClose={closeModal}
					basket={basket}
				/>,
				document.body
			)}
		</>
	);
}

BasketButton.propTypes = {
	showModal: PropTypes.bool.isRequired,
	openModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	basket: PropTypes.array.isRequired,
};

export default BasketButton;
