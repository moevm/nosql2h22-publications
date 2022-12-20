# Модель данных
## Нереляционная модель данных (для вашей СУБД)
### Графическое представление
![alt text](https://i.ibb.co/6mdmsW7/db-fix.png)
### Описание назначений коллекций, типов данных и сущностей
Всего в проекте необходимо 3 сущности - Author - автор, Organization - организация и  Publication - публикация. (В MongoDB латинские буквы и символы кодируются 1 байтом, а кириллические буквы – 2 байтами).

Ниже представлено описание коллекций:
Database
```bash
author:                               // коллекция, содержащая информацию об авторе (итого 84 байта)
{
    id_author: ObjectId,                          // идентификатор автора (12 байт)
    FIO: String,                                  // ФИО автора (до 30 символов или 60 байт)
    id_organization: ObjectId,                    // идентификатор организации (12 байт)
    id_publications: [ObjectId, ..., ObjectId]    // публикации (от 12 байт)
}

organization:                                     // коллекция, содержащая информацию об организации (итого 76 байта)
{
    id_organization: ObjectId,                    // идентификатор организации (12 байт)
    name_organization: String,                    // название организации (до 20 символов или 40 байт)
    id_authors: [ObjectId, ..., ObjectId]        // авторы (от 12 байт)
    id_publications: [ObjectId, ..., ObjectId]   // публикации (от 12 байт)  
}

publication:                               // коллекция, содержащая информацию о публикации (итого 445 байта)
{
    id_publication: ObjectId,                  // идентификатор публикации (12 байт)
    name_publication: String,                  // название публикации (до 20 символов или 40 байт)
    year_publication: 64-Bit Integer,          // год публикации (4 байта)
    link_publication: String,                  // ссылка на публикацию (до 50 символов или 50 байт)
    API: String,                               // API (до 15 символов или 15 байт)
    edition: String,                           // издание (до 30 символов или 60 байт)
    description: String                        // краткое описание публикации (до 130 символов или 260 байт)
    id_organization: ObjectId,                    // идентификатор организации (12 байт)
    id_authors: [ObjectId, ..., ObjectId]         // авторы  (от 12 байт)
}
```
### Пример данных 
Автор:
```bash
{
    id_author: ObjectId("1111a1e112df7f8644c2cea2"),       
    FIO: "Лапина Анастасия Андреевна",
    id_organization: ObjectId("2222a1e112df7f8644c2cea2"),       
    id_publications: [ObjectId("3333a1e112df7f8644c2cea2"), ObjectId("aaaaa1e112df7f8644c2cea2")]          
}
```
Организация:
```bash
{
    id_organization: ObjectId("2222a1e112df7f8644c2cea2"),              
    name_organization: "ЛЭТИ",
    id_authors: [ObjectId("1111a1e112df7f8644c2cea2")]       
    id_publications: [ObjectId("3333a1e112df7f8644c2cea2"), ObjectId("aaaaa1e112df7f8644c2cea2")]    
}              
}
```
Публикация:
```bash
{
    id_publication: ObjectId("3333a1e112df7f8644c2cea2"),        
    name_publication: "Имя публикации",                  
    year_publication: 2022,
    link_publication: "https:/etu.ru",       
    API: "Google Scholar",
    edition: "Научное издание номер 1",                            
    description: "В публикации ...",      
    id_organization: ObjectId("2222a1e112df7f8644c2cea2"),                  
    id_authors: [ObjectId("1111a1e112df7f8644c2cea2")]                        
}
```
### Оценка удельного объема информации, хранимой в модели (сколько потребуется памяти, чтобы сохранить объекты, как объем зависит от количества объектов)
Будем считать, что у нас Xa- авторов, Xo - организаций и Xp - публикаций.
Следовательно, объем информации можно найти так: 84 * Xa + 76 * Xo + 445 * Xp,
Xo и Xp можно считать словарями, и значит, их размеры берем за константу, тогда получаем оценку удельного объема информации: 605*Xa

### Избыточность модели
Избыточными полями в нашей бд являются: id_author, id_organization, id_publication. Тогда суммарный объем избыточных данных равен 36, а чистых 569*Xa
Следовательно, избыточность модели равна: (605/569)*Xa ~ 1,06

### Направление роста модели
Рассматривая модель данных и полученные результаты, можно сделать вывод о том, что модель растёт с линейной скоростью.

### Запросы к модели, с помощью которых реализуются сценарии использования
* Поиск автора 
```bash
let FIO_ = "Иванов Иван Иванович";

db.author.find({FIO: FIO_});
```
* Поиск организации 
```bash
let organization = "ЛЭТИ";

db.organization.find({name_organization: organization});
```

* Поиск публикации 
```bash
let publication = "Какое-то название";

db.publication.find({name_publication: publication});
```

## Аналог модели данных для SQL СУБД - характеризуется аналогично нереляционной
### Графическое представление
Разработана аналогичная схема реляционной базы данных:
![alt text](https://i.ibb.co/pfd38jc/db2.png)
### Описание назначений коллекций, типов данных и сущностей
Всего в проекте необходимо 3 сущности - Author - автор, Organization - организация и  Publication - публикация.

Ниже представлено описание коллекций:
Будем использовать Unicode, то есть символы кодируются 2 байтами
Database
```bash
author:                               // коллекция, содержащая информацию об авторе (итого 96 байта)
{
    id_author: ObjectId,              // идентификатор автора (12 байт)
    FIO: String,                      // ФИО автора (до 30 символов или 60 байт)
    id_organization: ObjectId,        // идентификатор организации (12 байт)
    id_publication: ObjectId          // идентификатор публикации (12 байт)
}

organization:                               // коллекция, содержащая информацию об организации (итого 76 байта)
{
    id_organization: ObjectId,              // идентификатор организации (12 байт)
    name_organization: String,              // название организации (до 20 символов или 40 байт)
    id_author: ObjectId,                    // идентификатор автора (12 байт)
    id_publication: ObjectId                // идентификатор публикации (12 байт)
}

publication:                               // коллекция, содержащая информацию о публикации (итого 530 байта)
{
    id_publication: ObjectId,                  // идентификатор публикации (12 байт)
    name_publication: String,                  // название публикации (до 20 символов или 40 байт)
    year_publication: 64-Bit Integer           // год публикации (4 байта)
    link_publication: String                   // ссылка на публикацию (до 50 символов или 100 байт)
    API: String                                // API (до 15 символов или 30 байт)
    edition: String                            // издание (до 30 символов или 60 байт)
    description: String                        // краткое описание публикации (до 130 символов или 260 байт)
    id_author: ObjectId,                       // идентификатор автора (12 байт)
    id_organization: ObjectId                  // идентификатор организации (12 байт)
}
```
### Пример данных 
Автор:
```bash
{
    id_author: ObjectId("1111a1e112df7f8644c2cea2"),       
    FIO: "Лапина Анастасия Андреевна",       
    id_organization: ObjectId("2222a1e112df7f8644c2cea2"),  
    id_publication: ObjectId("3333a1e112df7f8644c2cea2")   
}
```
Организация:
```bash
{
    id_organization: ObjectId("2222a1e112df7f8644c2cea2"),              
    name_organization: "ЛЭТИ",       
   id_author: ObjectId("1111a1e112df7f8644c2cea2"), 
   id_publication: ObjectId("3333a1e112df7f8644c2cea2")      
}
```
Публикация:
```bash
{
    id_publication: ObjectId("3333a1e112df7f8644c2cea2"),        
    name_publication: "Имя публикации",                  
    year_publication: 2022,
    link_publication: "https:/etu.ru",      
    API: "Google Scholar",
    edition: "Научное издание номер 1",                            
    description: "В публикации ...",  
    id_author: ObjectId("1111a1e112df7f8644c2cea2"), 
    id_organization: ObjectId("2222a1e112df7f8644c2cea2")                     
}
```
### Оценка удельного объема информации, хранимой в модели (сколько потребуется памяти, чтобы сохранить объекты, как объем зависит от количества объектов)
Будем считать, что у нас Xa- авторов, Xo - организаций и Xp - публикаций.
Следовательно, объем информации можно найти так: 96 * Xa + 76 * Xo + 530 * Xp,
Xo и Xp можно считать словарями, и значит, их размеры берем за константу, тогда получаем оценку удельного объема информации: 702*Xa

### Избыточность модели
Избыточными полями в нашей бд являются: id_author, id_organization, id_publication. Тогда суммарный объем избыточных данных равен 36, а чистых 666*Xa
Следовательно, избыточность модели равна: (702/666)*Xa ~ 1,05

### Направление роста модели
Рассматривая модель данных и полученные результаты, можно сделать вывод о том, что модель растёт с линейной скоростью.

### Запросы к модели, с помощью которых реализуются сценарии использования
* Поиск по автору 
```bash
SELECT publication.publication_name, author.FIO, publication.year_publication, publication.edition, publication.API, publication.description
FROM publication
  JOIN publication on publication.id_publication = author.id_publication
WHERE author.FIO = "Иванов Иван Иванович";
```

* Поиск по организации 
```bash
SELECT publication.publication_name, author.FIO, publication.year_publication, publication.edition, publication.API, publication.description
FROM publication
  JOIN publication on publication.id_publication = author.id_publication
  JOIN organization on organization.id_organization = publication.id_organization
WHERE organization.name_organization = "ЛЭТИ";
```

* Поиск по публикациям 
```bash
SELECT publication.publication_name, author.FIO, publication.year_publication, publication.edition, publication.API, publication.description
FROM publication
  JOIN publication on publication.id_publication = author.id_publication
WHERE publication.name_publication = "Публикация номер 1";
```

## Сравнение моделей
Сравнение реляционной и нереляционной моделей представленно в следующей таблице:

|                         |NoSQL   |  SQL   |
|-------------------------|--------|--------|
|Удельный объём информации|605 * Xa|702 * Xa|
|Избыточность		   |  1.06  |  1.05  |	
|Количество коллекций     |  3     |     3  |


Анализируя данные, можно сделать вывод, что нереляционная база данных лучше подходит для данной задачи, нежели реляционная, так как удельный объем информации у нереляционной меньше, при этом показатель избыточности у нее незначительно больше, поэтому им можно пренебречь.
