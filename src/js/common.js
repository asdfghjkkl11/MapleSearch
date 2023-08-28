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
        } else if (option[0].includes("스킬 사용 가능")) {
            option[0] = option[0].split(" 스킬 사용 가능")[0];
        }
    }
    return option;
}

export function uc(str) {
    return nvl(str).replace(/[^\d.]+/g, '');
}

export function calculate_option(item, main){
    let option = 0;
    let attack = (main === "INT")?"마력":"공격력";

    if(item["itemType"].includes("한손무기")){
        return "";
    }
    if(item["itemType"].includes("두손무기")){
        return "";
    }

    if(item[main]) {
        option += Number(nvl(item[main][2],0));
    }
    if(item["올스탯"]) {
        option += Number(nvl(item["올스탯"][2],0).replace("%","")) * 10;
    }
    if(item[attack]) {
        option += Number(nvl(item[attack][2],0)) * 5;
    }

    return (option > 0)?option+"급":"";
}