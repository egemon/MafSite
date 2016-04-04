angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("base.html","<!DOCTYPE html>\n<html lang=\"en\" ng-app=\"base\" ng-strict-di>\n<head>\n    <meta charset=\"UTF-8\">\n    <title>BakerStreet 221b Mafia Club</title>\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"public/MafSite/assets/css/base.min.css\">\n</head>\n<body id=\"page-container\" ng-controller=\"baseCtrl\">\n    <header id=\"header\">\n        <div class=\"page-title-container\">\n            <a id=\"page-logo-ref\" ui-sref=\"{{\'/\' + PAGES[0].url}}\">\n                <img src=\"img/main_logo.png\" alt=\"BakerLogo\" id=\"pageLogo\" ng-class=\"logoClass\">\n            </a>\n            <div id=\"page-title\">\n                <div class=\"page-title-part\">\"Baker Street 221b\"</div>\n                <div class=\"page-title-part\">Mafia Club</div>\n            </div>\n        </div>\n        <nav>\n            <ul class=\"main-menu\">\n                <li class=\"main-menu-item\" ng-repeat=\"(i, thisPage) in PAGES\" ng-class=\"{current:thisPage.url == page}\">\n                    <a class=\"main-menu-ref\" ui-sref=\"{{\'/\' + thisPage.url}}\" ng-click=\"setPage(thisPage.url, i)\">\n                        {{thisPage.name}}\n                    </a>\n                </li>\n            </ul>\n        </nav>\n    </header>\n    <main ui-view>\n    </main>\n\n\n    <script src=\"public/MafSite/assets/js/main.min.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n</body>\n</html>");
$templateCache.put("pages/contacts.html","<div class=\"player\" id=\"top0-player\" ng-repeat=\"(i, contact) in contacts\">\n    <img\n        class=\"player-logo\"\n        ng-src=\"data-base/players/img/{{contact.img}}.jpg\"\n        alt=\"{{contact.nick}}\"\n        ng-click=\"openNewTab(contact.vk)\"\n        vk={{contact.vk}}\n    >\n    <p class=\"player-nick\">{{contact.nick}}</p>\n    <p class=\"player-faculty\">{{contact.name}}</p>\n    <p class=\"player-faculty\">{{contact.position}}</p>\n    <p class=\"player-faculty\">{{contact.faculty}}</p>\n    <p class=\"player-exp\">{{contact.experiance}}</p>\n    <p class=\"contact-phone\">{{contact.phone}}</p>\n</div>");
$templateCache.put("pages/error.html","Error!\n<%err%>");
$templateCache.put("pages/hall_of_fame.html","<div class=\"top-block\">\n    <div ng-repeat=\"(i, period) in hall_of_fame\">\n        <title class=\"top-title\">{{period.title}}</title>\n        <div id=\"top-players\">\n            <div ng-repeat=\"(j, player) in period.honours\" class=\"player\" id=\"top{{j+1}}-player\" ng-include=\"\'pages/partials/player.html\'\">\n            </div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("pages/home.html","<article>\n    <p>\n        Клуб мафии Киевского Национального Университета им.Т. Шевченко Baker Street 221b проводит игры в течении 5 лет,\n        являясь членом Студенческой Лиги Игры Мафия (СЛИМ) Федерации Интеллектуальной Игры Мафия(ФИИМ).\n    </p>\n    <p>\n        Подарок от клуба для всех именинников - бесплатное посещение следующей встречи после Вашего дня рождения.\n    </p>\n    <p>\n        Коллектив организаторов желает Вам приятных и интересных игр!\n    </p>\n    <p>\n        PS: Чтобы получать приглашения на встречи и быть в курсе всех событий из жизни клуба, вступайте в <a href=\"https://vk.com/baker_street_mafia_club\" target=\"_blank\"> нашу группу</a>\n    </p>\n    <p>\n        Добро пожаловать в Игру!\n    </p>\n</article>\n");
$templateCache.put("pages/members.html","<div class=\"top-block\">\n    <div id=\"top-players\">\n        <div ng-repeat=\"(i, player) in members\" class=\"player\" id=\"top0-player\" ng-include=\"\'pages/partials/player.html\'\">\n        </div>\n    </div>\n</div>\n");
$templateCache.put("pages/news.html","<article ng-repeat=\"(i, new) in news\">\n    <title>{{new.number}}ая встреча. Ждем Вас!</title>\n    <p>\n       Традиционно приглашаем Вас на <a href=\"https://vk.com/bs_vstrecha_{{new.number}}\" target=\"_blank\">встречу клуба</a> мафии Baker Street 221b!\n    </p>\n    <p>\n       Что? - {{new.what}}\n    </p>\n    <p>\n      Где? -\n      <a href=\"https://goo.gl/oFev5u\">\n       {{new.where}}\n      </a>\n    </p>\n    <p id=\"when{{i}}\">\n       Когда? -\n    </p>\n    <p>\n       Члеский взнос? - {{new.price}} за вечер игр\n    </p>\n    <p>\n      С уважением, команда организаторов.\n    </p>\n</article>");
$templateCache.put("pages/photos.html","<div class=\"photo\" ng-repeat=\"(i, photo) in photos\">\n    <a href=\"{{photo.href}}\" title=\"{{photo.title}}\" target=\"_blank\">\n        <img class=\"photo-logo\"\n        onerror=\"this.src=\'../img/main_logo_black2.png\'; this.onerror=\'\'\"\n        ng-src=\"{{photo.src}}\"\n        alt=\"{{photo.title}}\"\n        >\n    </a>\n    <p class=\"photo-title\">{{photo.title}}</p>\n    <p class=\"photo-date\">{{photo.date}}</p>\n</div>");
$templateCache.put("pages/rating.html","<button class=\"form-button\" id=\'showLogin\' ng-click=\"isOrg = !isOrg\">Я орг</button>\n<div id=\"authform\" ng-show=\"isOrg == true\">\n    <input class=\"form-input\" id=\"user\" type=\"text\" placeholder=\"Ник\" ng-model=\"user\">\n    <input class=\"form-input\" id=\"password\" type=\"password\" placeholder=\"Пароль\" ng-model=\"password\">\n    <button id=\"authButton\" class=\"form-button\" ng-click=\"login(user, password)\">Войти</button>\n</div>\n<table class=\"table table-bordered table-striped\" id=\"ratingTable\" border=\'1\'>\n  <thead>\n    <tr>\n      <th>Фото</th>\n      <th>Ник</th>\n      <th>Сумма</th>\n      <th>Игр</th>\n      <th>Среднее</th>\n      <th>Лучшие от игроков</th>\n      <th>Лучшие от Судей</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class=\"rating-row\" id=\"{{player.name}}\" ng-repeat=\"(i, player) in rating\">\n      <td id=\"{{player.avatar}}\">\n        <img class=\"playerAvatarInRating\"\n        onerror=\"this.src=\'public/MafSite/assets/img/main_logo.png\'; this.onerror=\'\'\"\n        ng-src=\"data-base/players/img/{{player.name}}.jpg\"\n        alt=\"\">\n      </td>\n      <td>{{player.name}}</td>\n      <td>{{player.sum}}</td>\n      <td>{{player.gameNumber}}</td>\n      <td>{{player.sum / player.gameNumber | number:2}}</td>\n      <td>{{player.BP}}</td>\n      <td>{{player.BR}}</td>\n    </tr>\n  </tbody>\n</table>\n<script src=\"../js/plain/rating.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
$templateCache.put("pages/partials/player.html","<!-- <a href=\"{{player.vk}}\" target=\"_blank\" ng-i=\"player.vk\"> -->\n    <img\n    class=\"player-logo\"\n    ng-src=\"data-base/players/img/{{player.img}}.jpg\"\n    alt=\"{{player.nick}}\"\n    ng-click=\"openNewTab(player.vk)\"\n    vk={{player.vk}}\n    >\n<!-- </a> -->\n<p class=\"player-nick\">{{player.nick}}</p>\n<p class=\"player-results\" ng-show=\"player.avr\">{{player.avr + \' средний бал \'}}{{\'(\' + player.gameNumber + \' игр)\'}}</p>\n<p class=\"player-faculty\">{{player.faculty}}</p>\n<p class=\"player-exp\">{{player.experiance}}</p>\n<div class=\"honours\">\n    <div\n    ng-repeat=\"(j, honour) in player.honours\"\n    title=\"{{honour.title}}\"\n    class=\"{{honour.type}}-{{honour.place}} honour\"\n    ></div>\n</div>\n");}]);