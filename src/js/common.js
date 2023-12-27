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
    let options = option.split(":")
    if(option.length > 0) {
        if (options[0].includes("보스 몬스터 공격 시 데미지")) {
            options[0] = "보공";
        } else if (options[0].includes("몬스터 방어율 무시")) {
            options[0] = "방무";
        } else if (options[0].includes("크리티컬 데미지")) {
            options[0] = "크뎀";
        } else if (options[0].includes("아이템 드롭률")) {
            options[0] = "아획";
        } else if (options[0].includes("메소 획득량")) {
            options[0] = "메획";
        } else if (options[0].includes("HP 회복 아이템 및 회복 스킬 효율")) {
            options[0] = "회복 효율";
        } else if (options[0].includes("모든 스킬의 MP 소모")) {
            options[0] = "MP 소모";
        } else if (options[0].includes("모든 스킬의 재사용 대기시간")) {
            options[0] = "쿨감";
            options[1] = options[1].split("(")[0];
        } else if (options[0].includes("캐릭터 기준 9레벨 당")) {
            options[0] = options[0].replace("캐릭터 기준 ", "");
        } else if (options[0].includes("스킬 사용 가능")) {
            options[0] = options[0].split(" 스킬 사용 가능")[0];
            return options[0];
        } else if (options[0].includes("확률로")) {
            options[0] = options[0].split("확률로 ")[1];
            return options[0];
        } else if (options[0].includes("최대")) {
            options[0] = options[0].replace("최대", "");
        } else if (options[0].includes("HP 회복")) {
            options[0] = "HP 회복";
            return options[0];
        }
    }
    return options[0] + ":" + options[1];
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

const dbPromise = openDB('maple_search', 1, {
    upgrade(db) {
        db.createObjectStore('search');
    },
});

export async function get_idb(key) {
    return (await dbPromise).get('search', key);
}
export async function set_idb(key, val) {
    return (await dbPromise).put('search', val, key);
}
export async function del_idb(key) {
    return (await dbPromise).delete('search', key);
}
export async function clear_idb() {
    return (await dbPromise).clear('search');
}
export async function keys_idb() {
    return (await dbPromise).getAllKeys('search');
}

export function parseIntText(num){
    let res = "";
    let count = 0;
    const unit = ['만', '억', '조', '경', '해'];
    console.log(num)
    while(num > 0){
        let mod = num % 10000;
        num = parseInt(num/ 10000);

        res = mod.toString() + res;
        if(num > 0){
            res = unit[count] + res;
        }
        count++;
        console.log(num)
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