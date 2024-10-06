import StoreModule from '../module';

/**
 * Модуль состояния для профиля пользователя.
 * Этот модуль управляет состоянием профиля, включая возможность загружать чужие профили.
 */
class UserProfileState extends StoreModule {

	initState() {
		return {
			profile: {
				name: '',
				email: '',
				phone: '',
			},
			loading: false,
			errorMessage: '',
		};
	}

	/**
	 * Загрузка профиля пользователя по ID
	 * @param {string} userId - ID пользователя для загрузки профиля.
	 */
	async fetchProfileById(id) {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`/api/v1/users/${id}?fields=*`, {
				method: 'GET',
				headers: {
						'X-Token': token,
				},
		});
		

			if (response.ok) {
				const data = await response.json();
				const newState = {
					...this.getState(),
					loged: true,
					profile: {
						name: data.result.profile.name,
						phone: data.result.profile.phone,
						email: data.result.email,
					},
				};
				this.setState(newState, `Профиль пользователя с ID: ${id} загружен`);
			} else {
				this.setState({
					...this.getState(),
					errorMessage: 'Ошибка при получении профиля',
				});
			}
		} catch (error) {
			this.setState({
				...this.getState(),
				errorMessage: error.message || 'Ошибка сети при загрузке профиля',
			});
		}
	}

}

export default UserProfileState;
