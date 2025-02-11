# Личный проект «VuePizza»

## Техническое задание
### 1. Общая концепция
VuePizza — это веб-приложение для заказа пиццы. Сервис позволяет пользователю собрать свою собственную пиццу с любимыми ингредиентами и оформить заказ, при необходимости добавив в него дополнительные товары.

Если пользователь не авторизован, то доступны только страница конструктора пиццы и страница корзины, заказ не будет сохранён.

Если пользователь авторизован, то кроме конструктора пиццы и корзины также открывается возможность создавать и изменять адреса доставки, оформлять заказ, просматривать прошлые заказы и повторять их.

Основные сценарии использования сервиса:

* Создание пиццы по своему вкусу.
* Добавление дополнительных товаров.
* Оформление заказа на определённый адрес.
* Добавление/удаление/изменение адресов доставки.
* Просмотр истории заказов.
* Повтор ранее оформленных заказов.

### 2. Техническое описание
Для разработки сайта предлагается уже готовая вёрстка, от программиста требуется только написать клиентскую составляющую сайта, тем самым сделав сайт динамическим (пользователь может взаимодействовать с интерфейсом сайта, получая необходимый результат).

Разработка клиентской части должна быть произведена на JavaScript-фреймворке Vue.js v2.6.

Не предполагается работ по вёрстке, а также бэкенд-части.

### 3. Описание процессов
Процесс — это автономная операция, выполняющая полезное действие. К примеру: добавление ингредиента на пиццу или изменение размера пиццы.

#### 3.1. Авторизация пользователя
Выполняется после заполнения формы на странице «Авторизация».

Последовательность действий:

1. Убедиться, что заполнены все обязательные поля.
2. Проверить, что пользователь отправил форму (клик на кнопку или `enter`).
3. Если есть ошибки заполнения формы, то вывести их на экран.
4. Сделать запрос на backend и обработать полученный ответ.
5. После ответа сервера:
* либо перевести пользователя на главную страницу проекта при успешной авторизации;
* либо показать соответствующую ошибку.

Поля для валидации:

1. Поле `email` обязательно для заполнения и должно быть валидно.
2. Поле пароля обязательно для заполнения.

#### 3.2. Работа конструктора пиццы
Конструктор пиццы находится на главной странице проекта. 
Собрать свою пиццу в конструкторе может любой пользователь.
~~При изменении любого из параметров пиццы должна изменяться итоговая цена. Цены на все ингредиенты и параметры прописаны в разделе 5.~~

~~##### 3.2.1 Изменение теста
Пользователь может выбрать один из двух видов теста:~~

~~1. Пицца на тонком тесте.~~
~~2. Пицца на толстом тесте.~~

~~При изменении вида теста изменяется изображение большой пиццы. Для этого элементу большой пиццы `div.pizza` должен быть присвоен соответствующий класс:~~

~~1. `pizza--foundation--big-creamy` — пицца на толстом тесте со сливочным соусом.~~
~~2. `pizza--foundation--big-tomato` — пицца на толстом тесте с томатным соусом.~~
~~3. `pizza--foundation--small-creamy` — пицца на тонком тесте со сливочным соусом.~~
~~4. `pizza--foundation--small-tomato` — пицца на тонком тесте с томатным соусом.~~

~~##### 3.2.2 Изменение размера~~
~~Пользователь может выбрать один из трёх размеров пиццы:~~
~~1. Пицца диаметром 23 см.~~
~~2. Пицца диаметром 32 см.~~
~~3. Пицца диаметром 45 см.~~

~~##### 3.2.3 Изменение соуса~~
~~Пользователь может выбрать один из двух видов соусов:~~

~~1. Пицца со сливочным соусом.~~
~~2. Пицца с томатным соусом.~~

~~При изменении вида соуса изменяется изображение большой пиццы. Для изменения изображения используются классы, описанные в **пункте 3.2.1**.~~

~~##### 3.2.4 Изменение ингредиентов~~
~~Пользователь может выбрать любой набор понравившихся ингредиентов. При добавлении/удалении любого ингредиента меняется итоговая цена пиццы.~~

~~Максимальное количество одинаковых ингредиентов на пицце — 3.~~

~~Добавлять ингредиенты на пиццу можно двумя способами:~~

~~1. Drag-n-drop — пользователь хватает мышкой ингредиент и тянет его на пиццу. Эффект должен происходить с анимацией.~~
~~2. Нажатие иконки `+` под соответствующим ингредиентом.~~

~~Удалять ингредиенты с пиццы можно только нажатием кнопки `-`.~~

~~В случае если количество ингредиента на пицце равно 3-м, кнопка `+` становится неактивной, также отключается возможность переноса ингредиента на пиццу.~~

~~В случае если количество ингредиента на пицце равно 0, кнопка `-` становится неактивной.~~

~~При добавлении нового ингредиента в `div.pizza__wrapper` добавляется новый `div` с классом `pizza__filling` и классом-модификатором, соответствующим ингредиенту:~~

