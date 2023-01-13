'use strict';

fetch('https://reqres.in/api/users?per_page=12')
  .then((response) => response.json())
  .then((result) => {
    const usersData = result.data;

    let isLocket = () => {
      document.documentElement.classList.toggle('isLocket');
    }

    let createModal = (user) => {
      const container = document.createElement('div');
      container.classList = 'containerUser';
      wrapper.appendChild(container);

      const closeContainer = document.createElement('div');
      closeContainer.classList = 'closeContainer';
      container.appendChild(closeContainer);

      closeContainer.addEventListener('click', () => {
        document.documentElement.classList.toggle('isLocket');

        // ----- Удаляю модальное окно ----- //

        container.remove();
      })

      fetch(`https://reqres.in/api/users/${ user.id }`)
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;

          const userWrapper = document.createElement('div');
          userWrapper.classList = 'userWrapper';
          container.appendChild(userWrapper);

          const userImage = document.createElement('img');
          userImage.classList = 'imageUser'
          userImage.alt = 'Avatar';
          userImage.src = user.avatar;
          userWrapper.appendChild(userImage);

          const infoWrapper = document.createElement('div');
          infoWrapper.classList = 'infoWrapper';
          userWrapper.appendChild(infoWrapper);

          const nameUser = document.createElement('h1');
          nameUser.classList = 'nameUser';
          nameUser.innerText = user.first_name + ' ' + user.last_name;
          infoWrapper.appendChild(nameUser);

          const contactUser = document.createElement('div');
          contactUser.classList = 'contactUser';
          contactUser.innerText = 'Email: ';
          infoWrapper.appendChild(contactUser);

          const emailUser = document.createElement('a');
          emailUser.classList = 'emailUser';
          emailUser.href = `mailto:${ user.email }`;
          emailUser.innerText = `${ user.email }`;
          contactUser.appendChild(emailUser);

          const idUser = document.createElement('div');
          idUser.classList = 'idUser';
          idUser.innerText = `Порядковый номер: ${ user.id }`;
          infoWrapper.appendChild(idUser);
        })
        .catch((error) => {
          console.error("Опять что-то пошло не так!", error);
        })
    }

    let arrayKeys;
    let arrayKeysFilter;

    const wrapper = document.createElement('div');
    wrapper.classList = 'wrapper';
    document.body.appendChild(wrapper);

    // ---------------------- Фамилии всех пользователей ---------------------- //

    console.log('---------------- Фамилии всех пользователей ----------------');

    const ulLastName = document.createElement('ul');
    const titleOne = document.createElement('h2');

    titleOne.innerText = 'Фамилии всех пользователей';
    titleOne.classList = 'titleOne';
    wrapper.appendChild(titleOne);

    ulLastName.classList = 'listLastName';
    wrapper.appendChild(ulLastName);

    usersData.map((user) => {
      const li = document.createElement('li');
      ulLastName.appendChild(li);
      li.innerText = user.last_name;
      console.log('  ' + user.last_name);
      li.addEventListener('click', () => {
        isLocket()
        createModal(user);
      })
    });

    // ---------------------- Данные всех пользователей с фамилией на букву 'F' ---------------------- //

    console.log(
      '---------------- Данные всех пользователей с фамилией на букву "F" ----------------');

    const titleTwo = document.createElement('h2');

    titleTwo.innerText = 'Данные всех пользователей с фамилией на букву "F"';
    titleTwo.classList = 'titleTwo';
    wrapper.appendChild(titleTwo);

    const userNameF_wrapper = document.createElement('div');
    userNameF_wrapper.classList = 'userNameF_wrapper';
    wrapper.appendChild(userNameF_wrapper);


    usersData.map((user) => {
      if (user.last_name[0] === 'F') {

        const cardUserF = document.createElement('div');
        cardUserF.classList = 'cardUserF';
        userNameF_wrapper.appendChild(cardUserF)

        const titleCardF = document.createElement('h3');
        titleCardF.classList = 'titleCardF';
        titleCardF.innerText = user.last_name;
        cardUserF.appendChild(titleCardF)

        console.log('  ' + user.last_name + ':');

        for (const item in user) {
          const dataUserF = document.createElement('div');
          const imageUserF = document.createElement('img');
          const emailUserF = document.createElement('a');
          emailUserF.classList = 'emailUserF';
          imageUserF.classList = 'imageUserF';

          if (item === 'email') {
            emailUserF.href = `mailto:${ user[item] }`;
            emailUserF.innerText =
              item.charAt(0).toUpperCase() + item.slice(1) + ': ' + user[item];
            cardUserF.appendChild(emailUserF);
          } else if (item === 'avatar') {
            imageUserF.src = user[item];
            imageUserF.alt = 'Avatar';
            cardUserF.appendChild(imageUserF);
          } else {
            dataUserF.innerText =
              item.charAt(0).toUpperCase() + item.slice(1) + ': ' + user[item];
            cardUserF.appendChild(dataUserF);
            console.log(' '.repeat(4) + item + ': ' + user[item] + ',');
          }
        }

        // ------- Информация о конкретном пользователе ------- //

        const btn = document.createElement('button');
        btn.classList = 'btnUser';
        btn.textContent = 'info'
        cardUserF.appendChild(btn);

        btn.addEventListener('click', () => {
          isLocket()

          // ----- Создаю модальное окно ----- //

          createModal(user)

        })
      }
    });

    // ---------------------- Фамилии и Имена всех пользователей с помощью метода reduce ---------------------- //

    const name_lastName = document.createElement('h2');
    name_lastName.innerText =
      'Фамилии и Имена всех пользователей с помощью метода reduce'
    name_lastName.classList = 'name_lastName';
    wrapper.append(name_lastName);

    const paragraphUserName = document.createElement('h3');
    paragraphUserName.innerText =
      'Наша база содержит данные следующих пользователей:'
    paragraphUserName.classList = 'paragraphUserName';
    wrapper.append(paragraphUserName);

    const ulAllUserName = document.createElement('ul');
    ulAllUserName.classList = 'ulAllUserName';
    wrapper.append(ulAllUserName);

    console.log(
      '---------------- Фамилии и Имена всех пользователей с помощью метода reduce ----------------');

    const reduceUser = usersData.reduce((accumulator, item, index, array) => {
      const liUserName = document.createElement('li');
      ulAllUserName.appendChild(liUserName);
      liUserName.classList = 'liUserName';
      liUserName.innerText = `${ item.first_name } ${ item.last_name }`;

      liUserName.addEventListener('click', () => {
        isLocket();
        createModal(item)
      })
      let resString = `${ item.first_name } ${ item.last_name }`;
      if (index !== array.length - 1) {
        resString += ', ';
      } else {
        resString += '.';
      }
      accumulator += resString;
      return accumulator;
    }, '');

    console.log(
      `Наша база содержит данные следующих пользователей: ${ reduceUser }`);

    // ---------------------- Все ключи в объекте пользователя ---------------------- //

    const keysUser = document.createElement('h2');
    keysUser.innerText = 'Все ключи в объекте пользователя';
    keysUser.classList = 'keysUser';
    wrapper.append(keysUser);

    const ulAllKeysUser = document.createElement('ul');
    ulAllKeysUser.classList = 'ulAllKeysUser';
    wrapper.appendChild(ulAllKeysUser);

    console.log(
      '---------------- Все ключи в объекте пользователя ----------------');

    arrayKeys = usersData.reduce(
      (container, obj) => [ ...container, ...Object.keys(obj) ], []);
    arrayKeysFilter = [ ...new Set(arrayKeys) ];
    console.log(arrayKeysFilter.join(', '));

    for (const item in arrayKeysFilter) {
      const liKeyUser = document.createElement('li');

      liKeyUser.classList = 'liKeyUser';
      liKeyUser.innerText = arrayKeysFilter[item].charAt(0)
        .toUpperCase() + arrayKeysFilter[item].slice(1);

      ulAllKeysUser.appendChild(liKeyUser);
    }
  })
  .catch((error) => {
    const errorMessage = document.createElement('h1');
    errorMessage.classList = 'error';
    errorMessage.innerText = 'Что-то пошло не так!!!';
    wrapper.appendChild(errorMessage);
    console.log('Что-то пошло не так!!! ===> ', error);
  });