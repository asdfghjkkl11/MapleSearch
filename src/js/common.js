import { openDB } from 'idb';

export function nvl(text, rText) {
    if (text == null || text == undefined) text = "";
    if (rText != null && text == "") text = rText;
    return text;
}
export function option_parse(option){
    if(option.length > 0) {
        if (option[0] == "보스 몬스터 공격 시 데미지") {
            option[0] = "보공";
        } else if (option[0] == "몬스터 방어율 무시") {
            option[0] = "방무";
        } else if (option[0] == "크리티컬 데미지") {
            option[0] = "크뎀";
        } else if (option[0] == "아이템 드롭률") {
            option[0] = "아획";
        } else if (option[0] == "메소 획득량") {
            option[0] = "메획";
        } else if (option[0] == "HP 회복 아이템 및 회복 스킬 효율") {
            option[0] = "회복 효율";
        } else if (option[0] == "모든 스킬의 MP 소모") {
            option[0] = "MP 소모";
        } else if (option[0] == "모든 스킬의 재사용 대기시간") {
            option[0] = "쿨감";
            option[1] = option[1].split("(")[0];
        } else if (option[0].includes("캐릭터 기준 9레벨 당")) {
            option[0] = option[0].replace("캐릭터 기준 ", "");
        } else if (option[0].includes("스킬 사용 가능")) {
            option[0] = option[0].split(" 스킬 사용 가능")[0];
        } else if (option[0].includes("확률로")) {
            option[0] = option[0].split("확률로 ")[1];
        } else if (option[0].includes("최대")) {
            option[0] = option[0].replace("최대", "");
        }
    }
    return option;
}

export function uc(str) {
    return nvl(str).replace(/[^\d.]+/g, '');
}

export function calculate_option(item, main, cls){
    let option = 0;
    let attack = (main === "INT")?"마력":"공격력";

    if(item["itemType"].includes("한손무기")){
        return "";
    }
    if(item["itemType"].includes("두손무기")){
        return "";
    }

    if(cls.includes("제논")){
        if (item["STR"]) {
            option += Number(nvl(item["STR"][2], 0));
        }
        if (item["DEX"]) {
            option += Number(nvl(item["DEX"][2], 0));
        }
        if (item["LUK"]) {
            option += Number(nvl(item["LUK"][2], 0));
        }
        if (item["올스탯"]) {
            option += Number(nvl(item["올스탯"][2], 0).replace("%", "")) * 10;
        }
        if (item[attack]) {
            option += Number(nvl(item[attack][2], 0)) * 7;
        }
        if (option > 0) {
            option /= 2;
            option = Math.floor(option);
        }

        let res = (option > 0) ? option + "급" : "";

        return res;
    }else {
        if (item[main]) {
            option += Number(nvl(item[main][2], 0));
        }
        if (item["올스탯"]) {
            option += Number(nvl(item["올스탯"][2], 0).replace("%", "")) * 10;
        }
        if (item[attack]) {
            option += Number(nvl(item[attack][2], 0)) * 5;
        }

        let res = (option > 0) ? option + "급" : "";

        if(cls.includes("데몬어벤져")){
            if (item["MaxHP"]) {
                let hp = Number(nvl(item["MaxHP"][2], 0)) / item["level"];
                if(hp > 0) {
                    hp = 5 - ((hp - 9)/3);
                    res += ` HP${hp}추`;
                }
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