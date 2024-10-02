import StoreModule from '../module';

class UserState extends StoreModule {
  lastLoginAttempt = 0; 
  initState() {
    return {
      username: '',
      login: '',
      phone: '',
      email: '',
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
          errorMessage: '',
        };
        this.setState(newState, 'Авторизация успешна');
        await this.fetchUserProfile();
      } else {
        const errorData = await response.json();
        this.setState({
          ...this.getState(),
          waiting: false,
          errorMessage: errorData.error.message || 'Ошибка авторизации',
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

  logout() {
    this.setState(this.initState(), 'Выход из системы');
  }
}

export default UserState;
