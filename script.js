'use strict';

fetch('https://reqres.in/api/users?per_page=12')
  .then((response) => response.json())
  .then((result) => {
    const usersData = result.data;
    let arrayKeys = [];
    let arrayKeysFilter = [];

    // ---------------------- Фамилии всех пользователей ---------------------- //

    console.log('---------------- Фамилии всех пользователей ----------------');

    const ulLastName = document.createElement('ul');
    const titleOne = document.createElement('h2');

    titleOne.innerText = 'Фамилии всех пользователей';
    titleOne.classList = 'titleOne';
    document.body.appendChild(titleOne);

    ulLastName.classList = 'listLastName';
    document.body.appendChild(ulLastName);

    usersData.map((element, index) => {
      const li = document.createElement('li');
      ulLastName.appendChild(li);
      li.innerText = element.last_name;
      console.log('  ' + element.last_name);
    });

    // ---------------------- Данные всех пользователей с фамилией на букву 'F' ---------------------- //

    console.log('---------------- Данные всех пользователей с фамилией на букву "F" ----------------');

    const titleTwo = document.createElement('h2');

    titleTwo.innerText = 'Данные всех пользователей с фамилией на букву "F"';
    titleTwo.classList = 'titleTwo';
    document.body.appendChild(titleTwo);

    const userNameFwrapper = document.createElement('div');
    userNameFwrapper.classList = 'userNameFwrapper';
    document.body.appendChild(userNameFwrapper);


    usersData.forEach((element) => {
      if (element.last_name[0] === 'F') {

        const cardUserF = document.createElement('div');
        cardUserF.classList = 'cardUserF';
        userNameFwrapper.appendChild(cardUserF)

        const titleCardF = document.createElement('h3');
        titleCardF.classList = 'titleCardF';
        titleCardF.innerText = element.last_name;
        cardUserF.appendChild(titleCardF)

        console.log('  ' + element.last_name + ':');

        for (const item in element) {
          const dataUserF = document.createElement('div');
          const imageUserF = document.createElement('img');
          const emailUserF = document.createElement('a');
          emailUserF.classList = 'emailUserF';
          imageUserF.classList = 'imageUserF';

          if (item === 'email') {
            emailUserF.href = `mailto:${element[item]}`;
            emailUserF.innerHTML = item + ': ' + element[item];
            cardUserF.appendChild(emailUserF);
          } 
          
          else if (item === 'avatar') {
            imageUserF.src = element[item];
            imageUserF.alt = 'Avatar';
            cardUserF.appendChild(imageUserF);
          } 
          
          else {
            dataUserF.innerHTML = item + ': ' + element[item];
            cardUserF.appendChild(dataUserF);
            console.log(' '.repeat(4) + item + ': ' + element[item] + ',');
          }
        }

        // ------- Информация о пользователе ------- //
        const btn = document.createElement('button');
        btn.classList = 'btnUser';
        btn.textContent = 'info'
        cardUserF.appendChild(btn);

        btn.addEventListener('click', () => {

          const container = document.createElement('div');
          container.classList = 'containerUser';
          document.body.appendChild(container);

          const closeContainer = document.createElement('div');
          closeContainer.classList = 'closeContainer';
          container.appendChild(closeContainer);

          closeContainer.addEventListener('click', (event) => {
            container.remove();
          })

          fetch(`https://reqres.in/api/users/${element.id}`)
            .then((response) => response.json())
            .then((result) => {
              const user = result.data;
              const userWrapper = document.createElement('div');
              userWrapper.classList = 'userWrapper';
              container.appendChild(userWrapper);

              console.log(user);
            })
            .catch((error) => {
              console.error("Данные не получены", error);
            })
        })
      }
    });

    // ---------------------- Фамилии и Имена всех пользователей с помощью метода reduce ---------------------- //

    const name_lastName = document.createElement('h2');
    name_lastName.innerText = 'Фамилии и Имена всех пользователей с помощью метода reduce'
    name_lastName.classList = 'name_lastName';
    document.body.append(name_lastName);

    const paragraphUserName = document.createElement('h3');
    paragraphUserName.innerText = 'Наша база содержит данные следующих пользователей:'
    paragraphUserName.classList = 'paragraphUserName';
    document.body.append(paragraphUserName);

    const ulAllUserName = document.createElement('ul');
    ulAllUserName.classList = 'ulAllUserName';
    document.body.append(ulAllUserName);

    console.log('---------------- Фамилии и Имена всех пользователей с помощью метода reduce ----------------');

    const reduceUser = usersData.reduce((accumulator, item, index, array) => {
      const liUserName = document.createElement('li');
      ulAllUserName.appendChild(liUserName);
      liUserName.classList = 'liUserName';
      liUserName.innerText = `${item.first_name} ${item.last_name}`;

      let resString = `${item.first_name} ${item.last_name}`;
      if (index !== array.length - 1) {
        resString += ', ';
      } else {
        resString += '.';
      }
      accumulator += resString;
      return accumulator;
    }, '');

    console.log(
      `Наша база содержит данные следующих пользователей: ${reduceUser}`);

    // ---------------------- Все ключи в объекте пользователя ---------------------- //

    const keysUser = document.createElement('h2');
    keysUser.innerText = 'Все ключи в объекте пользователя';
    keysUser.classList = 'keysUser';
    document.body.append(keysUser);

    const ulAllKeysUser = document.createElement('ul');
    ulAllKeysUser.classList = 'ulAllKeysUser';
    document.body.appendChild(ulAllKeysUser);

    console.log('---------------- Все ключи в объекте пользователя ----------------');

    arrayKeys = usersData.reduce((container, obj) =>
      [...container, ...Object.keys(obj)], []);
    arrayKeysFilter = [...new Set(arrayKeys)];
    console.log(arrayKeysFilter.join(', '));

    for (const item in arrayKeysFilter) {
      const liAllKeyUser = document.createElement('li');

      liAllKeyUser.classList = 'liAllKeyUser';
      liAllKeyUser.innerHTML = arrayKeysFilter[item];

      ulAllKeysUser.appendChild(liAllKeyUser);
    }
  })
  .catch((error) => {
    console.log('Что-то пошло не так!!! ===> ', error);
  });
