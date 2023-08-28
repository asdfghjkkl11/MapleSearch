<style>
    .main{
        display: flex;
        flex-direction: column;
    }
    .character{
        display: flex;
        flex-direction: column;
        font-size: 14px;
    }
    .items{
        display: flex;
        flex-direction: column;
    }
    .cashitems{
        display: flex;
        flex-direction: column;
    }
    .character-img-wrapper{
        width: 120px;
        height: 120px;
        position: relative;
        overflow: hidden;
    }
    .character-img{
        width: 240px;
        height: 240px;
        position: absolute;
        top: -80px;
        left: -50px;
    }
    .item{
        padding: 4px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        font-size: 14px;
        box-shadow: inset 0 -1px 0 0 #cdcdcd;
    }
    .item > div{
        flex-shrink: 0;
    }
    .item-img-wrapper{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-img{
        max-width: 32px;
    }
    .item-main-cube, .item-additional-cube{
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
    }
    .item-name{
        width: 240px;
    }
    .item-cls{
        width: 48px;
    }
    .cube{
        min-width: 80px;
    }
    .blue{
        color: skyblue;
    }
    .purple{
        color: purple;
    }
    .yellow{
        color: #E3D04D;
    }
    .green{
        color: green;
    }
</style>
<div class="main">
    {#await data}
        <p>...Loading</p>
    {:then data}
        <div class="character">
            {#if character}
                {#if character.name !== ""}
                    <div class="character-img-wrapper">
                        <img class="character-img" src="{character.image}">
                    </div>
                    <div>{character.name}</div>
                    <div>{character.level}</div>
                    <div>{character["직업"]}</div>
                    <div>스탯공격력: {character["스탯공격력"][0]} ~ {character["스탯공격력"][1]}</div>
                    <div>STR: {character["STR"]}</div>
                    <div>DEX: {character["DEX"]}</div>
                    <div>INT: {character["INT"]}</div>
                    <div>LUK: {character["LUK"]}</div>
                    <div>보스공격력: {character["보스공격력"]}</div>
                    <div>방어율무시: {character["방어율무시"]}</div>
                    <div>크리티컬 데미지: {character["크리티컬 데미지"]}</div>
                {/if}
            {/if}
        </div>
        <div class="items">
            {#each items as item, i}
                <div class="item">
                    <div class="item-img-wrapper">
                        <img class="item-img" src="{item.image}">
                    </div>
                    <div class="item-name">{item.name}</div>
                    <div class="item-cls">{calculate_option(item,main)}</div>
                    <div class="item-cube">
                        {#if item["잠재옵션"]}
                            {#if item["잠재옵션"]["grade"] !== ""}
                                <div class="item-main-cube">
                                    <div class='{grade_mapper[item["잠재옵션"]["grade"]]}'>잠재</div>
                                    {#each item["잠재옵션"]["option"] as option, j}
                                        <div class='cube {grade_mapper[item["잠재옵션"]["grade"]]}'>{nvl(option[0])}: {nvl(option[1])}</div>
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                        {#if item["에디셔널 잠재옵션"]}
                            {#if item["에디셔널 잠재옵션"]["grade"] !== ""}
                                <div class="item-additional-cube">
                                    <div class='{grade_mapper[item["에디셔널 잠재옵션"]["grade"]]}'>에디</div>
                                    {#each item["에디셔널 잠재옵션"]["option"] as option, j}
                                        <div class='cube {grade_mapper[item["에디셔널 잠재옵션"]["grade"]]}'>{nvl(option[0])}: {nvl(option[1])}</div>
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        <div class="cashitem">
        </div>
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<script>
    import {params} from "@roxi/routify";
    import {calculate_option, nvl, option_parse, uc} from "../../js/common";

    const name = decodeURIComponent($params.name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let character = {};
    let items = [];
    let cashItems = [];
    let itemOrder = [];
    let main = "STR";
    let grade_mapper = {
        "레어": "blue",
        "에픽": "purple",
        "유니크": "yellow",
        "레전드리": "green",
    }
    $: data = fetch("https://mapleserver.asdfghjkkl11.com/maple/getCharacter",{
        "method": "POST",
        "body": JSON.stringify({
            "ID": name
        }),
        headers: myHeaders,
    }).then(async response => {
        let data = await response.json();
        console.log(data)
        if(data.resultCode === "success") {
            character = data.data.character;
            items = data.data.items;
            cashItems = data.data.cashItems;
        }else{
            throw new Error(data.error.message);
        }
    });

    $:{
        if(character){
            if(character.name !== ""){
                let str = uc(character["STR"]);
                let dex = uc(character["DEX"]);
                let int = uc(character["INT"]);
                let luk = uc(character["LUK"]);
                let max = Math.max(str,dex,int,luk);

                if(max == str){
                    main = "STR";
                }else if(max == dex){
                    main = "DEX";
                }else if(max == int){
                    main = "INT";
                }else if(max == luk){
                    main = "LUK";
                }

            }
        }

        if(items) {
            for (let i = 0; i < items.length; i++) {
                let a = items[i]["잠재옵션"];
                let b = items[i]["에디셔널 잠재옵션"];

                if (a) {
                    if (a["grade"] !== "") {
                        for (let j = 0; j < a["option"].length; j++) {
                            a["option"][j] = option_parse(a["option"][j]);
                        }
                    }
                }
                if (b) {
                    if (b["grade"] !== "") {
                        for (let j = 0; j < b["option"].length; j++) {
                            b["option"][j] = option_parse(b["option"][j]);
                        }
                    }
                }
            }
        }
    }
</script>
