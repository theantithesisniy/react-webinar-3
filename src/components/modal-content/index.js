import React from 'react';
import BasketItem from '../basket-item/index';
import './styles.css';

function ModalContent(props) {
	const { onClose = () => { }, basket = [], onRemoveItem = () => { } } = props;
	return (
		<>
			<div className="overlay" onClick={onClose}></div>
			<div className="modal">
				<div className="modal-content">
					<div className="modal-header">
						<h2>Корзина</h2>
						<button className="modal-btn" onClick={onClose}>
							Закрыть
						</button>
					</div>

					<div className="modal-items">
						{basket.length > 0 ? (
							basket.map(item => (
								<BasketItem key={item.code} item={item} onRemove={onRemoveItem} />
							))
						) : (
							<p className='Item-EmtyBasket'>В корзине: <strong>пусто</strong></p>
						)}
					</div>

					{basket.length > 0 ? (
						<div className="modal-price">
							<p className="label">Итого:</p>
							<p className="amount">
								{basket.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽
							</p>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
}

export default React.memo(ModalContent);
