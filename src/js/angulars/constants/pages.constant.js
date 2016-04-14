angular.module('base')
.constant('PAGES', [{

    // default page
    url: 'home',
    name: 'О нас',
    needMemberLevel: 0
},{
    url: 'news',
    name: 'Новости',
    needData: true,
    needMemberLevel: 0
},{
    url: 'rating',
    name: 'Рейтинг',
    needData: true,
    needMemberLevel: 0
},{
    url: 'members',
    name: 'Члены клуба',
    needData: true,
    needMemberLevel: 0
},{
    url: 'hall_of_fame',
    name: 'Зал Славы',
    needData: true,
    needMemberLevel: 0
},{
    url: 'photos',
    name: 'Фото',
    needData: true,
    needMemberLevel: 0
},{
    url: 'contacts',
    name: 'Контакты',
    needData: true,
    needMemberLevel: 0
},{
    url: 'protocols',
    name: 'Бланки',
    needMemberLevel: 3
},{
    url: 'players',
    name: 'Игроки',
    needData: true,
    needMemberLevel: 3
}]);