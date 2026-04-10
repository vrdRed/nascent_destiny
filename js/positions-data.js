// positions-data.js — массив с данными о раскидках гранат 
const positionsData = {
    mirage: {
        smoke: [
            {
                id: 1,
                title: "Смок в Window Mid (T-Spawn)",
                images: [
                    "../img/Mirage_Smoke/window_mid_tspawn_smoke.png",
                    "../img/Mirage_Smoke/mid_tspawn_pos.png",
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                title: "Смок на Start Mid (T-Spawn)",
                images: [
                    "../img/Mirage_Smoke/start_mid_tspawn_smoke.png",
                    "../img/Mirage_Smoke/mid_tspawn_pos2.png"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 3,
                title: "Смок в Connector (T-Spawn)",
                images: [
                    "../img/Mirage_Smoke/connector_mid_tspawn_smoke.png",
                    "../img/Mirage_Smoke/mid_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                title: "Смок в Ticket/CT (Ramp)",
                images: [
                    "../img/Mirage_Smoke/ct_aplant_ramp_smoke.png",
                    "../img/Mirage_Smoke/aplant_ramp_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                title: "Смок в Jungle/Connector (Ramp)",
                images: [
                    "../img/Mirage_Smoke/jungle_aplant_ramp_smoke.png",
                    "../img/Mirage_Smoke/aplant_ramp_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                title: "Смок на Stairs (Ramp)",
                images: [
                    "../img/Mirage_Smoke/stairs_aplant_ramp_smoke.png",
                    "../img/Mirage_Smoke/aplant_ramp_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                title: "Смок на Car (House)",
                images: [
                    "../img/Mirage_Smoke/car_bplant_house_smoke.png",
                    "../img/Mirage_Smoke/bplant_house_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                title: "Смок на Forest (House)",
                images: [
                    "../img/Mirage_Smoke/forest_bplant_house_smoke.png",
                    "../img/Mirage_Smoke/bplant_house_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                title: "Смок на Main Kitchen (House)",
                images: [
                    "../img/Mirage_Smoke/main_bplant_house_smoke.png",
                    "../img/Mirage_Smoke/bplant_house_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 10,
                title: "Смок на Window Kitchen (House)",
                images: [
                    "../img/Mirage_Smoke/window_bplant_house_smoke.png",
                    "../img/Mirage_Smoke/bplant_house_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 11,
                title: "Смок на Short (House)",
                images: [
                    "../img/Mirage_Smoke/short_bplant_house_smoke.png",
                    "../img/Mirage_Smoke/bplant_house_pos.png"
                ],
                tips: "Левая кнопка мыши."
            },
        ],
        flash: [
            {
                id: 1,
                title: "Флешка на выход Mid за T-сторону (TV-room)",
                images: [
                    "../img/Mirage_Flash/mid_tv_flash.png",
                    "../img/Mirage_Flash/tv_mid_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (до конца платформы), Прыжок."
            },
            {
                id: 2,
                title: "Флешка на выход A-plant за T-сторону (Ramp)",
                images: [
                    "../img/Mirage_Flash/aplant_ramp_flash.png",
                    "../img/Mirage_Flash/ramp_aplant_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                title: "Флешка на выход B-plant за T-сторону (House)",
                images: [
                    "../img/Mirage_Flash/bplant_house_flash.png",
                    "../img/Mirage_Flash/house_bplant_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (2 шага), Прыжок."
            },
            {
                id: 4,
                title: "Флешка на Mid далеко за СT-сторону (Ticket)",
                images: [
                    "../img/Mirage_Flash/mid_ticket_flash.png",
                    "../img/Mirage_Flash/ticket_mid_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (до угла левой стены), Прыжок."
            },
            {
                id: 5,
                title: "Флешка на Mid близко за СT-сторону (FireBox)",
                images: [
                    "../img/Mirage_Flash/mid_firebox_flash.png",
                    "../img/Mirage_Flash/firebox_mid_pos.png"
                ],
                tips: "Левая кнопка мыши, Разбег (2 шага), Прыжок."
            },
            {
                id: 6,
                title: "Флешка в Ramp за CT-сторону (Jungle)",
                images: [
                    "../img/Mirage_Flash/ramp_jungle_flash.png",
                    "../img/Mirage_Flash/jungle_ramp_pos.png"
                ],
                tips: "Левая кнопка мыши, Ходьба на shift (до конца квадрата), Прыжок."
            },
            {
                id: 7,
                title: "Флешка на выход Apartments за CT-сторону (Car/Forest)",
                images: [
                    "../img/Mirage_Flash/apartments_car_flash.png",
                    "../img/Mirage_Flash/car_apartments_pos.png"
                ],
                tips: "Левая кнопка мыши."
            }
        ]
    },
    dust2: {
        smoke: [
            /*
            {
                id: 1,
                title: "Смок на X-Box Mid (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/mid_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                title: "Смок в Doors Mid (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/mid_tspawn_pos2.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                title: "Смок на Long (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/long_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                title: "Смок в CT A (Long)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/aplant_long_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                title: "Смок в CT Mid (Mid)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/ct_mid_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                title: "Смок в Doors B (Outside Tunnels)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/bplant_tunnels_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                title: "Смок в Window B (Outside Tunnels)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/bplant_tunnels_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                title: "Смок на выход B-plant (Outside Tunnels)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Smoke/bplant_tunnels_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            }
            */
        ],
        flash: [
            /*
            {
                id: 1,
                title: "Флешка на выход Long за T-сторону (Outside Box)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Flash/long_box_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                title: "Флешка на выход B-plant за T-сторону (Upper)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Flash/bplant_tunnels_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                title: "Флешка под выход на B-plant за CT-сторону (B-plant)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Flash/bplant_box_pos.png"
                ],
                tips: "Правая кнопка мыши."
            },
            {
                id: 4,
                title: "Флешка под выход на B-plant за CT-сторону (Car B)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Dust_Flash/bplant_car_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                title: "Флешка на выход на B-plant в Doors за CT-сторону (Doors)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/prosto_tak.jpg"
                ],
                tips: "Правая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                title: "Флешка под выход из Box Long за CT-сторону (Long)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/prosto_tak.jpg"
                ],
                tips: "Левая кнопка мыши."
            },
            {
                id: 7,
                title: "Флешка под выход из Box Long за CT-сторону (Long)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/prosto_tak.jpg"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                title: "Флешка на Long за CT-сторону (Car A)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/prosto_tak.jpg"
                ],
                tips: "Левая кнопка мыши ."
            },
            {
                id: 9,
                title: "Флешка на A-plant за CT-сторону (Ramp)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/prosto_tak.jpg"
                ],
                tips: "Левая кнопка мыши."
            }
            */
        ]
    },
    anubis: {
        smoke: [
            /*
            {
                id: 1,
                title: "Смок в Mid (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/mid_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                title: "Смок в Doors Mid (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/mid_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                title: "Смок в Connector Water (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/connector_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                title: "Смок на 9 A (Upper/Boat)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/aplant_upper_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                title: "Смок на 8 A (Upper/Boat)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/aplant_upper_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                title: "Смок в Camera A (Upper/Boat)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/aplant_upper_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                title: "Смок в CT B (Long)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/bplant_long_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                title: "Смок в Ninja B (Long)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/bplant_long_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                title: "Смок в Connector B (Long)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Anubis_Smoke/bplant_long_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            }
            */
        ],
        flash: [

        ]
    },
    ancient: {
        smoke: [
            /*
            {
                id: 1,
                title: "Смок в Red Room Mid (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/mid_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 2,
                title: "Смок на 9 Mid (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/mid_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 3,
                title: "Смок в Donut Mid (T-Spawn)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/mid_tspawn_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 4,
                title: "Смок в Светлую B (Ruins)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/bplant_ruins_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 5,
                title: "Смок в Тёмную B (Ruins)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/bplant_ruins_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 6,
                title: "Смок в Cave B (Ruins)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/bplant_ruins_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 7,
                title: "Смок в Donut A (Jungle)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/aplant_jungle_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 8,
                title: "Смок в CT A (Jungle)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/aplant_jungle_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            },
            {
                id: 9,
                title: "Смок в Temple A (Jungle)",
                images: [
                    "../img/prosto_tak.jpg",
                    "../img/Ancient_Smoke/aplant_jungle_pos.png"
                ],
                tips: "Левая кнопка мыши, Прыжок."
            }
                */
        ],
        flash: [

        ]
    },
    overpass: {
        smoke: [
        ],
        flash: [
        ]
    },
    nuke: {
        smoke: [
        ],
        flash: [
        ]
    },
    inferno: {
        smoke: [
        ],
        flash: [
        ]
    },
    train: {
        smoke: [
        ],
        flash: [
        ]
    },
    vertigo: {
        smoke: [
        ],
        flash: [
        ]
    }
};