* ананас — `pizza__filling--ananas`;
* бекон — `pizza__filling--bacon`;
* блю чиз — `pizza__filling--blue_cheese`;
* чеддер — `pizza__filling--cheddar`;
* чили — `pizza__filling--chile`;
* ветчина — `pizza__filling--ham`;
* халапеньо — `pizza__filling--jalapeno`;
* моцарелла — `pizza__filling--mozzarella`;
* грибы — `pizza__filling--mushrooms`;
* маслины — `pizza__filling--olives`;
* лук — `pizza__filling--onion`;
* пармезан — `pizza__filling--parmesan`;
* салями — `pizza__filling--salami`;
* лосось — `pizza__filling--salmon`;
* томаты — `pizza__filling--tomatoes`.

~~Если добавляется 2 одинаковых ингредиента, то в `div.pizza__wrapper` нужно добавить код:~~

`<div class="pizza__wrapper">`

  `<div class="pizza__filling pizza__filling--ananas pizza__filling--second"></div>`

`</div>`

~~Если добавляется 3 одинаковых ингредиента, то код будет:~~

`<div class="pizza__wrapper">`
    `<div class="pizza__filling pizza__filling--ananas pizza__filling--third"></div>`
`</div>`

~~##### 3.2.5 Название пиццы~~

~~Поле названия пиццы обязательно для заполнения.~~

~~##### 3.2.6 Итоговая цена пиццы~~

~~Итоговая цена формируется исходя из добавленных ингредиентов и применённых параметров теста, размера и соуса. Для каждого размера пиццы есть мультипликатор умножения стоимости. То есть, стоимость пиццы формируется так:~~ 

~~мультипликатор размера `х` (стоимость теста `+` соус `+` ингредиенты).~~

##### 3.2.7 Добавление в корзину

При нажатии на кнопку «Готовьте» пицца с выбранными параметрами добавляется в корзину. 
~~Если не было выбрано ни одного ингредиента и/или не введено название пиццы, то кнопка «Готовьте» будет неактивной.~~

#### 3.3. Работа корзины
Корзина доступна всем пользователям. Если в корзине нет ни одного товара, то отображается div.cart__empty. Если в корзине есть товары — отображаются все основные блоки:
1. Список товаров.
2. Список дополнительных товаров.
3. Блок данных по доставке.
4. Подвал с кнопками.

##### 3.3.1 Список товаров
В списке товаров отображаются созданные в конструкторе пиццы. В каждом пункте отображается название пиццы, введённое пользователем, а также состав пиццы.

Можно добавить ещё пиццу за счёт нажатия `+` или убрать одну за счет нажатия `-`. При изменении количества пицц меняется сумма в пункте товара, а также меняется итоговая сумма в корзине. Если количество товара равно нулю, то товар удаляется из корзины.

Если пользователь нажимает кнопку «Изменить» — происходит переход на страницу конструктора, в котором будут применены все параметры пиццы.

##### 3.3.2 Дополнительные товары
Пользователь может выбрать дополнительные товары. Работа пункта дополнительного товара сходна с работой обычного товара, описанного в **пункте 3.3.1**.

Список дополнительных товаров можно получить из запроса API.

##### 3.3.3 Данные о доставке
Если пользователь неавторизован, то он может выбрать два пункта в `select` «Получение заказа»:

1. «Получу сам» — в этом случае не отображаются элементы адреса, отображается только поле ввода телефона;
2. «Новый адрес» — в этом случае отображаются элементы адреса и поле ввода телефона.

Если пользователь авторизован, то он может выбрать несколько пунктов:

1. «Получу сам» — функционал идентичен с неавторизованным пользователем;
2. «Новый адрес» — функционал идентичен с неавторизованным пользователем;
3. «Существующий адрес» — адрес, который пользователь добавил в личном кабинете. Существующих адресов может быть несколько. Если выбран любой из существующих, то в полях адреса отображаются параметры выбранного адреса. Изменять параметры существующего адреса на странице корзины нельзя.

##### 3.3.4 Оформление заказа
Если неавторизованный пользователь нажимает на кнопку «Оформить заказ», должен быть показан попап «Спасибо за заказ», в запросе поле `userId` должно быть `null`. При клике в попапе на кнопку «Отлично, я жду!» производится переход на главную страницу, закрытие приводит к тому же действию.

Если авторизованный пользователь нажимает на кнопку «Оформить заказ», то показывается попап «Спасибо за заказ», данные о заказе передаются на backend, при клике в попапе на «Отлично, я жду!» или закрытии попапа происходит переход на страницу «История заказов».

В обоих случаях необходимо:

1. Проанимировать закрытие модального окна
2. Сделать переход на соответствующую страницу
3. Очистить состояния конструктора и корзины (Vuex)

#### 3.4. История заказов
Страница доступна только авторизованному пользователю. На странице отображаются созданные заказы, а также меню слева.

