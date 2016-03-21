angular.module('base')
.constant('PAGES', [{

    // default page
    url: 'home',
    name: 'О нас',
    needData: false
},{
    url: 'news',
    name: 'Новости',
    needData: true
},{
    url: 'rating',
    name: 'Рейтинг',
    needData: true
},{
    url: 'members',
    name: 'Члены клуба',
    needData: true
},{
    url: 'hall_of_fame',
    name: 'Зал Славы',
    needData: true
},{
    url: 'photos',
    name: 'Фото',
    needData: true
},{
    url: 'contacts',
    name: 'Контакты',
    needData: true
}]);