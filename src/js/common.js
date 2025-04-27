import { openDB } from 'idb';

export function nvl(text, rText) {
    if (text == null || text == undefined) text = "";
    if (rText != null && text == "") text = rText;
    return text;
}
export function optionParse(option){
    if(!option){
        return "";
    }
    if(option.length > 0) {
        if (option.includes("보스 몬스터 데미지")) {
            option = option.replace("보스 몬스터 데미지","보공");
        } else if (option.includes("몬스터 방어율 무시")) {
            option = option.replace("몬스터 방어율 무시","방무");
        } else if (option.includes("크리티컬 데미지")) {
            option = option.replace("크리티컬 데미지","크뎀");
        } else if (option.includes("아이템 드롭률")) {
            option = option.replace("아이템 드롭률","아획");
        } else if (option.includes("메소 획득량")) {
            option = option.replace("메소 획득량","메획");
        } else if (option.includes("HP 회복 아이템 및 회복 스킬 효율")) {
            option = option.replace("HP 회복 아이템 및 회복 스킬 효율","회복 효율");
        } else if (option.includes("모든 스킬의 MP 소모")) {
            option = option.replace("모든 스킬의 MP 소모","MP 소모");
        } else if (option.includes("스킬 재사용 대기시간")) {
            option = option.replace("스킬 재사용 대기시간","쿨감");
        } else if (option.includes("캐릭터 기준 ")) {
            option = option.replace("캐릭터 기준 ", "");
        } else if (option.includes("스킬 사용 가능")) {
            option = option.replace(" 스킬 사용 가능", "");
        } else if (option.includes("확률로")) {
            option = option.split("확률로 ")[1];
        } else if (option.includes("최대")) {
            option = option.replace("최대", "");
        } else if (option.includes("HP 회복")) {
            option = "HP 회복";
        } else if (option.includes("모든 스킬레벨")) {
        }
    }
    return option;
}

export function uc(str) {
    return nvl(str).replace(/[^\d.]+/g, '');
}

export function calculateOption(item, main, cls ,atkStatMulti, atkStatMultiXenon){
    let option = 0;

    if(item.item_equipment_slot.includes("무기")){
        return "";
    }
    let add = item.item_add_option;
    let attack = (main === "int")?add.magic_power:add.attack_power;

    if(cls.includes("제논")){
        option += Number(nvl(add.str, 0));
        option += Number(nvl(add.dex, 0));
        option += Number(nvl(add.luk, 0));
        option += Number(nvl(add.all_stat, 0)) * 20;
        option += Number(nvl(add.attack_power, 0)) * atkStatMultiXenon;

        if (option > 0) {
            option /= 2;
            option = Math.floor(option);
        }

        let res = (option > 0) ? option + "급" : "";

        return res;
    }else {
        option += Number(nvl(add[main], 0));
        option += Number(nvl(add.all_stat, 0)) * 10;
        option += Number(nvl(attack, 0)) * atkStatMulti;

        let res = (option > 0) ? option + "급" : "";

        if(cls.includes("데몬어벤져")){
            let hp = Number(nvl(add.max_hp, 0)) / item.item_base_option.base_equipment_level;
            if(hp > 0) {
                hp = 5 - ((hp - 9)/3);
                res += ` HP${hp}추`;
            }
        }

        return res;
    }
}

const dbPromise = openDB('maple_search', 5, {
    async upgrade(db) {
        try {
            db.createObjectStore('search');
        }catch (e){
            console.log(e)
        }
        try {
            db.createObjectStore('url');
        }catch (e){
            console.log(e)
        }
        try {
            db.createObjectStore('searchM');
        }catch (e){
            console.log(e)
        }
        try {
            db.createObjectStore('guild');
        }catch (e){
            console.log(e)
        }
    },
});

export async function get_idb(storeName, key) {
    return (await dbPromise).get(storeName, key);
}
export async function set_idb(storeName, key, val) {
    return (await dbPromise).put(storeName, val, key);
}
export async function del_idb(storeName, key) {
    return (await dbPromise).delete(storeName, key);
}
export async function clear_idb(storeName) {
    return (await dbPromise).clear(storeName);
}
export async function keys_idb(storeName) {
    return (await dbPromise).getAllKeys(storeName);
}

export function parseIntText(num){
    let res = "";
    let count = 0;
    const unit = ['만', '억', '조', '경', '해'];

    while(num > 0){
        let mod = num % 10000;
        num = parseInt(num/ 10000);

        res = mod.toString() + res;
        if(num > 0){
            if(unit[count]) {
                res = unit[count] + res;
            }
        }
        count++;
    }

    return res;
}
export function inputInt(str){
    str = String(nvl(str, "0"));
    let minus = (str[0]==="-")?"-":"";
    str = str.replace(/[^0-9]/g,"");

    while(str.length > 1 && str[0] === "0"){
        str = str.slice(1);
    }

    let integer = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");

    return minus + integer;
}
export function inputFloat(str,fixed = null){
    str = String(nvl(str, "0"));
    let minus = (str[0]==="-")?"-":"";
    str = str.replace(/[^0-9.]/g,"");
    let split = str.split(".");
    let point = (split.length>1)?".":"";
    let integer = split.shift();
    let float = split.join("");

    while(integer.length > 1 && integer[0] === "0"){
        integer = integer.slice(1);
    }

    if(fixed){
        float = float.slice(0,fixed);
    }

    integer = integer.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");

    return minus + integer + point + float;
}

export function g_loading_show(){
    document.querySelector(".loading-background").style.display = "block";
}
export function g_loading_hide(){
    document.querySelector(".loading-background").style.display = "none";
}
