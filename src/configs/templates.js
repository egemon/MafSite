angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("base/base.html","<header id=\"header\">\n    <div class=\"page-title-container\">\n        <a id=\"page-logo-ref\" ui-sref=\"{{\'/\' + PAGES[0].url}}\" ng-click=\"setPage(PAGES[0])\">\n            <img src=\"public/MafSite/assets/img/main_logo.png\" alt=\"BakerLogo\" id=\"pageLogo\" ng-class=\"logoClass\" >\n        </a>\n        <div id=\"page-title\">\n            \"Baker Street 221b\" Mafia Club\n        </div>\n    <login-form ng-include=\"\'base/loginForm/loginForm.html\'\"></login-form>\n    </div>\n    <nav>\n        <ul class=\"main-menu\">\n            <li class=\"main-menu-item\" ng-repeat=\"(i, thisPage) in PAGES\" ng-class=\"{current:thisPage == page}\" ng-show=\"user.data.memberLevel >= thisPage.needMemberLevel\">\n                <a class=\"main-menu-ref\" ui-sref=\"{{\'/\' + thisPage.url}}\" ng-click=\"setPage(thisPage)\">\n                    {{thisPage.name}}\n                </a>\n            </li>\n        </ul>\n    </nav>\n</header>\n<main ui-view id=\"view\">\n</main>");
$templateCache.put("newPlayer/new-player.html","<td ng-repeat=\"(i, key) in fields\">\n<input\n    type=\"{{::inputTypes[key]}}\"\n    key=\"{{::key}}\"\n    ng-if=\"key !== \'presents\' && key !== \'honours\'\"\n    ng-model=\"newPlayer.data[key]\"\n>\n</input>\n<div class=\"hint\">\n    Данные некорректны! Проверьте.\n</div>\n\n\n<!-- presents container -->\n<div\n    ng-if=\"key ===\'presents\'\"\n    class=\"player-presents-container\"\n    data=\"{{::newPlayer.data.presents}}\"\n>\n    <!-- player-continer in repeate -->\n    <div\n        class=\'present-container\'\n        ng-repeat=\"(j, present) in newPlayer.data.presents track by $index \"\n    >\n        <span\n            data={{::present}}\n            key=\"presents\"\n            iterator=\"{{::j}}\"\n            ng-click=\"startEdit({$event: $event, player: newPlayer.data})\"\n        >\n            {{::present}}\n        </span>\n        <button class=\"remove-present-button\" ng-click=\"removeItem({items: newPlayer.data.presents, item: present})\">-</button>\n    </div>\n\n    <!--  new present container-->\n    <div>\n        <input type=\"text\" ng-model=\"newPresent\">\n        <button\n            class=\"add-present-button\"\n            ng-click=\"addPresent({presents: newPlayer.data.presents, present: newPresent}); newPresent = \'\'\"\n        >+</button>\n    </div>\n</div>\n\n\n<div ng-if=\"key ===\'honours\'\" ng-repeat=\"(j, honour) in player[key] track by $index\">\n    <div  ng-repeat=\"(Key, honour) in honour\">\n        <span class=\"player-honour-key\">\n            {{::Key}} :\n        </span>\n        <span class=\"player-honour-value\">\n            {{::honour}}\n        </span>\n    </div>\n</div>\n</td>\n<td>\n    <button id=\"add-player-button\" ng-click=\"addPlayer({player: newPlayer.data})\">+</button>\n</td>");
$templateCache.put("periodSelector/period-selector.html","<select\n    class=\"rating-select\"\n    ng-model=\"periodType\">\n    <option\n        ng-repeat=\"(periodType, val) in filterFields\"\n        value=\"{{::periodType}}\"\n        >\n        {{::val.name}}\n    </option>\n</select>\n<select\n    class=\"rating-select\"\n    ng-model=\"period\"\n    ng-show=\"periodType !== \'year\'\"\n    ng-options=\"item as item.name for item in filterFields[periodType].value track by item.value\"\n    >\n</select>\n<select\n    class=\"rating-select\"\n    ng-model=\"year\"\n    ng-options=\"item as item.name for item in filterFields.year.value track by item.value\"\n    >\n</select>\n");
$templateCache.put("player/player.html","<img\n    class=\"player-logo\"\n    ng-src=\"data-base/players/img/{{::player.img}}\"\n    alt=\"{{::player.nick}}\"\n    ng-click=\"openNewTab(player.vk)\"\n    vk={{::player.vk}}\n    onerror=\"this.src=\'public/MafSite/assets/img/main_logo.png\'; this.onerror=\'\'\"\n>\n<div class=\"player-text-container\">\n    <p class=\"player-nick\">{{::player.nick}}</p>\n    <p class=\"player-faculty\">{{::player.name}}</p>\n    <p class=\"player-results\" ng-show=\"player.avr\">{{::player.avr + \' средний бал \'}}{{::\'(\' + player.gameNumber + \' игр)\'}}</p>\n    <p class=\"player-faculty\" ng-show=\"player.memberLevel > 2\">{{::player.position}}</p>\n    <p class=\"player-faculty\">{{::player.faculty}}</p>\n    <p class=\"player-exp\">{{::player.experiance}}</p>\n    <p class=\"player-faculty\" ng-show=\"player.memberLevel > 2\">{{::player.phone}}</p>\n    <div class=\"honours\">\n        <div\n        ng-repeat=\"(j, honour) in player.honours\"\n        title=\"{{::honour.title}}\"\n        class=\"{{::honour.type}}-{{::honour.place}} honour\"\n        ></div>\n    </div>\n</div>\n");
$templateCache.put("base/loginForm/loginForm.html","<div>\n    <button class=\"form-button\" id=\'showLogin\' ng-click=\"loginActive = !loginActive\">{{loginActive ? \'Скрыть\' : \'Логин\'}}</button>\n    <div id=\"authform\" ng-show=\"loginActive\">\n        <input class=\"form-input\" id=\"user\" type=\"text\" placeholder=\"Ник\" ng-model=\"user.data.nick\">\n        <input class=\"form-input\" id=\"password\" type=\"password\" placeholder=\"Пароль\" ng-model=\"user.data.password\">\n        <button\n            id=\"authButton\"\n            class=\"form-button\"\n            ng-click=\"login(user); loginActive = false;\">\n            Войти\n        </button>\n    </div>\n</div>");
$templateCache.put("contacts/contacts.html","<div\n    class=\"player\"\n    id=\"top0-player\"\n    ng-repeat=\"(i, player) in contacts\"\n    ng-include=\"\'player/player.html\'\">\n</div>");
$templateCache.put("contents/contents.html","<button class=\"set-data-button\" ng-click=\"setMeetings(contents.data)\">Внести данные</button>\n<table>\n    <thead>\n        <tr>\n            <th ng-repeat=\"(i, key) in contents.fields\">{{::key}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr ng-repeat=\"(j, meeting) in contents.data\">\n            <td ng-repeat=\"(k, key) in contents.fields\">\n                <div\n                ng-click=\"startEdit($event, meeting)\"\n                class=\"content-block\"\n                key=\"{{::key}}\"\n                >\n                {{::meeting[key]}}\n                </div>\n            </td>\n            <td>\n                <button class=\"remove-button\" ng-click=\"removeItem(contents.data, meeting)\">-</button>\n            </td>\n        </tr>\n        <tr>\n           <td ng-repeat=\"(k, key) in contents.fields\">\n                <input type=\"text\" ng-model=\"newEvent[key]\">\n            </td>\n            <td>\n                <button class=\"remove-button\" ng-click=\"addItem(contents.data, newEvent); newEvent={};\">+</button>\n            </td>\n        </tr>\n    </tbody>\n</table>");
$templateCache.put("hall_of_fame/hall_of_fame.html","<div class=\"top-block\">\n    <div ng-repeat=\"(i, period) in hall_of_fame\">\n        <title class=\"top-title\">{{::period.title}}</title>\n        <div id=\"top-players\">\n            <div ng-repeat=\"(j, player) in period.honours\" class=\"player\" id=\"top{{::j+1}}-player\" ng-include=\"\'player/player.html\'\">\n            </div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("home/home.html","<article class=\"about_us_article\">\n    <p>\n        Клуб мафии Киевского Национального Университета им.Т. Шевченко Baker Street 221b проводит игры в течении 5 лет,\n        являясь членом Студенческой Лиги Игры Мафия (СЛИМ) Федерации Интеллектуальной Игры Мафия(ФИИМ).\n    </p>\n    <p>\n        Подарок от клуба для всех именинников - бесплатное посещение следующей встречи после Вашего дня рождения.\n    </p>\n    <p>\n        Коллектив организаторов желает Вам приятных и интересных игр!\n    </p>\n    <p>\n        PS: Чтобы получать приглашения на встречи и быть в курсе всех событий из жизни клуба, вступайте в <a href=\"https://vk.com/baker_street_mafia_club\" target=\"_blank\"> нашу группу</a>\n    </p>\n    <p>\n        Добро пожаловать в Игру!\n    </p>\n</article>\n\n");
$templateCache.put("members/members.html","<div class=\"top-block\">\n    <div id=\"top-players\">\n        <div ng-repeat=\"(i, player) in members\" class=\"player\" id=\"top0-player\" ng-include=\"\'player/player.html\'\">\n        </div>\n    </div>\n</div>\n");
$templateCache.put("news/news.html","<article class=\"article\" ng-repeat=\"(i, new) in news\">\n    <title class=\"article-title\">\n      {{::new.type === \'встреча\' ? new.number + new.title : new.title}}\n    </title>\n    <img class=\"player-logo\"\n      ng-src=\"data-base/players/img/{{::new.img}}\"\n      src=\"public/MafSite/assets/img/main_logo.png\"\n      onerror=\"this.src = \'public/MafSite/assets/img/main_logo.png\'; this.onerror=\'\'\"\n    >\n    <p class=\"entry\">\n        {{::new.entry}}\n      <a ng-if=\"new.vk\"  href=\'{{:: new.vk || \"https://vk.com/bs_vstrecha_\" + new.number}}\' target=\'_blank\'>\n          глянуть вк...\n      </a>\n    </p>\n    <p ng-if=\"new.what\">\n      Что? - {{::new.what}}\n    </p>\n    <p ng-if=\"new.where\">\n      Где? -\n      <a href=\"https://goo.gl/oFev5u\">\n       {{::new.where}}\n      </a>\n    </p>\n    <p ng-if=\"new.when\">\n       Когда? - {{::new.when | date: \'medium\'}}\n    </p>\n    <p ng-if=\"new.price\">\n       Сколько? - {{::new.price}} за вечер игр\n    </p>\n    <p>\n      С уважением, команда организаторов.\n    </p>\n</article>");
$templateCache.put("photos/photos.html","<div class=\"photo\" ng-repeat=\"(i, photo) in photos\">\n    <button\n        id=\"add-player-button\"\n        ng-click=\"photosCtrl.removeItem(photos, photo)\"\n        ng-show=\"user.data.memberLevel >= 3\">Удалить</button>\n    <a href=\"{{::photo.href}}\" title=\"{{::photo.title}}\" target=\"_blank\">\n        <img class=\"photo-logo\"\n        onerror=\"this.src=\'../img/main_logo_black2.png\'; this.onerror=\'\'\"\n        ng-src=\"{{::photo.src}}\"\n        alt=\"{{::photo.title}}\"\n        >\n    </a>\n    <p class=\"photo-title\">{{::photo.title}}</p>\n    <p class=\"photo-date\">{{::photo.date | date}}</p>\n</div>\n\n\n<div ng-show=\"user.data.memberLevel >= 3\">\n    <label>\n        Название\n    <input\n        type=\"text\"\n        ng-model=\"newPhoto.title\"\n    >\n    </input>\n    </label>\n    <label>\n        Дата\n    <input\n        type=\"date\"\n        ng-model=\"newPhoto.date\"\n    >\n    </input>\n    </label>\n    <label>\n        Ссылка\n    <input\n        type=\"text\"\n        ng-model=\"newPhoto.href\"\n    >\n    </input>\n    </label>\n    <label>\n        Картинка\n    <input\n        type=\"text\"\n        ng-model=\"newPhoto.src\"\n    >\n    </input>\n    </label>\n    <button id=\"add-player-button\" ng-click=\"photosCtrl.addItem(photos, newPhoto);newPhoto = {};\">Добавить</button>\n</div>");
$templateCache.put("players/player-tr.html","<td ng-repeat=\"(j, key) in players.fields\" >\n<div ng-if=\"key === \'#\'\">\n    {{::i+1}}\n</div>\n\n<div\n    class=\"player-input\"\n    key=\"{{::key}}\"\n    ng-if=\"key !== \'presents\' && key !== \'honours\' && key !== \'image\' && key !== \'#\'\"\n    ng-click=\"startEdit($event, player, playersCtr.inputTypes[key])\"\n    date = \"{{::key == \'birthday\' ? (player[key] | date:\'yyyy-MM-dd\') : \'\'}}\"\n>\n    {{::key == \'birthday\' ? (player[key] | date) : player[key]}}\n</div>\n<div class=\"hint\">\n    Данные некорректны! Проверьте.\n</div>\n\n<!-- presents container -->\n<div\n    class=\"player-presents-container\"\n    ng-if=\"key ===\'presents\'\"\n    data=\"{{::player.presents}}\"\n>\n    <!-- player-continer in repeate -->\n    <div\n        class = \"present-container\"\n        ng-repeat=\"(j, present) in player[key] track by $index \"\n    >\n        <span\n            data={{::present}}\n            key=\"presents\"\n            iterator=\"{{::j}}\"\n            ng-click=\"startEdit($event, player)\"\n        >\n            {{::present}}\n        </span>\n        <button class=\"remove-present-button\" ng-click=\"removeItem(player.presents, present)\">-</button>\n    </div>\n    <div>\n        <input\n            class=\"new-present-input\"\n            type=\"text\"\n            ng-model=\"newPresent\">\n        <button\n            class=\"add-present-button\"\n            ng-click=\"addPresent(player.presents, newPresent); newPresent = \'\'\"\n        >+</button>\n    </div>\n</div>\n\n<div\n    ng-if=\"key ===\'image\'\"\n    >\n    <input\n        type = \"file\"\n        file-model = \"player.imgFile\"\n    >\n</div>\n</td>\n<td>\n    <button class=\"remove-player-button\" ng-click=\"removeItem(players.data, player)\">-</button>\n</td>\n");
$templateCache.put("players/players-header.html","<th>#</th>\n<th>И</th>\n<th>В</th>\n<th>Ник Игрока</th>\n<th>Роль</th>\n<th>Фоллы</th>");
$templateCache.put("players/players.html","<button class=\"set-data-button\" ng-click=\"setPlayers(players.data)\">Внести данные</button>\n<table class=\"table players-table table-hover\">\n    <thead>\n        <tr>\n            <th ng-repeat=\"(j, field) in players.fields\">{{::field}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr ng-repeat=\"(i, player) in players.data\"\n            ng-include=\"\'players/player-tr.html\'\">\n        </tr>\n        <tr>\n            <tr new-player\n                add-present=\"addPresent(presents, present)\"\n                fields=\"players.fields\"\n                add-player=\"addNewPlayer(player)\"\n                start-edit=\"startEdit($event, player)\"\n                remove-item=\"removeItem(items, item)\"\n            ></tr>\n        </tr>\n    </tbody>\n</table>\n\n");
$templateCache.put("protocol/protocol.html","<protocol></protocol>");
$templateCache.put("rating/rating.html","<period-selector\n  period-type=\"RatingCtrl.periodType\"\n  period=\"RatingCtrl.period\"\n  year=\"RatingCtrl.year\"\n  ></period-selector>\n<button class=\"show-rating-button\" ng-click=\"RatingCtrl.getRating()\">Показать рейтинг</button>\n<span class=\"controls-text\">\n  Игр\n</span>\n<input\n    class=\"number-input\"\n    type=\"number\"\n    name=\"edge\"\n    placeholder=\"\"\n    ng-model=\"gameEdge\"\n    ng-init=\"gameEdge = 0\"\n>\n<span class=\"controls-text\">\n  Показать игроков, сыгравших не менее\n</span>\n\n<table class=\"table table-bordered\" id=\"ratingTable\" border=\'1\'>\n  <thead>\n    <tr>\n      <th>Фото</th>\n      <th>Ник</th>\n      <th>Сумма</th>\n      <th>Игр</th>\n      <th>Среднее</th>\n      <th>Лучшие от игроков</th>\n      <th>Лучшие от Судей</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr\n        class=\"rating-row\"\n        id=\"{{::player.nick}}\"\n        ng-repeat=\"(i, player) in rating\"\n        ng-show=\"player.gameNumber >= gameEdge\"\n    >\n      <td id=\"{{::player.avatar}}\">\n        <img class=\"playerAvatarInRating\"\n        onerror=\"this.src=\'public/MafSite/assets/img/main_logo.png\'; this.onerror=\'\'\"\n        ng-src=\"data-base/players/img/{{::player.nick.split(\' \').join(\'\')}}.jpg\"\n        alt=\"\">\n      </td>\n      <td>{{::player.nick}}</td>\n      <td>{{::player.sum}}</td>\n      <td>{{::player.gameNumber}}</td>\n      <td>{{::player.sum / player.gameNumber | number:2}}</td>\n      <td>{{::player.BP}}</td>\n      <td>{{::player.BR}}</td>\n    </tr>\n  </tbody>\n</table>\n<script src=\"../js/plain/rating.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n");
$templateCache.put("register/register.html","<button class=\"set-data-button\"\nng-click=\"registerCtrl.setRegister(register.data, date)\"\nng-disabled=\"!registerCtrl.isValid()\"\n>Внести данные</button>\n<div class=\"hint\">\n    Введите ники всех игроков!\n</div>\n<div>\n    <label>\n        Дата встречи\n        <input type=\"date\" ng-model=\"date\">\n    </label>\n    <label>\n        Бюджет встречи: {{registerCtrl.getSum()}}\n    </label>\n</div>\n\n<table class=\"table players-table table-hover\">\n    <thead>\n        <tr>\n            <th>\n                #\n            </th>\n            <th ng-repeat=\"(j, field) in register.fields\">{{::field.name}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr\n            ng-repeat=\"(i, player) in register.data\">\n            <td>\n                {{:: i+1}}\n            </td>\n            <td\n            ng-repeat=\"(k, field) in register.fields\"\n            >\n                <autocomplete\n                ng-if=\"field.name === \'nick\'\"\n                ng-model=\"player[field.name]\"\n                data=\"vm.playerNicks\"\n                ></autocomplete>\n\n                <input\n                ng-if=\"field.name !== \'nick\'\"\n                type=\"{{::field.type}}\"\n                ng-model=\"player[field.name]\"\n                >\n            </td>\n            <td>\n                <button ng-click=\"removeItem(register.data, player)\"> - </button>\n            </td>\n        </tr>\n        <tr ng-init=\"newPlayer = {}\">\n            <td>\n                {{register.data.length + 1}}\n            </td>\n            <td\n\n                ng-repeat=\"(k, field) in register.fields\"\n                >\n\n                <autocomplete\n                ng-if=\"field.name === \'nick\'\"\n                ng-model=\"newPlayer[field.name]\"\n                data=\"vm.playerNicks\"\n                ></autocomplete>\n\n                <input\n                ng-if=\"field.name !== \'nick\'\"\n                type=\"{{::field.type}}\"\n                ng-model=\"newPlayer[field.name]\">\n            </td>\n            <td>\n                <button ng-click=\"addItem(register.data, newPlayer); newPlayer = {};\">+</button>\n            </td>\n        </tr>\n    </tbody>\n\n</table>\n");
$templateCache.put("protocol/days/days.html","<div class=\"day\" ng-repeat=\"(i, day) in days track by $index\">\n    <div class=\"day-title\">\n        День {{::i}}\n        <button class=\"btn btn-primary\" ng-click=\"DaysCtrl.removeItem(day, days)\">-</button>\n    </div>\n    <div class=\"votes\" ng-repeat=\"(j, details) in day.votes\">\n        <span>\n            Кто\n            <select\n                class=\"days-input\"\n                ng-model=\"details.who\"\n                ng-options=\"player.nick for player in players track by player.nick\">\n            </select>\n        </span>\n        <span>\n            Кого\n            <select\n                class=\"days-input\"\n                ng-model=\"details.whom\"\n                ng-options=\"player.nick for player in players track by player.nick\">\n            </select>\n        </span>\n        <div>\n            <span>\n                Голосов\n        <!--             <button type=\"\" class=\"decrFall btn btn-primary\" ng-disabled=\"details.sum == 0\" ng-click=\"DaysCtrl.decrNumber(details, \'sum\')\">-</button>\n                <span>{{details.sum}}</span>\n                <button type=\"\" class=\"incrFall btn btn-primary\" ng-disabled=\"details.sum == 10\" ng-click=\"DaysCtrl.incrNumber(details, \'sum\')\">+</button> -->\n                <input class=\"votes-number-input\" type=\"number\" ng-model=\"details.sum\">\n            </span>\n            <button class=\"btn btn-primary\" ng-click=\"DaysCtrl.removeItem(details, day.votes)\">-</button>\n        </div>\n    </div>\n\n    <button class=\"btn btn-primary\" ng-click=\"DaysCtrl.addVote(day.votes)\">Добавить выставление</button>\n    <div class=\"results\">\n            <span\n                ng-repeat=\"(key, value) in day.results\"\n                class=\"{{::key}}-container\"\n            >\n                {{::key | translate}}\n                <select\n                    class=\"days-input\"\n                    ng-model=\"day.results[key]\"\n                    ng-options=\"player.nick for player in players track by player.nick\"\n                >\n                </select>\n            </span>\n    </div>\n</div>\n<button class=\"btn btn-primary\" ng-click=\"DaysCtrl.addDay()\">Следующий день</button>\n");
$templateCache.put("protocol/metadata/metadata.html","<caption>Информация об игре</caption>\n<tbody>\n    <tr>\n        <td>Стол</td>\n        <td>\n            <select tabindex=\"1\" class=\"metadata-input\" required ng-model=\"metadata.data.table\" name=\"\" id=\"\">\n                <option ng-repeat=\"table in tables\">{{table}}</option>\n            </select>\n        </td>\n    </tr>\n    <tr>\n        <td>Дата</td>\n        <td>\n            <input tabindex=\"2\" class=\"metadata-input\" required ng-model=\"metadata.data.date\" type=\"date\" name=\"\" value=\"\" placeholder=\"\">\n        </td>\n    </tr>\n    <tr>\n        <td>Ведущий</td>\n        <td>\n            <autocomplete tabindex=\"3\" class=\"metadata-input\" required ng-model=\"metadata.data.ref\" data=\"playerNicks\"></autocomplete>\n        </td>\n    </tr>\n    <tr>\n        <td>Победа</td>\n        <td>\n            <select  tabindex=\"4\" class=\"metadata-input\" required ng-model=\"metadata.data.win\" name=\"\" id=\"\">\n                <option ng-repeat=\"win in wins\">{{win}}</option>\n            </select>\n        </td>\n    </tr>\n    <tr>\n        <td>Номер игры</td>\n        <td>\n            <input  tabindex=\"5\" class=\"metadata-input\" required ng-model=\"metadata.data.gameNumber\" type=\"number\" name=\"\" value=\"\" placeholder=\"\" min=\"0\" step=\"1\">\n        </td>\n    </tr>\n\n</tbody>\n");
$templateCache.put("protocol/player/player.html","<td>{{::number + 1}}</td>\n<td>\n    <input class=\"best-checkbox\" type=\"checkbox\" name=\"best\" value=\"\" ng-model=\"player.data.BP\">\n</td>\n<td>\n    <input class=\"best-checkbox\" type=\"checkbox\" name=\"best\" value=\"\" ng-model=\"player.data.BR\">\n</td>\n<td>\n    <autocomplete tabindex=\"{{::(number+1)*10+1}}\" class=\"\" required ng-model=\"player.data.nick\" data=\"playerNicks\"></autocomplete>\n    <!-- <input required class=\"player-nick-input form-control\" type=\"text\" ng-model=\"player.data.nick\"> -->\n</td>\n<td>\n    <select tabindex=\"{{::(number+1)*10+2}}\" required class=\"player-role metadata-input\" name=\"\" id=\"\" ng-model=\"player.data.role\">\n        <option ng-repeat= \"role in roles\">{{role}}</option>\n    </select>\n</td>\n<td class=\"falls\">\n    <button type=\"\" class=\"decrFall btn btn-primary\" ng-disabled=\"player.data.falls == 0\" ng-click=\"player.decrFall()\">-</button>\n    <span>{{player.data.falls}}</span>\n    <button type=\"\" class=\"incrFall btn btn-primary\" ng-disabled=\"player.data.falls == maxFalls\" ng-click=\"player.incrFall()\">+</button>\n</td>\n\n<!--     <input type=\"checkbox\">Убит\n<input type=\"checkbox\">Проверен шерифом\n<input type=\"checkbox\">Проверен доном -->\n");
$templateCache.put("protocol/protocol/protocol.html","<form class=\"clearfix\" novalidate accept-charset=\"utf-8\" name=\"ProtocolForm\" ng-submit=\"\">\n\n  <div class=\"metadata-container\">\n    <table metadata\n      wins=\"protocol.WIN\"\n      tables=\"protocol.TABLES\"\n      class=\"table table-bordered table-hover\"\n      player-nicks=\"protocol.playerNicks\"\n    >\n    </table >\n    <div class=\"button-container\">\n      <timer></timer>\n      <button class= \"btn btn-primary\" id=\"control-btn\" ng-disabled=\"ProtocolForm.$invalid\" ng-click=\"protocol.saveGame()\">Сохранить игру</button>\n      <button class= \"btn btn-primary\" id=\"control-btn\" ng-disabled=\"!protocol.game.metadata.gameNumber || !protocol.game.metadata.date || !protocol.game.metadata.table\" ng-click=\"protocol.loadGame()\">Загрузить игру</button>\n      <button class= \"btn btn-primary\" id=\"control-btn\" ng-disabled=\"!protocol.game.metadata.gameNumber || !protocol.game.metadata.date || !protocol.game.metadata.table\" ng-click=\"protocol.deleteGame()\">Удалить игру</button>\n    </div>\n    <div class=\"player-hint\" ng-show=\"ProtocolForm.$invalid\">\n      Пожалуйста заполните все игровые ники и необходимые поля!\n    </div>\n  </div>\n\n  <div class=\"protocol-container\">\n    <table class=\"table table-bordered table-hover clearfix\">\n      <caption>Бланк</caption>\n      <thead>\n        <tr ng-include=\"\'players/players-header.html\'\"></tr>\n      </thead>\n      <tbody class=\"player-container\">\n        <tr player\n          ng-repeat=\"player in protocol.game.playerLines track by $index\"\n          number=\"$index\"\n          max-falls=\"protocol.MAX_FALLS\"\n          roles=\"protocol.ROLES\"\n          player-nicks=\"protocol.playerNicks\"\n        >\n        </tr>\n      </tbody>\n    </table>\n  </div>\n\n  <days\n  state=\"protocol.state\"\n  days=\"protocol.game.days\"\n  players=\"protocol.game.playerLines\"\n  ></days>\n</form>");
$templateCache.put("protocol/timer/timer.html","<div class=\"control-group\" id=\"timerContainer\">\n    <button class=\"btn btn-primary start\"  ng-click=\"timer.toggleState()\" id=\"startTimerBtn\">{{timer.state}}</button>\n    <button class=\"btn btn-primary\" ng-click=\"timer.reset()\" id=\"resetTimerBtn\">Сброс</button>\n    <div id=\"timerTime\">\n    {{timer.time}}\n    </div>\n</div>");}]);