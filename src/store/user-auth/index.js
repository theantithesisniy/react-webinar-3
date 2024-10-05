import StoreModule from '../module';

/**
 * Состояние аутентификации пользователя.
 * Этот модуль управляет состоянием аутентификации, включая вход и выход пользователя, а также 
 * загрузку профиля пользователя.
 */

class UserAuthState extends StoreModule {
  lastLoginAttempt = 0;
  initState() {
    return {
      username: '',
      profile: {
        name: '',
        email: '',
        phone: '',
      },
      loged: false,
      errorMessage: '',
      waiting: false,
      token: ''
    };
  }

  async init() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        ...this.getState(),
        token,
      });
      await this.fetchUserProfile(); 
    }
  }

    async login(formData) {
    const currentTime = Date.now();
    const MIN_DELAY = 3000;

    if (currentTime - this.lastLoginAttempt < MIN_DELAY) {
      this.setState({
        ...this.getState(),
        errorMessage: 'Пожалуйста, подождите перед повторной попыткой входа.',
      });
      return;
    }
    this.lastLoginAttempt = currentTime;

    this.setState({
      ...this.getState(),
      waiting: true,
      errorMessage: '',
    }, 'Авторизация начата');

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const newState = {
          ...this.getState(),
          token: data.result.token,
          loged: true,
          waiting: false,
          username: data.result.user.username,
          profile: {
            name: data.result.user.name,
            email: data.result.user.email,
            phone: data.result.user.phone,
          },
          errorMessage: '',
        };
        localStorage.setItem('token', data.result.token);
        this.setState(newState, 'Авторизация успешна');
        this.fetchUserProfile(); 
      } else {
        const data = await response.json();
        const issues = data.error?.data?.issues || [];
        const errorMessage = issues.length > 0 
          ? issues.map(issue => issue.message)
          : ['Ошибка авторизации'];
        this.setState({
          ...this.getState(),
          waiting: false,
          errorMessage: errorMessage,
        });
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        errorMessage: error.message || 'Ошибка сети',
      });
    }
  }



  async fetchUserProfile() {
    const { token } = this.getState();
    if (!token) return;

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
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
          username: data.result.username,
          profile: {
            name: data.result.profile.name,
            phone: data.result.profile.phone,
            email: data.result.email,
          },
        };
        this.setState(newState, 'Профиль пользователя загружен');
      } else {
        this.setState({
          ...this.getState(),
          errorMessage: 'Ошибка при получении профиля',
        });
        this.logout();
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        errorMessage: error.message || 'Ошибка сети при загрузке профиля',
      });
      console.error('Ошибка при загрузке профиля:', error);
    }
  }

  /**
   * Выполняет выход пользователя из системы.
   * @return {Promise<void>}
   */

  async logout() {
    const { token } = this.getState();

    // Проверка наличия токена
    if (!token) {
      console.log('Токен не найден, сброс состояния.');
      this.setState(this.initState(), 'Токен отсутствует, выход выполнен.');
      return;
    }

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        this.setState(this.initState(), 'Выход из системы выполнен успешно');
      } else {
        const data = await response.json();
        this.setState({
          ...this.getState(),
          errorMessage: data.error?.message || 'Ошибка при выходе из системы',
        });
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        errorMessage: error.message || 'Ошибка сети при выходе',
      });
    }
  }
}

export default UserAuthState;