// positions-data.js — массив с данными о раскидках гранат 
const positionsData = {
    mirage: {
        smoke: [
            {
                id: 1,
                smokeType: "regular",
                shortTitle: "Window Mid",
                title: "Смок в Window Mid (T-Spawn)",
                images: [
                    "../img/Mirage_Smoke/Metka/window_mid_tspawn_metka.png",
                    "../img/Mirage_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/window_mid_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                smokeType: "regular",
                shortTitle: "Start Mid",
                title: "Смок на Start Mid (T-Spawn)",
                images: [
                    "../img/Mirage_Smoke/Metka/start_mid_tspawn_metka.png",
                    "../img/Mirage_Smoke/Pos/mid_tspawn_pos2.png",
                    "../img/Mirage_Smoke/Smoke/start_mid_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 3,
                smokeType: "regular",
                shortTitle: "Connector Mid",
                title: "Смок в Connector Mid (T-Spawn)",
                images: [
                    "../img/Mirage_Smoke/Metka/connector_mid_tspawn_metka.png",
                    "../img/Mirage_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/connector_mid_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                smokeType: "regular",
                shortTitle: "Ticket A",
                title: "Смок в Ticket/CT-Spawn A (Ramp)",
                images: [
                    "../img/Mirage_Smoke/Metka/ct_aplant_ramp_metka.png",
                    "../img/Mirage_Smoke/Pos/aplant_ramp_pos.png",
                    "../img/Mirage_Smoke/Smoke/ct_aplant_ramp_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                smokeType: "regular",
                shortTitle: "Jungle A",
                title: "Смок в Jungle/Connector A (Ramp)",
                images: [
                    "../img/Mirage_Smoke/Metka/jungle_aplant_ramp_metka.png",
                    "../img/Mirage_Smoke/Pos/aplant_ramp_pos.png",
                    "../img/Mirage_Smoke/Smoke/jungle_aplant_ramp_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                smokeType: "regular",
                shortTitle: "Stairs A",
                title: "Смок на Stairs A (Ramp)",
                images: [
                    "../img/Mirage_Smoke/Metka/stairs_aplant_ramp_metka.png",
                    "../img/Mirage_Smoke/Pos/aplant_ramp_pos.png",
                    "../img/Mirage_Smoke/Smoke/stairs_aplant_ramp_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                smokeType: "regular",
                shortTitle: "Car B",
                title: "Смок на Car B (House)",
                images: [
                    "../img/Mirage_Smoke/Metka/car_bplant_house_metka.png",
                    "../img/Mirage_Smoke/Pos/bplant_house_pos.png",
                    "../img/Mirage_Smoke/Smoke/car_bplant_house_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                smokeType: "regular",
                shortTitle: "Forest B",
                title: "Смок на Forest B (House)",
                images: [
                    "../img/Mirage_Smoke/Metka/forest_bplant_house_metka.png",
                    "../img/Mirage_Smoke/Pos/bplant_house_pos.png",
                    "../img/Mirage_Smoke/Smoke/forest_bplant_house_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                smokeType: "regular",
                shortTitle: "Kitchen Main B",
                title: "Смок на Main Kitchen B (House)",
                images: [
                    "../img/Mirage_Smoke/Metka/main_bplant_house_metka.png",
                    "../img/Mirage_Smoke/Pos/bplant_house_pos.png",
                    "../img/Mirage_Smoke/Smoke/main_bplant_house_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 10,
                smokeType: "regular",
                shortTitle: "Kitchen Window B",
                title: "Смок на Window Kitchen B (House)",
                images: [
                    "../img/Mirage_Smoke/Metka/window_bplant_house_metka.png",
                    "../img/Mirage_Smoke/Pos/bplant_house_pos.png",
                    "../img/Mirage_Smoke/Smoke/window_bplant_house_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 11,
                smokeType: "regular",
                shortTitle: "Short B",
                title: "Смок на Short B (House)",
                images: [
                    "../img/Mirage_Smoke/Metka/short_bplant_house_metka.png",
                    "../img/Mirage_Smoke/Pos/bplant_house_pos.png",
                    "../img/Mirage_Smoke/Smoke/short_bplant_house_smoke.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 12,
                smokeType: "instant",
                shortTitle: "Window (Поз. 1)",
                title: "Инста Смок в Window Mid (Позиция 1)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_window_tspawn_metka1.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_window_tspawn_smoke1.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 13,
                smokeType: "instant",
                shortTitle: "Start (Поз. 1)",
                title: "Инста Смок на Start Mid (Позиция 1)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_start_tspawn_metka1.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_start_tspawn_smoke1.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 14,
                smokeType: "instant",
                shortTitle: "Window (Поз. 2)",
                title: "Инста Смок в Window Mid (Позиция 2)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_window_tspawn_metka2.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_window_tspawn_smoke2.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 15,
                smokeType: "instant",
                shortTitle: "Start (Поз. 2)",
                title: "Инста Смок на Start Mid (Позиция 2)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_start_tspawn_metka2.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_start_tspawn_smoke2.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 16,
                smokeType: "instant",
                shortTitle: "Window (Поз. 3)",
                title: "Инста Смок в Window Mid (Позиция 3)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_window_tspawn_metka3.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_window_tspawn_smoke3.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 17,
                smokeType: "instant",
                shortTitle: "Start (Поз. 3)",
                title: "Инста Смок на Start Mid (Позиция 3)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_start_tspawn_metka3.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_start_tspawn_smoke3.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 18,
                smokeType: "instant",
                shortTitle: "Window (Поз. 4)",
                title: "Инста Смок в Window Mid (Позиция 4)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_window_tspawn_metka4.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_window_tspawn_smoke4.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 19,
                smokeType: "instant",
                shortTitle: "Start (Поз. 4)",
                title: "Инста Смок на Start Mid (Позиция 4)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_start_tspawn_metka4.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_start_tspawn_smoke4.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 20,
                smokeType: "instant",
                shortTitle: "Window (Поз. 5)",
                title: "Инста Смок в Window Mid (Позиция 5)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_window_tspawn_metka5.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_window_tspawn_smoke5.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 21,
                smokeType: "instant",
                shortTitle: "Start (Поз. 5)",
                title: "Инста Смок на Start Mid (Позиция 5)",
                images: [
                    "../img/Mirage_Smoke/Metka/insta_start_tspawn_metka5.png",
                    "../img/Mirage_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Mirage_Smoke/Smoke/insta_start_tspawn_smoke5.png"
                ],
                tips: "Левая кнопка мыши."
            }
        ],
        flash: [
            {
                id: 1,
                shortTitle: "Mid (TV)",
                title: "Флешка на выход Mid за T-сторону (TV-room)",
                images: [
                    "../img/Mirage_Flash/mid_tv_flash.png",
                    "../img/Mirage_Flash/tv_mid_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (до конца платформы), Прыжок."
            },
            {
                id: 2,
                shortTitle: "A-Plant (Ramp)",
                title: "Флешка на выход A-Plant за T-сторону (Ramp)",
                images: [
                    "../img/Mirage_Flash/aplant_ramp_flash.png",
                    "../img/Mirage_Flash/ramp_aplant_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                shortTitle: "B-Plant (House)",
                title: "Флешка на выход B-Plant за T-сторону (House)",
                images: [
                    "../img/Mirage_Flash/bplant_house_flash.png",
                    "../img/Mirage_Flash/house_bplant_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (2 шага), Прыжок."
            },
            {
                id: 4,
                shortTitle: "Mid (Ticket)",
                title: "Флешка на Mid далеко за СT-сторону (Ticket)",
                images: [
                    "../img/Mirage_Flash/mid_ticket_flash.png",
                    "../img/Mirage_Flash/ticket_mid_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (до угла левой стены), Прыжок."
            },
            {
                id: 5,
                shortTitle: "Mid (FireBox)",
                title: "Флешка на Mid близко за СT-сторону (FireBox)",
                images: [
                    "../img/Mirage_Flash/mid_firebox_flash.png",
                    "../img/Mirage_Flash/firebox_mid_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (2 шага), Прыжок."
            },
            {
                id: 6,
                shortTitle: "Ramp (Jungle)",
                title: "Флешка в Ramp за CT-сторону (Jungle)",
                images: [
                    "../img/Mirage_Flash/ramp_jungle_flash.png",
                    "../img/Mirage_Flash/jungle_ramp_pos.png"
                ],
                tips: "Левая кнопка мыши, Ходьба на shift (до конца квадрата), Прыжок."
            },
            {
                id: 7,
                shortTitle: "Apartments (Car)",
                title: "Флешка на выход Apartments за CT-сторону (Car/Forest)",
                images: [
                    "../img/Mirage_Flash/apartments_car_flash.png",
                    "../img/Mirage_Flash/car_apartments_pos.png"
                ],
                tips: "Левая кнопка мыши."
            }
        ],
        molotov: [
            {
                id: 1,
                shortTitle: "Stairs A",
                title: "Молик на Stairs (Ramp)",
                images: [
                    "../img/Mirage_Molotov/Metka/stairs_ramp_metka.png",
                    "../img/Mirage_Molotov/Pos/stairs_ramp_pos.png",
                    "../img/Mirage_Molotov/Molotov/stairs_ramp_molotov.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 2,
                shortTitle: "Under Palace A (Ramp)",
                title: "Молик в Under Palace (Ramp)",
                images: [
                    "../img/Mirage_Molotov/Metka/underpalace_ramp_metka.png",
                    "../img/Mirage_Molotov/Pos/underpalace_ramp_pos.png",
                    "../img/Mirage_Molotov/Molotov/underpalace_ramp_molotov.png"
                ],
                tips: "Левая кнопка мыши, Разбег (2 шага)."
            },
            {
                id: 3,
                shortTitle: "FireBox A",
                title: "Молик за FireBox (Tetris)",
                images: [
                    "../img/Mirage_Molotov/Metka/firebox_tetris_metka.png",
                    "../img/Mirage_Molotov/Pos/firebox_tetris_pos.png",
                    "../img/Mirage_Molotov/Molotov/firebox_tetris_molotov.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 4,
                shortTitle: "Under Palace A (Palace)",
                title: "Молик в Under Palace (Palace)",
                images: [
                    "../img/Mirage_Molotov/Metka/underpalace_palace_metka.png",
                    "../img/Mirage_Molotov/Pos/underpalace_palace_pos.png",
                    "../img/Mirage_Molotov/Molotov/underpalace_palace_molotov.png"
                ],
                tips: "Левая кнопка мыши, Разбег (до конца правой колонны)."
            },
            {
                id: 5,
                shortTitle: "Balcony A",
                title: "Молик на Balcony (Palace)",
                images: [
                    "../img/Mirage_Molotov/Metka/balcony_palace_metka.png",
                    "../img/Mirage_Molotov/Pos/balcony_palace_pos.png",
                    "../img/Mirage_Molotov/Molotov/balcony_palace_molotov.png"
                ],
                tips: "Левая кнопка мыши, Ходьба на shift (с Позиции 1 до Позиции 2)."
            },
            {
                id: 6,
                shortTitle: "Car B",
                title: "Молик на Car (Apartments)",
                images: [
                    "../img/Mirage_Molotov/Metka/car_apartments_metka.png",
                    "../img/Mirage_Molotov/Pos/car_apartments_pos.png",
                    "../img/Mirage_Molotov/Molotov/car_apartments_molotov.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 7,
                shortTitle: "Forest B",
                title: "Молик в Forest (Apartments)",
                images: [
                    "../img/Mirage_Molotov/Metka/forest_apartments_metka.png",
                    "../img/Mirage_Molotov/Pos/forest_apartments_pos.png",
                    "../img/Mirage_Molotov/Molotov/forest_apartments_molotov.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 8,
                shortTitle: "Edward B",
                title: "Молик на Edward (Apartments)",
                images: [
                    "../img/Mirage_Molotov/Metka/edward_apartments_metka.png",
                    "../img/Mirage_Molotov/Pos/edward_apartments_pos.png",
                    "../img/Mirage_Molotov/Molotov/edward_apartments_molotov.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд)."
            }
        ],
        he:[

        ]
    },
    dust2: {
        smoke: [
            {
                id: 1,
                smokeType: "regular",
                shortTitle: "X-Box Mid",
                title: "Смок на X-Box Mid (T-Spawn)",
                images: [
                    "../img/Dust_Smoke/Metka/mid_tspawn_metka.png",
                    "../img/Dust_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/mid_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                smokeType: "regular",
                shortTitle: "Doors Mid",
                title: "Смок в Doors Mid (T-Spawn)",
                images: [
                    "../img/Dust_Smoke/Metka/mid_tspawn_metka2.png",
                    "../img/Dust_Smoke/Pos/mid_tspawn_pos2.png",
                    "../img/Dust_Smoke/Smoke/mid_tspawn_smoke2.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                smokeType: "regular",
                shortTitle: "Long A",
                title: "Смок на Long A (T-Spawn)",
                images: [
                    "../img/Dust_Smoke/Metka/long_tspawn_metka.png",
                    "../img/Dust_Smoke/Pos/long_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/long_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                smokeType: "regular",
                shortTitle: "CT-Spawn A",
                title: "Смок в CT-Spawn A (Long)",
                images: [
                    "../img/Dust_Smoke/Metka/aplant_long_metka.png",
                    "../img/Dust_Smoke/Pos/aplant_long_pos.png",
                    "../img/Dust_Smoke/Smoke/aplant_long_smoke.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 5,
                smokeType: "regular",
                shortTitle: "CT-Spawn Mid",
                title: "Смок в CT-Spawn Mid (Mid)",
                images: [
                    "../img/Dust_Smoke/Metka/ct_mid_metka.png",
                    "../img/Dust_Smoke/Pos/ct_mid_pos.png",
                    "../img/Dust_Smoke/Smoke/ct_mid_smoke.png"
                ],
                tips: "Присесть, Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                smokeType: "regular",
                shortTitle: "Doors B",
                title: "Смок в Doors B (Outside Tunnels)",
                images: [
                    "../img/Dust_Smoke/Metka/door_tunnels_metka.png",
                    "../img/Dust_Smoke/Pos/bplant_tunnels_pos.png",
                    "../img/Dust_Smoke/Smoke/door_tunnels_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                smokeType: "regular",
                shortTitle: "Window B",
                title: "Смок в Window B (Outside Tunnels)",
                images: [
                    "../img/Dust_Smoke/Metka/window_tunnels_metka.png",
                    "../img/Dust_Smoke/Pos/bplant_tunnels_pos.png",
                    "../img/Dust_Smoke/Smoke/window_tunnels_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                smokeType: "regular",
                shortTitle: "B-Plant",
                title: "Смок на выход B-Plant (Outside Tunnels)",
                images: [
                    "../img/Dust_Smoke/Metka/bplant_tunnels_metka.png",
                    "../img/Dust_Smoke/Pos/bplant_tunnels_pos.png",
                    "../img/Dust_Smoke/Smoke/bplant_tunnels_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                smokeType: "instant",
                shortTitle: "X-Box (Поз. 1)",
                title: "Инста Смок на X-Box Mid (Позиция 1)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_xbox_tspawn_metka1.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_xbox_tspawn_smoke1.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 10,
                smokeType: "instant",
                shortTitle: "Doors (Поз. 2)",
                title: "Инста Смок в Doors Mid (Позиция 2)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_doors_tspawn_metka2.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_doors_tspawn_smoke2.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 11,
                smokeType: "instant",
                shortTitle: "X-Box (Поз. 2)",
                title: "Инста Смок на X-Box Mid (Позиция 2)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_xbox_tspawn_metka2.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_xbox_tspawn_smoke2.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 12,
                smokeType: "instant",
                shortTitle: "Long (Поз. 2)",
                title: "Инста Смок на Long A (Позиция 2)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_long_tspawn_metka2.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_long_tspawn_smoke2.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 13,
                smokeType: "instant",
                shortTitle: "Doors (Поз. 3)",
                title: "Инста Смок в Doors Mid (Позиция 3)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_doors_tspawn_metka3.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_doors_tspawn_smoke3.png"
                ],
                tips: "Левая кнопка мыши, Прыжок"
            },
            {
                id: 14,
                smokeType: "instant",
                shortTitle: "X-Box (Поз. 3)",
                title: "Инста Смок на X-Box Mid (Позиция 3)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_xbox_tspawn_metka3.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_xbox_tspawn_smoke3.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 15,
                smokeType: "instant",
                shortTitle: "Long (Поз. 3)",
                title: "Инста Смок на Long A (Позиция 3)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_long_tspawn_metka3.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_long_tspawn_smoke3.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 16,
                smokeType: "instant",
                shortTitle: "Doors (Поз. 4)",
                title: "Инста Смок в Doors Mid (Позиция 4)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_doors_tspawn_metka4.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_doors_tspawn_smoke4.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 17,
                smokeType: "instant",
                shortTitle: "X-Box (Поз. 4)",
                title: "Инста Смок на X-Box Mid (Позиция 4)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_xbox_tspawn_metka4.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_xbox_tspawn_smoke4.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 18,
                smokeType: "instant",
                shortTitle: "Long (Поз. 4)",
                title: "Инста Смок на Long A (Позиция 4)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_long_tspawn_metka4.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_long_tspawn_smoke4.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 19,
                smokeType: "instant",
                shortTitle: "Long (Поз. 5)",
                title: "Инста Смок на Long A (Позиция 5)",
                images: [
                    "../img/Dust_Smoke/Metka/insta_long_tspawn_metka5.png",
                    "../img/Dust_Smoke/Pos/insta_tspawn_pos.png",
                    "../img/Dust_Smoke/Smoke/insta_long_tspawn_smoke5.png"
                ],
                tips: "Левая кнопка мыши."
            },
        ],
        flash: [
            {
                id: 1,
                shortTitle: "Long (Box)",
                title: "Флешка на выход Long за T-сторону (Outside Box)",
                images: [
                    "../img/Dust_Flash/long_box_flash.png",
                    "../img/Dust_Flash/long_box_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                shortTitle: "B-Plant (Upper)",
                title: "Флешка на выход B-Plant за T-сторону (Upper)",
                images: [
                    "../img/Dust_Flash/bplant_tunnels_flash.png",
                    "../img/Dust_Flash/bplant_tunnels_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                shortTitle: "B-Plant (Box)",
                title: "Флешка под выход на B-Plant за CT-сторону (B-plant)",
                images: [
                    "../img/Dust_Flash/bplant_box_flash.png",
                    "../img/Dust_Flash/bplant_box_pos.png"
                ],
                tips: "Правая кнопка мыши."
            },
            {
                id: 4,
                shortTitle: "B-Plant (Car)",
                title: "Флешка под выход на B-plant за CT-сторону (Car B)",
                images: [
                    "../img/Dust_Flash/bplant_car_flash.png",
                    "../img/Dust_Flash/bplant_car_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                shortTitle: "B-Plant (Doors)",
                title: "Флешка на выход на B-plant в Doors за CT-сторону (Doors)",
                images: [
                    "../img/Dust_Flash/bplant_ct_flash.png",
                    "../img/Dust_Flash/bplant_ct_pos.png"
                ],
                tips: "Правая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                shortTitle: "Mid (CT-Spawn)",
                title: "Флешка на Mid за CT-сторону (CT-Spawn)",
                images: [
                    "../img/Dust_Flash/mid_ct_flash.png",
                    "../img/Dust_Flash/mid_ct_pos.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 7,
                shortTitle: "Box (Long)",
                title: "Флешка под выход из Box Long за CT-сторону (Long)",
                images: [
                    "../img/Dust_Flash/long_ct_flash.png",
                    "../img/Dust_Flash/long_ct_pos.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 8,
                shortTitle: "Box (Long)",
                title: "Флешка под выход из Box Long за CT-сторону (Long)",
                images: [
                    "../img/Dust_Flash/long_ct_flash2.png",
                    "../img/Dust_Flash/long_ct_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                shortTitle: "Long (Car)",
                title: "Флешка на Long за CT-сторону (Car A)",
                images: [
                    "../img/Dust_Flash/long_car_flash.png",
                    "../img/Dust_Flash/long_car_pos.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 10,
                shortTitle: "A-Plant (Ramp)",
                title: "Флешка на A-Plant за CT-сторону (Ramp)",
                images: [
                    "../img/Dust_Flash/aplant_ramp_flash.png",
                    "../img/Dust_Flash/aplant_ramp_pos.png"
                ],
                tips: "Левая кнопка мыши."
            }
        ],
        molotov: [
            {
                id: 1,
                shortTitle: "Car A",
                title: "Молик на Car A (Long)",
                images: [
                    "../img/Dust_Molotov/Metka/car_long_metka.png",
                    "../img/Dust_Molotov/Pos/car_long_pos.png",
                    "../img/Dust_Molotov/Molotov/car_long_molotov.png"
                ],
                tips: "Левая кнопка мыши, Прыжок"
            },
            {
                id: 2,
                shortTitle: "Short A",
                title: "Молик на Short (Catwalk)",
                images: [
                    "../img/Dust_Molotov/Metka/short_catwalk_metka.png",
                    "../img/Dust_Molotov/Pos/short_catwalk_pos.png",
                    "../img/Dust_Molotov/Molotov/short_catwalk_molotov.png"
                ],
                tips: "Левая кнопка мыши, Разбег (до козырька на прицеле), Прыжок"
            },
            {
                id: 3,
                shortTitle: "Goose A",
                title: "Молик на Goose (Short)",
                images: [
                    "../img/Dust_Molotov/Metka/goose_short_metka.png",
                    "../img/Dust_Molotov/Pos/goose_short_pos.png",
                    "../img/Dust_Molotov/Molotov/goose_short_molotov.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 4,
                shortTitle: "A-Plant",
                title: "Молик на A-Plant (CT-Spawn)",
                images: [
                    "../img/Dust_Molotov/Metka/aplant_ct_metka.png",
                    "../img/Dust_Molotov/Pos/aplant_ct_pos.png",
                    "../img/Dust_Molotov/Molotov/aplant_ct_molotov.png"
                ],
                tips: "Правая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                shortTitle: "B-Plant",
                title: "Молик на B-Plant (Window)",
                images: [
                    "../img/Dust_Molotov/Metka/bplant_window_metka.png",
                    "../img/Dust_Molotov/Pos/bplant_window_pos.png",
                    "../img/Dust_Molotov/Molotov/bplant_window_molotov.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                shortTitle: "Car B",
                title: "Молик за Car (Doors B)",
                images: [
                    "../img/Dust_Molotov/Metka/car_doors_metka.png",
                    "../img/Dust_Molotov/Pos/car_doors_pos.png",
                    "../img/Dust_Molotov/Molotov/car_doors_molotov.png"
                ],
                tips: "Левая кнопка мыши, Разбег (1.5 шага), Прыжок."
            },
            {
                id: 7,
                shortTitle: "Дальний B",
                title: "Молик за Дальний (Doors B)",
                images: [
                    "../img/Dust_Molotov/Metka/dal_doors_metka.png",
                    "../img/Dust_Molotov/Pos/dal_doors_pos.png",
                    "../img/Dust_Molotov/Molotov/dal_doors_molotov.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            }
        ],
        he:[
            
        ]
    },
    anubis: {
        smoke: [
            {
                id: 1,
                smokeType: "regular",
                shortTitle: "Mid",
                title: "Смок в Mid (T-Spawn)",
                images: [
                    "../img/Anubis_Smoke/Metka/mid_tspawn_metka.png",
                    "../img/Anubis_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Anubis_Smoke/Smoke/mid_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                smokeType: "regular",
                shortTitle: "Doors Mid",
                title: "Смок в Doors Mid (T-Spawn)",
                images: [
                    "../img/Anubis_Smoke/Metka/door_tspawn_metka.png",
                    "../img/Anubis_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Anubis_Smoke/Smoke/door_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Шаг (вперёд), Прыжок."
            },
            {
                id: 3,
                smokeType: "regular",
                shortTitle: "Connector Water",
                title: "Смок в Connector Water (T-Spawn)",
                images: [
                    "../img/Anubis_Smoke/Metka/connector_tspawn_metka.png",
                    "../img/Anubis_Smoke/Pos/connector_tspawn_pos.png",
                    "../img/Anubis_Smoke/Smoke/connector_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                smokeType: "regular",
                shortTitle: "Heaven A",
                title: "Смок на Heaven A (Upper/Boat)",
                images: [
                    "../img/Anubis_Smoke/Metka/9_upper_metka.png",
                    "../img/Anubis_Smoke/Pos/aplant_upper_pos.png",
                    "../img/Anubis_Smoke/Smoke/9_upper_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                smokeType: "regular",
                shortTitle: "8 A",
                title: "Смок на 8 A (Upper/Boat)",
                images: [
                    "../img/Anubis_Smoke/Metka/8_upper_metka.png",
                    "../img/Anubis_Smoke/Pos/aplant_upper_pos.png",
                    "../img/Anubis_Smoke/Smoke/8_upper_smoke.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 6,
                smokeType: "regular",
                shortTitle: "Camera A",
                title: "Смок в Camera A (Upper/Boat)",
                images: [
                    "../img/Anubis_Smoke/Metka/camera_upper_metka.png",
                    "../img/Anubis_Smoke/Pos/aplant_upper_pos.png",
                    "../img/Anubis_Smoke/Smoke/camera_upper_smoke.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 7,
                smokeType: "regular",
                shortTitle: "CT-Spawn B",
                title: "Смок в CT-Spawn B (Long)",
                images: [
                    "../img/Anubis_Smoke/Metka/ct_long_metka.png",
                    "../img/Anubis_Smoke/Pos/bplant_long_pos.png",
                    "../img/Anubis_Smoke/Smoke/ct_long_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                smokeType: "regular",
                shortTitle: "Ninja B",
                title: "Смок в Ninja B (Long)",
                images: [
                    "../img/Anubis_Smoke/Metka/ninja_long_metka.png",
                    "../img/Anubis_Smoke/Pos/bplant_long_pos.png",
                    "../img/Anubis_Smoke/Smoke/ninja_long_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                smokeType: "regular",
                shortTitle: "Connector B",
                title: "Смок в Connector B (Long)",
                images: [
                    "../img/Anubis_Smoke/Metka/connector_long_metka.png",
                    "../img/Anubis_Smoke/Pos/bplant_long_pos.png",
                    "../img/Anubis_Smoke/Smoke/connector_long_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            }
        ],
        flash: [

        ],
        molotov: [
            
        ],
        he:[
            
        ]
    },
    ancient: {
        smoke: [
            {
                id: 1,
                smokeType: "regular",
                shortTitle: "Red Room Mid",
                title: "Смок в Red Room Mid (T-Spawn)",
                images: [
                    "../img/Ancient_Smoke/Metka/redroom_tspawn_metka.png",
                    "../img/Ancient_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Ancient_Smoke/Smoke/redroom_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                smokeType: "regular",
                shortTitle: "Heaven Mid",
                title: "Смок на Heaven Mid (T-Spawn)",
                images: [
                    "../img/Ancient_Smoke/Metka/9_tspawn_metka.png",
                    "../img/Ancient_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Ancient_Smoke/Smoke/9_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                smokeType: "regular",
                shortTitle: "Donut Mid",
                title: "Смок в Donut Mid (T-Spawn)",
                images: [
                    "../img/Ancient_Smoke/Metka/donut_tspawn_metka.png",
                    "../img/Ancient_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Ancient_Smoke/Smoke/donut_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                smokeType: "regular",
                shortTitle: "Светлая B",
                title: "Смок в Светлую B (Ruins)",
                images: [
                    "../img/Ancient_Smoke/Metka/svet_ruins_metka.png",
                    "../img/Ancient_Smoke/Pos/bplant_ruins_pos.png",
                    "../img/Ancient_Smoke/Smoke/svet_ruins_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                smokeType: "regular",
                shortTitle: "Тёмная B",
                title: "Смок в Тёмную B (Ruins)",
                images: [
                    "../img/Ancient_Smoke/Metka/dark_ruins_metka.png",
                    "../img/Ancient_Smoke/Pos/bplant_ruins_pos.png",
                    "../img/Ancient_Smoke/Smoke/dark_ruins_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                smokeType: "regular",
                shortTitle: "Cave B",
                title: "Смок в Cave B (Ruins)",
                images: [
                    "../img/Ancient_Smoke/Metka/cave_ruins_metka.png",
                    "../img/Ancient_Smoke/Pos/bplant_ruins_pos.png",
                    "../img/Ancient_Smoke/Smoke/cave_ruins_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                smokeType: "regular",
                shortTitle: "Donut A",
                title: "Смок в Donut A (Jungle)",
                images: [
                    "../img/Ancient_Smoke/Metka/donut_jungle_metka.png",
                    "../img/Ancient_Smoke/Pos/aplant_jungle_pos.png",
                    "../img/Ancient_Smoke/Smoke/donut_jungle_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                smokeType: "regular",
                shortTitle: "CT-Spawn A",
                title: "Смок в CT-Spawn A (Jungle)",
                images: [
                    "../img/Ancient_Smoke/Metka/ct_jungle_metka.png",
                    "../img/Ancient_Smoke/Pos/aplant_jungle_pos.png",
                    "../img/Ancient_Smoke/Smoke/ct_jungle_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                smokeType: "regular",
                shortTitle: "Temple A",
                title: "Смок в Temple A (Jungle)",
                images: [
                    "../img/Ancient_Smoke/Metka/temple_jungle_metka.png",
                    "../img/Ancient_Smoke/Pos/aplant_jungle_pos.png",
                    "../img/Ancient_Smoke/Smoke/temple_jungle_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            }
        ],
        flash: [

        ],
        molotov: [
            
        ],
        he:[
            
        ]
    },
    overpass: {
        smoke: [
        ],
        flash: [
        ],
        molotov: [
        ],
        he:[
        ]
    },
    nuke: {
        smoke: [
        ],
        flash: [
        ],
        molotov: [
        ],
        he:[ 
        ]
    },
    inferno: {
        smoke: [
        ],
        flash: [
        ],
        molotov: [
        ],
        he:[
        ]
    },
    train: {
        smoke: [
        ],
        flash: [
        ],
        molotov: [
        ],
        he:[
        ]
    },
    vertigo: {
        smoke: [
        ],
        flash: [
        ],
        molotov: [
        ],
        he:[
        ]
    },
    cache: {
        smoke: [
            {
                id: 1,
                smokeType: "regular",
                shortTitle: "Connector Mid",
                title: "Смок в Connector Mid (T-Spawn)",
                images: [
                    "../img/Cache_Smoke/Metka/connector_tspawn_metka.png",
                    "../img/Cache_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Cache_Smoke/Smoke/connector_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                smokeType: "regular",
                shortTitle: "Catwalk Mid",
                title: "Смок на Catwalk Mid (T-Spawn)",
                images: [
                    "../img/Cache_Smoke/Metka/catwalk_tspawn_metka.png",
                    "../img/Cache_Smoke/Pos/mid_tspawn_pos.png",
                    "../img/Cache_Smoke/Smoke/catwalk_tspawn_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                smokeType: "regular",
                shortTitle: "CT-Spawn A",
                title: "Смок в CT-Spawn A (Long)",
                images: [
                    "../img/Cache_Smoke/Metka/ct_long_metka.png",
                    "../img/Cache_Smoke/Pos/aplant_long_pos.png",
                    "../img/Cache_Smoke/Smoke/ct_long_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                smokeType: "regular",
                shortTitle: "Catwalk A",
                title: "Смок на Catwalk A (Long)",
                images: [
                    "../img/Cache_Smoke/Metka/catwalk_long_metka.png",
                    "../img/Cache_Smoke/Pos/aplant_long_pos.png",
                    "../img/Cache_Smoke/Smoke/catwalk_long_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                smokeType: "regular",
                shortTitle: "A-Plant",
                title: "Смок за контейнер на A-Plant (Garage)",
                images: [
                    "../img/Cache_Smoke/Metka/aplant_garage_metka.png",
                    "../img/Cache_Smoke/Pos/aplant_garage_pos.png",
                    "../img/Cache_Smoke/Smoke/aplant_garage_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                smokeType: "regular",
                shortTitle: "Погрузчик A",
                title: "Смок на Погрузчик A (Garage)",
                images: [
                    "../img/Cache_Smoke/Metka/pogruz_garage_metka.png",
                    "../img/Cache_Smoke/Pos/aplant_garage_pos.png",
                    "../img/Cache_Smoke/Smoke/pogruz_garage_smoke.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                smokeType: "regular",
                shortTitle: "Hell B",
                title: "Смок в Hell B (Toxic)",
                images: [
                    "../img/Cache_Smoke/Metka/hell_toxic_metka.png",
                    "../img/Cache_Smoke/Pos/bplant_toxic_pos.png",
                    "../img/Cache_Smoke/Smoke/hell_toxic_smoke.png"
                ],
                tips: "Левая + Правая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                smokeType: "regular",
                shortTitle: "Heaven B",
                title: "Смок на Heaven B (Toxic)",
                images: [
                    "../img/Cache_Smoke/Metka/heaven_toxic_metka.png",
                    "../img/Cache_Smoke/Pos/bplant_toxic_pos.png",
                    "../img/Cache_Smoke/Smoke/heaven_toxic_smoke.png"
                ],
                tips: "Левая кнопка мыши."
            }
        ],
        flash: [
        ],
        molotov: [
        ],
        he:[
        ]
    }
};