##### 3.4.1 Блок заказа
Отображается созданный заказ, оформленный ранее пользователем. Данные о заказе извлекаются из backend, запрос для получения данных API:
* при нажатии на кнопку «Удалить» — заказ удаляется, данные об удалении отправляются на адрес API;
* при нажатии на кнопку «Повторить» — все данные заказа добавляются в корзину, происходит переход на страницу корзины.

#### 3.5. Мои данные
Страница доступна только авторизованному пользователю. На странице отображаются:

1. Имя пользователя.
2. Контактный телефон пользователя.
3. Адреса для доставки, созданные пользователем.

Обязательные поля в форме адреса:

1. Название.
2. Улица.
3. Дом.

Необязательные поля в форме адреса:

1. Квартира.
2. Комментарий.

##### 3.5.1 Блок адреса доставки
Отображаются данные адреса доставки. Данные извлекаются из backend, запрос для получения данных API:
1. при нажатии на иконку карандаша данные адреса можно изменять;
2. при нажатии на кнопку «Сохранить» данные адреса отправляются на backend;
3. при нажатии на кнопку «Удалить» адрес удаляется;
4. при нажатии на кнопку «Добавить новый адрес» открывается форма для создания нового адреса. При сохранении нового адреса отправляется запрос API. Кнопка «удалить» должна быть скрыта.

#### 3.6. Меню
Меню отображается только на странице «Мои данные» и на странице «История заказов». В меню активным подсвечивается тот пункт, на странице которого находится пользователь.

#### 3.7. Шапка сайта
Отображается на всех страницах сайта:

* если пользователь неавторизован: отображается ссылка для входа. При нажатии осуществляется переход на страницу авторизации;
* если пользователь авторизован: отображается аватар и имя пользователя. При нажатии осуществляется переход на страницу «Мои данные».

Корзина отображается для всех пользователей. Сумма формируется из стоимости всех добавленных товаров в корзину.

#### 3.8. Попап «Спасибо за заказ»
Отображается при нажатии на кнопку «Оформить заказ» на странице корзины. Появление попапа должно происходить с анимацией, созданной средствами Vue.js. Скрытие блока также должно сопровождаться анимацией.

### 4. Список всех страниц
   Сайт состоит из следующих страниц:
1.    Главная страница (страница конструктора пиццы).
2.    Корзина.
3.    Страница авторизации.
4.    История заказов.
5.    Мои данные.

#### 4.1. Главная страница
   Доступна всем пользователям. Функционал для авторизованного и неавторизованного пользователя одинаков.

Функционал страницы описан в **пункте 3.2**.

#### 4.2. Страница авторизации
Доступна только неавторизованным пользователям по адресу /login.

Функционал страницы описан в **пункте 3.1**.

#### 4.3. Страница корзины
Доступна всем пользователям по адресу `/cart`.

* если пользователь не авторизован, то при нажатии на «Оформить заказ» появляется попап, при закрытии которого происходит переход на главную страницу;
* если пользователь авторизован, то при нажатии на «Оформить заказ» появляется попап, при закрытии которого происходит переход на страницу «История заказов», данные о заказе отправляются на сервер.

Функционал страницы описан в **пункте 3.3**.

#### 4.4. Страница истории заказов
Доступна только авторизованным пользователям по адресу `/orders`.

Функционал страницы описан в **пункте 3.4**.

#### 4.5. Страница «Мои данные»
Доступна только авторизованным пользователям по адресу `/profile`.

Функционал страницы описан в **пункте 3.5**.

#### 4.6. Переходы между экранами
Все переходы между экранами должны осуществлятся с анимацией «slide».

### 5. Документация серверной части (backend)
   Документация (OpenAPI) доступна при запущенном локально проекте по адресу `http://localhost:3000/explorer`.

В документации описаны все доступные эндпоинты и описание сущностей для получения/создания/изменения/удаления данных.


__________

## Frontend установка

- Перейти в директорию

`cd src/frontend`

- Установить зависимости

`$ npm install`

## Backend установка

- Перейти в директорию

`cd src/backend`

- Установить зависимости

`$ npm install`

## Docker установка проекта

- Выполнить команду

`$ docker-compose build .`

- Запустить проект с помощью команды

`$ make start_project`

- Сервер будет запущен по адресу localhost:3000, а клиент по адресу localhost:8080

## Вход для авторизированного пользователя

Мы создали готового пользователя и разместили его в нашей базе данных.
Для входа в систему используйте следующие данные:

```
email: user@example.com
password: user@example.com
```

Вы можете поменять данные пользователя в файле `src/backend/src/factory/users.json`

## Документация эндпоинтов сервера (OpenAPI)
Запустите проект и перейдите по адресу

```
http://localhost:3000/explorer/
```

## Запуск и просмотр готовой верстки проекта

Перейтите в директорию
```
template/
```

Установите зависимости выполнив команду

```
npm install
```

Запустите проект командой

```
npm start
```

Шаблон и верстка будут доступны по адресу `http://localhost:9999`

Верстку можно посмотреть в директории `template/src`
