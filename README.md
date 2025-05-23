# Установка проекта

Чтобы установить проект вам нужен git либо скачанный архив проекта с github,
если есть git то пишем в терминал

```
git clone https://github.com/phonejuice14/virtualization.git
```
После этого переходим в папку проекта через терминал
```
cd virtualization
```
Дальше нужен будет node.js, скачать можно здесь https://nodejs.org/en

Отключаем проверку SSL сертификата
```
npm set strict-ssl false
```

Устанавливаем пакеты:
```
npm install 
```

Запускаем локальный сервер
```
npm start
```
Сайт будет доступен в браузере по адресу http://localhost:5173/
